import { useRef } from 'react';

import delay from '../../utils/delay';
import toast from '../../utils/toast';

import services from '../../services';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await delay(2000);
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

  return {
    contactFormRef,
    handleSubmit,
  };
}
