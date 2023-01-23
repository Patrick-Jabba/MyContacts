import PropTypes from 'prop-types';

import { Container } from './styles';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Question Mark" />

      <span>
        Nenhum resultado foi encontrado para
        <strong>{searchTerm}</strong>
        .
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
