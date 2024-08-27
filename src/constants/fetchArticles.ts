import axios from 'axios';

export interface FetchArticlesOptions {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  editorPick?: boolean;
}

export const fetchArticles = async ({ page = 1, pageSize = 3, searchQuery = '', editorPick = false }: FetchArticlesOptions) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`, {
      params: {
        populate: '*',
        sort: 'publishedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        ...(searchQuery && {
          'filters[$or][0][title][$containsi]': searchQuery,
          'filters[$or][1][author][$containsi]': searchQuery,
          'filters[$or][2][excerpt][$containsi]': searchQuery,
        }),
        ...(editorPick && {
          'filters[editorPick][$eq]': true,
        }),
      },
    });

    const articles = response.data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      author: item.attributes.author,
      excerpt: item.attributes.excerpt,
      image: item.attributes.image.data.attributes.url,
      link: item.attributes.link,
      editorPick: item.attributes.editorPick,
      publishedAt: item.attributes.publishedAt,
    }));

    const pagination = response.data.meta.pagination;
    const totalPages = Math.ceil(pagination.total / pageSize);

    return { articles, totalPages, totalArticles: pagination.total };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], totalPages: 1, totalArticles: 0 };
  }
};
