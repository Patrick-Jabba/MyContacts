import CategoryMapper from './mappers/CategoryMapper';

export default (httpClient) => ({
  listCategories: async () => {
    const response = await httpClient.get('/categories');

    const mappedCategories = response.data.map(CategoryMapper.toDomain);

    return {
      data: mappedCategories,
    };
  },
  createCategory: async (category) => {
    const response = await httpClient.post('/categories', category);

    return {
      data: response.data,
    };
  },
});
