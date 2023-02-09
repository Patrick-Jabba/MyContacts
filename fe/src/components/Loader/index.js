import PropTypes from 'prop-types';

import ReactPortal from '../ReactPortal';

import { Overlay } from './styles';
import Spinner from '../Spinner';
import useAnimatedUnMount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnMount(isLoading);
  if (!shouldRender) {
    return null;
  }
  return (
    <ReactPortal
      containerId="loader-root"
    >
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
