import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type }) {
  return (
    <Container>
      {type === 'danger' && <img src={xCircleIcon} alt="X" /> }
      {type === 'success' && <img src={checkCircleIcon} alt="Circle" /> }
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'danger', 'success']),
};

ToastMessage.defaulProps = {
  type: 'default',
};
