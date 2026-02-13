import Header from '@/components/layout/header';
import { getPostsByCategory } from '@/lib/wordpress';
import { getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/news/article-card';
import SectionHeader from '@/components/home/section-header';

type CategoryPageProps = {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const category = getCategoryBySlug(params.slug);
    if (!category) {
        return { title: 'Category Not Found' };
    }
    return {
        title: `${category.name} | Al-E3lami News Hub`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    if (params.slug === '') {
        notFound();
    }
    const category = getCategoryBySlug(params.slug);

    if (!category || typeof category.id === 'undefined' || category.id === -1) {
        notFound();
    }
    
    const posts = await getPostsByCategory(category.id, 12);

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <SectionHeader title={category.name} />
                {posts && posts.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {posts.map((post) => (
                            <ArticleCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>لا توجد مقالات في هذا القسم حالياً.</p>
                    </div>
                )}
            </main>
        </>
    )
}
