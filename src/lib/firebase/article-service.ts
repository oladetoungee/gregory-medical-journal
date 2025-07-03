import { set, get, update, remove, ref as dbRef } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { Article } from './types';

// Article Services
export const articleService = {
  // Get all articles with pagination
  async getArticles(pageSize: number = 10) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return { articles: [], hasMore: false };
    }

    const articlesData = snapshot.val();
    const articles: Article[] = [];
    
    // Iterate through all users and their papers
    Object.entries(articlesData).forEach(([userUid, userPapers]: [string, any]) => {
      Object.entries(userPapers).forEach(([paperId, paperData]: [string, any]) => {
        articles.push({
          id: paperId,
          ...paperData,
        });
      });
    });

    // Sort by submission date (newest first)
    articles.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());

    return {
      articles: articles.slice(0, pageSize),
      hasMore: articles.length > pageSize,
    };
  },

  // Get approved articles only
  async getApprovedArticles(pageSize: number = 10) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return { articles: [], hasMore: false };
    }

    const articlesData = snapshot.val();
    const articles: Article[] = [];
    
    // Iterate through all users and their papers
    Object.entries(articlesData).forEach(([userUid, userPapers]: [string, any]) => {
      Object.entries(userPapers).forEach(([paperId, paperData]: [string, any]) => {
        if (paperData.status === 'published') {
          articles.push({
            id: paperId,
            ...paperData,
          });
        }
      });
    });

    // Sort by submission date (newest first)
    articles.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());

    return {
      articles: articles.slice(0, pageSize),
      hasMore: articles.length > pageSize,
    };
  },

  // Get editor's pick articles
  async getEditorPicks() {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const articlesData = snapshot.val();
    const articles: Article[] = [];
    
    // Iterate through all users and their papers
    Object.entries(articlesData).forEach(([userUid, userPapers]: [string, any]) => {
      Object.entries(userPapers).forEach(([paperId, paperData]: [string, any]) => {
        if (paperData.isEditorPick && paperData.status === 'published') {
          articles.push({
            id: paperId,
            ...paperData,
          });
        }
      });
    });

    // Sort by submission date (newest first)
    articles.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());

    return articles;
  },

  // Get articles by user UID
  async getArticlesByUser(userUid: string) {
    const userPapersRef = dbRef(realtimeDb, `papers/${userUid}`);
    const snapshot = await get(userPapersRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const userPapers = snapshot.val();
    const articles: Article[] = Object.entries(userPapers).map(([id, data]: [string, any]) => ({
      id,
      ...data,
    }));

    // Sort by submission date (newest first)
    articles.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());

    return articles;
  },

  // Get single article
  async getArticle(id: string) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    const articlesData = snapshot.val();
    
    // Search through all users and their papers
    for (const [userUid, userPapers] of Object.entries(articlesData)) {
      for (const [paperId, paperData] of Object.entries(userPapers as any)) {
        if (paperId === id) {
          return { id, ...(paperData as any) } as Article;
        }
      }
    }
    
    return null;
  },

  // Add new article
  async addArticle(article: Omit<Article, 'id'>, userUid: string) {
    // Generate unique ID
    const articleId = `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Add to user's papers collection: papers/{userUid}/{paperId}
    await set(dbRef(realtimeDb, `papers/${userUid}/${articleId}`), {
      ...article,
      id: articleId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Add paper ID to user's papers array
    const userRef = dbRef(realtimeDb, `users/${userUid}/papers`);
    const userSnapshot = await get(userRef);
    const existingPapers = userSnapshot.exists() ? userSnapshot.val() : [];
    existingPapers.push(articleId);
    await set(userRef, existingPapers);

    return articleId;
  },

  // Update article
  async updateArticle(id: string, updates: Partial<Article>) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return;
    }

    const articlesData = snapshot.val();
    
    // Find the article and update it
    for (const [userUid, userPapers] of Object.entries(articlesData)) {
      for (const [paperId, paperData] of Object.entries(userPapers as any)) {
        if (paperId === id) {
          const articleRef = dbRef(realtimeDb, `papers/${userUid}/${paperId}`);
          await update(articleRef, {
            ...updates,
            updatedAt: new Date().toISOString(),
          });
          return;
        }
      }
    }
  },

  // Delete article
  async deleteArticle(id: string) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return;
    }

    const articlesData = snapshot.val();
    
    // Find the article and delete it
    for (const [userUid, userPapers] of Object.entries(articlesData)) {
      for (const [paperId, paperData] of Object.entries(userPapers as any)) {
        if (paperId === id) {
          const articleRef = dbRef(realtimeDb, `papers/${userUid}/${paperId}`);
          await remove(articleRef);
          
          // Remove from user's papers array
          const userRef = dbRef(realtimeDb, `users/${userUid}/papers`);
          const userSnapshot = await get(userRef);
          if (userSnapshot.exists()) {
            const existingPapers = userSnapshot.val();
            const updatedPapers = existingPapers.filter((paperId: string) => paperId !== id);
            await set(userRef, updatedPapers);
          }
          return;
        }
      }
    }
  },

  // Search articles
  async searchArticles(searchTerm: string) {
    const articlesRef = dbRef(realtimeDb, 'papers');
    const snapshot = await get(articlesRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const articlesData = snapshot.val();
    const articles: Article[] = [];
    
    // Iterate through all users and their papers
    Object.entries(articlesData).forEach(([userUid, userPapers]: [string, any]) => {
      Object.entries(userPapers).forEach(([paperId, paperData]: [string, any]) => {
        if (paperData.status === 'published') {
          const article = {
            id: paperId,
            ...paperData,
          };
          
          if (
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.authors?.[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            articles.push(article);
          }
        }
      });
    });

    return articles;
  },
}; 