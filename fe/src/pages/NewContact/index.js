import React from 'react';

import delay from '../../utils/delay';

import services from '../../services';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      await delay(2000);
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      const { data } = await services.contacts.createContact(contact);

      console.log(data);
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato!');
    }
  }
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
