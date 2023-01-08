export default (httpClient) => ({
  listCategories: async () => {
    const response = await httpClient.get('/categories');

    return {
      data: response.data,
    };
  },
});
