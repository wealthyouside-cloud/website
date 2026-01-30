"use client";

import { motion } from "framer-motion";

type BadgeCTAProps = {
  href: string;
  label: string;
};

export default function BadgeCTA({ href, label }: BadgeCTAProps) {
  return (
    <motion.a
      href={href}
      className="focus-ring relative flex h-32 w-32 items-center justify-center rounded-full border border-accent/60 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
      whileHover={{ rotate: 6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label={label}
    >
      <span className="px-4 leading-tight">{label}</span>
    </motion.a>
  );
}
