// app/api/contact/route.js (or .ts)
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// POSTメソッドを実装
export async function POST(request) {
  console.log('POST request received to /api/contact');

  try {
    // リクエストからJSONデータを取得
    const body = await request.json();
    console.log('Request body:', body);

    const { type, name, email, contact, company, requirements, privacyConsent, ...additionalFields } = body;

    // バリデーション
    if (!name || !email || !company || !requirements) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    // 個人情報の同意確認
    if (!privacyConsent) {
      console.log('Validation failed: Privacy consent required');
      return NextResponse.json(
        { error: '個人情報の取り扱いについて同意が必要です' },
        { status: 400 }
      );
    }

    console.log('Setting up nodemailer transport');
    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // デバッグモードを有効化
    });

    // メールの件名を設定
    const subject = 'FIND to DOへのお問い合わせ';

    // フィールドラベルを設定
    const fieldLabels = {
      company: '会社名',
      name: 'お名前',
      email: 'メールアドレス',
      contact: '電話番号',
      requirements: 'お問い合わせ内容',
    };

    // 表示する項目のリストを作成
    const displayFields = [
      { label: '会社名', value: company },
      { label: 'お名前', value: name },
      { label: 'メールアドレス', value: email },
      { label: '電話番号', value: contact || 'なし' },
      { label: 'お問い合わせ内容', value: requirements },
    ];

    // 追加フィールドを追加
    Object.entries(additionalFields).forEach(([key, value]) => {
      if (key !== 'privacyConsent' && value) {  // privacyConsent以外で値がある場合
        const label = fieldLabels[key] || key;
        displayFields.push({ label, value });
      }
    });

    // 現在の日時を追加
    const currentDate = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    displayFields.push({ label: '送信日時', value: currentDate });
    displayFields.push({ label: '個人情報保護方針に同意', value: 'はい' });

    // プレーンテキスト版のメッセージを作成
    let plainTextMessage = `${subject}\n\n`;
    plainTextMessage += `送信日時: ${currentDate}\n\n`;

    displayFields.forEach(field => {
      if (field.label !== '送信日時') {
        plainTextMessage += `${field.label}: ${field.value}\n`;
      }
    });

    plainTextMessage += `\n------------------------------------------\n`;
    plainTextMessage += `このメールは自動送信されています。\n`;
    plainTextMessage += `FIND to DO`;

    // HTMLメッセージを作成
    let htmlMessage = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 25px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            }
            h1 {
              color: #1a73e8;
              border-bottom: 2px solid #e0e0e0;
              padding-bottom: 10px;
              margin-top: 0;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
            }
            th, td {
              padding: 15px;
              text-align: left;
              border-bottom: 1px solid #eee;
            }
            th {
              background-color: #f5f7fa;
              color: #455a64;
              font-weight: 600;
              width: 30%;
            }
            tr:hover {
              background-color: #f8f9fa;
            }
            .timestamp {
              color: #666;
              font-size: 0.9em;
              font-style: italic;
            }
            .footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #eee;
              font-size: 0.9em;
              color: #666;
            }
            .highlight {
              background-color: #f0f7ff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${subject}</h1>
            <p>以下の内容でフォームが送信されました：</p>
            <table>
    `;

    // 表形式でデータを追加
    displayFields.forEach((field, index) => {
      const highlightClass = index % 2 === 0 ? ' class="highlight"' : '';
      const valueClass = field.label === '送信日時' ? ' class="timestamp"' : '';

      // 長文テキストの改行を<br>に変換
      let displayValue = field.value;
      if (typeof displayValue === 'string' && (
        field.label === 'お問い合わせ内容' ||
        field.label === 'その他ご要望等'
      )) {
        displayValue = displayValue.replace(/\n/g, '<br>');
      }

      htmlMessage += `
        <tr${highlightClass}>
          <th>${field.label}</th>
          <td${valueClass}>${displayValue || '未入力'}</td>
        </tr>
      `;
    });

    htmlMessage += `
            </table>
            <div class="footer">
              <p>このメールはWebサイトからの問い合わせ通知です。</p>
              <p>返信する場合は、送信者のメールアドレス（${email}）に直接返信してください。</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // メールの内容（管理者向け）
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // 管理者のメールアドレスに送信
      subject: `${subject}: ${name}様（${company}）より`,
      text: plainTextMessage,
      html: htmlMessage,
    };

    // 自動返信メールの内容（お客様向け）
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email, // お客様のメールアドレスに送信
      subject: `【FIND to DO】お問い合わせありがとうございます`,
      text: `
${name}様

この度はFIND to DOへお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けました。

会社名: ${company}
お名前: ${name}
メールアドレス: ${email}
電話番号: ${contact || 'なし'}
お問い合わせ内容:
${requirements}

内容を確認次第、担当者より折り返しご連絡させていただきます。
今しばらくお待ちくださいますようお願い申し上げます。

---------------------
FIND to DO
お問い合わせ窓口
${process.env.EMAIL_USER}
---------------------
      `,
      html: `
<html>
  <head>
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: #1a73e8;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
      }
      .content {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }
      .footer {
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #eee;
        font-size: 0.9em;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>お問い合わせありがとうございます</h1>
      <p>${name}様</p>
      <p>この度はFIND to DOへお問い合わせいただき、誠にありがとうございます。<br>
      以下の内容でお問い合わせを受け付けました。</p>
      
      <div class="content">
        <p><strong>会社名:</strong> ${company}</p>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>電話番号:</strong> ${contact || 'なし'}</p>
        <p><strong>お問い合わせ内容:</strong><br>${requirements.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p>内容を確認次第、担当者より折り返しご連絡させていただきます。<br>
      今しばらくお待ちくださいますようお願い申し上げます。</p>
      
      <div class="footer">
        <p>---------------------<br>
        FIND to DO<br>
        お問い合わせ窓口<br>
        ${process.env.EMAIL_USER}<br>
        ---------------------</p>
      </div>
    </div>
  </body>
</html>
      `,
    };

    console.log('Attempting to send emails');

    try {
      // 管理者宛メール送信
      const adminInfo = await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully:', adminInfo.response);
      
      // お客様宛自動返信メール送信
      const replyInfo = await transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply email sent successfully:', replyInfo.response);

      return NextResponse.json(
        { message: 'お問い合わせが送信されました' },
        { status: 200 }
      );
    } catch (error) {
      // エラーを適切な型として扱う
      const emailError = error;
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        {
          error: 'メール送信中にエラーが発生しました',
          details: emailError.message || 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // エラーを適切な型として扱う
    const err = error;
    console.error('General error in API route:', err);
    return NextResponse.json(
      {
        error: '送信中にエラーが発生しました',
        details: err.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GETメソッドを追加して動作確認用のエンドポイントを作成
export async function GET() {
  console.log('GET request received to /api/contact');
  return NextResponse.json({ message: 'Contact API is working' }, { status: 200 });
}