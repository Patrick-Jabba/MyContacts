/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import useHome from './useHome';
import {
  Card, Container,
  ListHeader,
} from './styles';

import edit from '../../assets/images/icons/edit.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import trash from '../../assets/images/icons/trash.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';

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

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyList />
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" title="Editar Contato" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Delete" title="Remover Contato" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

      <Modal
        visible={isDeleteModalVisible}
        danger
        title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}?`}
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </Container>
  );
}
