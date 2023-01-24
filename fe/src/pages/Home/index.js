/* eslint-disable react/jsx-one-expression-per-line */
import useHome from './useHome';
import { Container } from './styles';

import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    contacts,
    orderBy,
    searchTerm,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleToggleOrderBy,
    handleCloseDeleteModal,
    handleChangeSearchTerm,
    handleDeleteContact,
    handleConfirmDeleteContact,
    handleTryAgain,
    filteredContacts,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        qtyOfContacts={contacts}
        qtyOfFilteredContacts={filteredContacts}
        hasError={hasError}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList /> }
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} /> }

      {hasContacts && (
        <>
          <ContactsList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            isLoadingDelete={isLoadingDelete}
            isDeleteModalVisible={isDeleteModalVisible}
            contactBeingDeleted={contactBeingDeleted}
            onDeleteContact={handleDeleteContact}
            onCloseDeleteModal={handleCloseDeleteModal}
            onConfirmDeleteContact={handleConfirmDeleteContact}
          />

          <Modal
            visible={isDeleteModalVisible}
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            cancelLabel="Cancelar"
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            isLoading={isLoadingDelete}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
