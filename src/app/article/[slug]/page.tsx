import { getPostBySlug, getPostsByCategory } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import ArticleView from '@/components/news/article-view';
import { CATEGORIES } from '@/lib/categories';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 150);
  return {
    title: `${title} | Al-E3lami News Hub`,
    description: description,
  };
}


export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  // Fetch a pool of posts for related articles
  const miscellaneousPosts = await getPostsByCategory(CATEGORIES.miscellaneous.id, 10);

  // Filter out the current post and shuffle
  const relatedPosts = miscellaneousPosts
    .filter(p => p.id !== post.id) // Exclude current article
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 3); // Take the first 3

  return (
    <>
      <Header />
      <ArticleView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
