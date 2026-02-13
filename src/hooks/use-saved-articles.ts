'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WP_Post } from '@/types/wordpress';

const SAVED_ARTICLES_KEY = 'saved_news_articles';

export function useSavedArticles() {
  const [savedArticles, setSavedArticles] = useState<WP_Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(SAVED_ARTICLES_KEY);
      if (item) {
        setSavedArticles(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setSavedArticles([]);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const persistSavedArticles = (articles: WP_Post[]) => {
    try {
      setSavedArticles(articles);
      window.localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(articles));
    } catch (error) {
       console.error("Failed to write to localStorage", error);
    }
  };

  const toggleSaveArticle = useCallback((post: WP_Post) => {
    const isSaved = savedArticles.some(saved => saved.id === post.id);
    let updatedArticles;
    if (isSaved) {
      updatedArticles = savedArticles.filter(saved => saved.id !== post.id);
    } else {
      updatedArticles = [post, ...savedArticles];
    }
    persistSavedArticles(updatedArticles);
  }, [savedArticles]);

  const isArticleSaved = useCallback((postId: number) => {
    if (!isLoaded) return false;
    return savedArticles.some(saved => saved.id === postId);
  }, [savedArticles, isLoaded]);

  return { savedArticles, toggleSaveArticle, isArticleSaved, isLoaded };
}
