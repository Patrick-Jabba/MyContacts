/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfContacts.length > 0
        ? 'space-between'
        : 'center'
    );
  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfContacts.length > 0) && (
      <strong>
        {qtyOfFilteredContacts.length}
        {qtyOfFilteredContacts.length === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
