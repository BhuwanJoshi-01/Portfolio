import React, { useContext } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { ParallaxContext } from './ParallaxContext';
import { springs } from '../../hooks/useMotionConfig';

const MAX_TRANSLATE_PX = 40;
const MAX_ROTATE_DEG = 2.5;

const ParallaxLayer = ({
  depth = 0.5,
  translateZ = 0,
  blur,
  tilt = true,
  className = '',
  style,
  children,
  spring = springs.smooth,
  ...rest
}) => {
  const { normX, normY, enabled, intensity } = useContext(ParallaxContext);
  const sx = useSpring(normX, spring);
  const sy = useSpring(normY, spring);

  const eff = enabled ? depth * intensity : 0;
  const range = eff * MAX_TRANSLATE_PX;
  const rot = eff * MAX_ROTATE_DEG;

  const x = useTransform(sx, [-1, 1], [-range, range]);
  const y = useTransform(sy, [-1, 1], [-range, range]);
  const rotateY = useTransform(sx, [-1, 1], tilt ? [-rot, rot] : [0, 0]);
  const rotateX = useTransform(sy, [-1, 1], tilt ? [rot, -rot] : [0, 0]);

  const inferred = blur ?? (depth < 0.2 ? 'far' : depth < 0.45 ? 'mid' : 'sharp');
  const blurClass =
    inferred === 'far' ? 'depth-blur-far' :
    inferred === 'mid' ? 'depth-blur-mid' :
    inferred === 'sharp' ? 'depth-sharp' : '';

  return (
    <motion.div
      className={`${blurClass} ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        x, y, rotateX, rotateY,
        z: translateZ,
        transformStyle: 'preserve-3d',
        willChange: enabled ? 'transform' : 'auto',
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
