import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" /> }
      {message.type === 'success' && <img src={checkCircleIcon} alt="Circle" /> }
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
};
