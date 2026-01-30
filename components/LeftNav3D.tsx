"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
};

const items: NavItem[] = [
  { label: "FAQ", href: "#faq" },
  { label: "Work with us", href: "#work" },
  { label: "About us", href: "#about" }
];

export default function LeftNav3D() {
  const [active, setActive] = useState<string>("#faq");

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="nav-3d hidden lg:flex flex-col gap-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted">
        Menu
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = active === item.href;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              className={`nav-3d-card focus-ring relative rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-ink shadow-sm transition-all duration-300 ${
                isActive
                  ? "bg-white shadow-soft"
                  : "bg-white/60 hover:bg-white"
              }`}
              style={{
                transform: `rotateY(-12deg) translateZ(${isActive ? 30 : 10}px) translateX(${index * 4}px)`
              }}
              whileHover={{ y: -2 }}
            >
              <span className="block">{item.label}</span>
              {isActive ? (
                <span className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />
              ) : null}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
