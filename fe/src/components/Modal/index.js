import PropTypes from 'prop-types';

import { Container, Footer, Overlay } from './styles';

import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnMount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger,
  title,
  children,
  confirmLabel,
  cancelLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnMount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              type="button"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  isLoading: false,
};
