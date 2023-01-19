import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import services from '../../services';
import delay from '../../utils/delay';
import toast from '../../utils/toast';

import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactForm from '../../components/ContactForm';
import formatPhone from '../../utils/formatPhone';

export default function EditContact() {
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        await delay(2500);
        setIsLoading(true);
        const { data } = await services.contacts.getContactById(id);

        contactFormRef.current.setFieldsValue(data);
        setContactName(data.name);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
          duration: 3000,
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      await delay(2500);
      const contact = {
        id,
        name: formData.name,
        email: formData.email,
        phone: formatPhone(formData.phone),
        category_id: formData.categoryId,
      };
      const contactData = await services.contacts.editContact(contact);
      setContactName(contactData.name);
      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso!',
        duration: 2500,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
