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
  getContactById: async (id) => {
    const response = await httpClient.get(`/contacts/${id}`);

    return {
      data: response.data,
    };
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
  editContact: async (contact) => {
    const response = await httpClient.put(`/contacts/${contact.id}`, contact);

    return {
      data: response.data,
    };
  },
  removeContact: async (id) => {
    await httpClient.delete(`/contacts/${id}`);
  },
});
