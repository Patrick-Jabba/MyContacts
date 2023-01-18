import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import services from '../../services';
import delay from '../../utils/delay';
import toast from '../../utils/toast';

import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactForm from '../../components/ContactForm';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        await delay(2500);
        setIsLoading(true);
        const { data } = await services.contacts.getContactById(id);

        setContact(data);
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
      const editableContact = {
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await services.contacts.editContact(id, editableContact);
      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso!',
        duration: 2500,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.response.data.error}`,
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar Patrick Monteiro"
      />
      <ContactForm
        key={contact.id}
        contact={contact}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
