import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import services from '../../services';
import delay from '../../utils/delay';
import toast from '../../utils/toast';

import useIsMounted from '../../hooks/useIsMounted';

export default function useEditContact() {
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const isMounted = useIsMounted();

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        await delay(2000);
        setIsLoading(true);
        const { data } = await services.contacts.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValue(data);
          setIsLoading(false);
          setContactName(data.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
            duration: 2000,
          });
        }
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      await delay(2000);
      const { data } = await services.contacts.editContact(id, contact);

      setContactName(data.name);
      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso!',
        duration: 2000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
        duration: 2000,
      });
    }
  }

  return {
    isLoading,
    contactFormRef,
    contactName,
    handleSubmit,
  };
}
