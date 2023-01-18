import React from 'react';

import delay from '../../utils/delay';

import services from '../../services';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import toast from '../../utils/toast';

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
      await services.contacts.createContact(contact);

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
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
