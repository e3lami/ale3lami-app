import type { DailymotionApiResponse, DailymotionVideo } from '@/types/dailymotion';

const API_BASE_URL = 'https://api.dailymotion.com';
const USERNAME = 'naji-amhaz';

export async function getLatestVideos(limit: number = 5): Promise<DailymotionVideo[]> {
  const fields = 'id,title,url,thumbnail_360_url';
  const endpoint = `/user/${USERNAME}/videos?fields=${fields}&sort=recent&limit=${limit}`;
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    if (!response.ok) {
      console.error(`Failed to fetch Dailymotion videos: ${response.statusText}`);
      return [];
    }
    const data: DailymotionApiResponse = await response.json();
    return data.list || [];
  } catch (error) {
    console.error('Dailymotion API Fetch Error:', error);
    return [];
  }
}
