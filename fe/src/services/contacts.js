import APIError from '../errors/APIError';

export default (httpClient) => ({
  listContacts: async (orderBy = 'asc') => {
    const response = await httpClient.get(`/contacts?orderBy=${orderBy}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    throw new APIError(response);
  },
  createContact: async ({
    name, email, phone, categoryId,
  }) => {
    const response = await httpClient.post('/contacts', {
      name,
      email,
      phone,
      category_id: categoryId,
    });

    return {
      data: response.data,
    };
  },
});
