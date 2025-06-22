import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://find-to-do.com'
  
  // 静的ページのリスト
  const staticPages = [
    '',
    '/about',
    '/service',
    '/service/intern',
    '/service/webdev',
    '/service/event',
    '/community',
    '/blog',
    '/news-blog',
    '/documents',
    '/contact',
    '/privacy',
    '/terms',
    '/legal'
  ]

  // 静的ページのサイトマップエントリー
  const staticUrls = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/service') ? 0.9 : 0.8,
  }))

  // 動的コンテンツ（ブログ記事など）のサイトマップエントリーを追加する場合は
  // ここでAPIからデータを取得して追加します
  // 例:
  // const blogPosts = await getBlogPosts()
  // const blogUrls = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticUrls,
    // ...blogUrls, // 動的コンテンツがある場合
  ]
}