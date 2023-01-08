import axios from 'axios';
import CategoriesService from './categories';
import ContactsService from './contacts';

const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export default {
  categories: CategoriesService(httpClient),
  contacts: ContactsService(httpClient),
};
