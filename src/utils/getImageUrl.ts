export const getImageUrl = (image: any): string => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI;
    const imageUrl =
      image?.formats?.small?.url || image?.formats?.thumbnail?.url || image?.url;
    return `${baseUrl}${imageUrl}`;
  };
  