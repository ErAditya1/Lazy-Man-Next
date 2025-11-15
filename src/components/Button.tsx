import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

type Props = {
  className?: string;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  // other custom props...
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  const { className = '', variant = 'primary', size = 'md', isLoading, ...rest } = props;

  // cast rest to HTMLMotionProps<'button'> so motion.button accepts it
  const motionProps = rest as unknown as HTMLMotionProps<'button'>;

  return (
    <motion.button
      ref={ref}
      className={`${className}`}
      {...motionProps}            // <-- cast applied here
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? 'Loading...' : props.children}
    </motion.button>
  );
});

export default Button;
