import Header from '@/components/layout/header';
import { searchPosts } from '@/lib/wordpress';
import ArticleCard from '@/components/news/article-card';
import SectionHeader from '@/components/home/section-header';

type SearchPageProps = {
    searchParams: {
        q?: string;
    }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
    const query = searchParams.q || '';
    return {
        title: `Search results for: "${query}" | Al-E3lami News Hub`,
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || '';
    const posts = await searchPosts(query);

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <SectionHeader title={`نتائج البحث عن: "${query}"`} />
                {posts && posts.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {posts.map((post) => (
                            <ArticleCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>لم يتم العثور على مقالات تطابق بحثك.</p>
                    </div>
                )}
            </main>
        </>
    )
}
