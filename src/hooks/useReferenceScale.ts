import { useWindowDimensions } from 'react-native';
import { REFERENCE_WIDTH } from '../theme/spacing';

export function useReferenceScale() {
  const { width, height } = useWindowDimensions();
  const needsHorizontalScroll = false;
  const scale = Math.min(1, width / REFERENCE_WIDTH);
  return {
    windowWidth: width,
    needsHorizontalScroll,
    contentWidth: width < REFERENCE_WIDTH ? REFERENCE_WIDTH : undefined,
    scale,
    contentHeight: height / scale,
  };
}
