import { useRef } from 'react';

import delay from '../../utils/delay';

import services from '../../services';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

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

      contactFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.response.data.error}`,
      });
    }
  }
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
