import APIError from '../errors/APIError';
import ContactMapper from './mappers/ContactMapper';

export default (httpClient) => ({
  listContacts: async (orderBy = 'asc') => {
    const response = await httpClient.get(`/contacts?orderBy=${orderBy}`);

    if (response.status === 200) {
      const mappedContacts = response.data.map(ContactMapper.toDomain);

      return {
        data: mappedContacts,
      };
    }

    throw new APIError(response);
  },
  getContactById: async (id) => {
    const response = await httpClient.get(`/contacts/${id}`);

    const mappedContact = ContactMapper.toDomain(response.data);

    return {
      data: mappedContact,
    };
  },
  createContact: async (contact) => {
    const body = ContactMapper.toPersistence(contact);
    const response = await httpClient.post('/contacts', body);

    return {
      data: response.data,
    };
  },
  editContact: async (id, contact) => {
    const body = ContactMapper.toPersistence(contact);
    const response = await httpClient.put(`/contacts/${id}`, body);

    return {
      data: response.data,
    };
  },
  removeContact: async (id) => {
    await httpClient.delete(`/contacts/${id}`);
  },
});
