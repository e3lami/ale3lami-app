import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html: string): string {
  if (!html) return '';

  // First, strip HTML tags from the content
  const stripped = html.replace(/<[^>]*>?/gm, '');

  // Then, decode common HTML entities to prevent mismatches between server and client rendering.
  // This is not a comprehensive decoder but handles the most frequent cases from WordPress.
  const decoded = stripped
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–') // en dash
    .replace(/&#8212;/g, '—') // em dash
    .replace(/&#8216;/g, '‘') // left single quote
    .replace(/&#8217;/g, '’') // right single quote
    .replace(/&#8220;/g, '“') // left double quote
    .replace(/&#8221;/g, '”') // right double quote
    .replace(/&#8230;/g, '…') // ellipsis
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)) // handle numeric entities like &#123;
    .replace(/&amp;/g, '&'); // Always decode ampersand last

  return decoded;
}
