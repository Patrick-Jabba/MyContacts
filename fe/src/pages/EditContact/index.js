import useEditContact from './useEditContact';

import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function EditContact() {
  const {
    isLoading,
    contactFormRef,
    contactName,
    handleSubmit,
  } = useEditContact();

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
