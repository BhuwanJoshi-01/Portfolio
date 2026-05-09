import { createContext } from 'react';
import { motionValue } from 'framer-motion';

export const ParallaxContext = createContext({
  normX: motionValue(0),
  normY: motionValue(0),
  enabled: false,
  intensity: 1,
});
