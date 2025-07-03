import { articleService } from './article-service';

// Analytics Services (for dashboard)
export const analyticsService = {
  // Get article statistics
  async getArticleStats() {
    const articles = await articleService.getArticles(1000);
    
    const stats = {
      total: articles.articles.length,
      underReview: articles.articles.filter(a => a.status === 'under-review').length,
      accepted: articles.articles.filter(a => a.status === 'accepted').length,
      rejected: articles.articles.filter(a => a.status === 'rejected').length,
      published: articles.articles.filter(a => a.status === 'published').length,
      editorPicks: articles.articles.filter(a => a.isEditorPick).length,
    };

    return stats;
  },

  // Get submission trends
  async getSubmissionTrends() {
    const articles = await articleService.getArticles(1000);
    
    const trends = articles.articles.reduce((acc: any, article) => {
      const date = new Date(article.submissionDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(trends).map(([date, count]) => ({ date, count }));
  },
}; 