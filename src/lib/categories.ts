export const CATEGORIES = {
  home: { id: -1, name: 'الرئيسية', slug: '' },
  politics: { id: 17, name: 'السياسية', slug: 'politics' },
  miscellaneous: { id: 1, name: 'متفرقات', slug: 'miscellaneous' },
  opinions: { id: 100, name: 'أقلام', slug: 'opinions' },
  featured: { id: 1, name: 'متفرقات', slug: 'featured' } // Using miscellaneous as featured for hero
};

export const NAV_CATEGORIES = [
    { name: 'الرئيسية', slug: '' },
    { name: 'السياسية', slug: 'politics' },
    { name: 'متفرقات', slug: 'miscellaneous' },
    { name: 'أقلام', slug: 'opinions' },
];

export const getCategoryBySlug = (slug: string) => {
    return Object.values(CATEGORIES).find(cat => cat.slug === slug);
}
