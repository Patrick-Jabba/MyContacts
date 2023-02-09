import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnMount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current;
    if (!visible && animatedElementRef.current) {
      elementRef.addEventListener(
        'animationend',
        handleAnimationEnd,
      );
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
