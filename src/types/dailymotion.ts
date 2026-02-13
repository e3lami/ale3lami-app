export interface DailymotionVideo {
  id: string;
  title: string;
  url: string;
  thumbnail_360_url: string;
}

export interface DailymotionApiResponse {
  list: DailymotionVideo[];
  // There are other properties like 'has_more', but we only need 'list'
}
