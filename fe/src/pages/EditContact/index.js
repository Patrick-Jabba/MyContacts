import React from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <>
      <PageHeader
        title="Editar Patrick Monteiro"
      />
      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
