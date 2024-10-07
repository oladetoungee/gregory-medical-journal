import axios from 'axios';

export interface FetchArticlesOptions {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  editorPick?: boolean;
}

export const fetchApprovedArticles = async ({
  page = 1,
  pageSize = 3,
  searchQuery = '',
  editorPick = false,
}: FetchArticlesOptions) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`, {
      params: {
        // Include non-media fields in the 'fields' parameter
        'fields': ['title', 'Authors', 'excerpt', 'submissionDate', 'submittedByName', 'submittedByEmail', 'status', 'editorPick'],
        populate: ['image', 'document'], // Populate both 'image' and 'document' fields as they are media fields
        sort: 'submissionDate:desc',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        ...(searchQuery && {
          'filters[$or][0][title][$containsi]': searchQuery,
          'filters[$or][1][Authors][$containsi]': searchQuery,
          'filters[$or][2][excerpt][$containsi]': searchQuery,
        }),
        ...(editorPick && {
          'filters[editorPick][$eq]': true,
        }),
        // Filter articles with status 'approved'
        'filters[status][$eq]': 'approved',
      },
    });

    const articles = response.data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      authors: item.attributes.Authors, // Authors array
      excerpt: item.attributes.excerpt, // Excerpt field
      image: item.attributes.image,
      document: item.attributes.document?.data?.attributes?.url || '', // Correct way to access document file URL
      submissionDate: item.attributes.submissionDate, // Date submitted
      submittedByName: item.attributes.submittedByName, // Person that submitted
      submittedByEmail: item.attributes.submittedByEmail, // Email of the person
      status: item.attributes.status, // Article status
      editorPick: item.attributes.editorPick, // Editor's pick boolean
    }));

    const pagination = response.data.meta.pagination;
    const totalPages = Math.ceil(pagination.total / pageSize);

 
    return { articles, totalPages, totalArticles: pagination.total };
  } catch (error) {
    console.error('Error fetching approved articles:', error);
    return { articles: [], totalPages: 1, totalArticles: 0 };
  }
};
