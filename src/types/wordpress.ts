export interface WP_Media {
  id: number;
  source_url: string;
  alt_text: string;
}

export interface WP_Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: { [key: string]: string };
}

export interface WP_Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WP_Media[];
    author?: WP_Author[];
  };
}
