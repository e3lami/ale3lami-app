import type { WP_Post } from '@/types/wordpress';

const API_BASE_URL = 'https://ale3lami.com/wp-json/wp/v2';

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    // In case of error, return an empty array for lists or null for single items
    // to prevent breaking the rendering logic.
    return (endpoint.includes('slug=')) ? null as T : [] as unknown as T;
  }
}

export async function getPostsByCategory(categoryId: number, perPage: number = 9, offset: number = 0): Promise<WP_Post[]> {
  const posts = await fetchApi<WP_Post[]>(`/posts?categories=${categoryId}&per_page=${perPage}&offset=${offset}&_embed=1`);
  return posts || [];
}

export async function getPostBySlug(slug: string): Promise<WP_Post | null> {
  const posts = await fetchApi<WP_Post[]>(`/posts?slug=${slug}&_embed=1`);
  return posts?.[0] || null;
}

export async function searchPosts(term: string, perPage: number = 12): Promise<WP_Post[]> {
    const posts = await fetchApi<WP_Post[]>(`/posts?search=${encodeURIComponent(term)}&per_page=${perPage}&_embed=1`);
    return posts || [];
}
