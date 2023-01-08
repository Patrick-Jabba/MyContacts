export default (httpClient) => ({
  listContacts: async (orderBy = 'asc') => {
    const response = await httpClient.get(`/contacts?orderBy=${orderBy}`);

    return {
      data: response.data,
    };
  },
  createContact: async (contact) => {
    const response = await httpClient.post('contacts', contact);

    return {
      data: response.data,
    };
  },
});
