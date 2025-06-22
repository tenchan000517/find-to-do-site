import { Metadata } from 'next';

export const serviceMetadata: Metadata = {
  title: 'サービス | FIND to DO',
  description: 'FIND to DOは、インターン紹介、WEB開発・DX支援、イベント制作の3つのサービスを提供しています。',
  alternates: {
    canonical: '/service',
  },
  openGraph: {
    title: 'サービス | FIND to DO',
    description: 'FIND to DOは、インターン紹介、WEB開発・DX支援、イベント制作の3つのサービスを提供しています。',
    url: 'https://find-to-do.com/service',
  },
};

export const internMetadata: Metadata = {
  title: 'インターン紹介 | FIND to DO',
  description: '企業のDX推進を支援しながら、学生に実践的なスキルアップと収入機会を提供するインターンプログラム。',
  alternates: {
    canonical: '/service/intern',
  },
  openGraph: {
    title: 'インターン紹介 | FIND to DO',
    description: '企業のDX推進を支援しながら、学生に実践的なスキルアップと収入機会を提供するインターンプログラム。',
    url: 'https://find-to-do.com/service/intern',
  },
};

export const webdevMetadata: Metadata = {
  title: 'WEB開発・DX支援 | FIND to DO',
  description: 'AIチャットボット開発、業務自動化システム構築、WEBアプリケーション開発など、企業のDX推進を総合的に支援。',
  alternates: {
    canonical: '/service/webdev',
  },
  openGraph: {
    title: 'WEB開発・DX支援 | FIND to DO',
    description: 'AIチャットボット開発、業務自動化システム構築、WEBアプリケーション開発など、企業のDX推進を総合的に支援。',
    url: 'https://find-to-do.com/service/webdev',
  },
};

export const eventMetadata: Metadata = {
  title: 'イベント制作 | FIND to DO',
  description: '企業イベント、学生向けワークショップ、交流会など、目的に応じた効果的なイベントの企画・運営をサポート。',
  alternates: {
    canonical: '/service/event',
  },
  openGraph: {
    title: 'イベント制作 | FIND to DO',
    description: '企業イベント、学生向けワークショップ、交流会など、目的に応じた効果的なイベントの企画・運営をサポート。',
    url: 'https://find-to-do.com/service/event',
  },
};