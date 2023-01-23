import useNewContact from './useNewContact';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  const {
    contactFormRef,
    handleSubmit,
  } = useNewContact();

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
