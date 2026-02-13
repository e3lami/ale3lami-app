import Header from '@/components/layout/header';
import { getPostsByCategory } from '@/lib/wordpress';
import HeroSlider from '@/components/home/hero-slider';
import PoliticsSection from '@/components/home/politics-section';
import MiscSection from '@/components/home/misc-section';
import OpinionsSection from '@/components/home/opinions-section';
import { CATEGORIES } from '@/lib/categories';
import BreakingNewsTicker from '@/components/home/breaking-news-ticker';
import SearchBar from '@/components/home/search-bar';
import './../components/home/breaking-news-ticker.css';


export default async function Home() {
  const [
    breakingNews,
    featuredPosts,
    politicsPosts,
    miscPosts,
    opinionsPosts,
  ] = await Promise.all([
    getPostsByCategory(CATEGORIES.featured.id, 5), // For ticker
    getPostsByCategory(CATEGORIES.featured.id, 9),
    getPostsByCategory(CATEGORIES.politics.id, 3),
    getPostsByCategory(CATEGORIES.miscellaneous.id, 6),
    getPostsByCategory(CATEGORIES.opinions.id, 3),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNewsTicker posts={breakingNews} />
      <SearchBar />
      <main>
        <HeroSlider posts={featuredPosts} />
        <div className="container mx-auto px-4">
          <PoliticsSection posts={politicsPosts} />
          <MiscSection posts={miscPosts} />
        </div>
        <OpinionsSection posts={opinionsPosts} />
      </main>
    </div>
  );
}
