"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      {...props}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
