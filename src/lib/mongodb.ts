// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || '';

if (!MONGODB_URI) {
  throw new Error('MongoDB URIが環境変数に設定されていません');
}

if (!MONGODB_DB) {
  throw new Error('MongoDB データベース名が環境変数に設定されていません');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // キャッシュがある場合はそれを返す
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // 新しい接続を確立
  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db(MONGODB_DB);

  // 接続をキャッシュ
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}