"use client";

import { ArrowUpRight, Check, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import BadgeCTA from "@/components/BadgeCTA";
import LeftNav3D from "@/components/LeftNav3D";
import Section from "@/components/Section";
import StatsStrip from "@/components/StatsStrip";
import Accordion from "@/components/Accordion";

export default function Home() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleFocusNav = (href: string) => {
    const id = href.replace("#", "");
    cleanupRef.current?.();
    document.body.setAttribute("data-focus", id);

    const clear = () => {
      document.body.removeAttribute("data-focus");
      window.removeEventListener("wheel", clear);
      window.removeEventListener("touchmove", clear);
      window.removeEventListener("keydown", onKey);
      cleanupRef.current = null;
    };

    const onKey = (event: KeyboardEvent) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (keys.includes(event.key)) {
        clear();
      }
    };

    window.addEventListener("wheel", clear, { passive: true });
    window.addEventListener("touchmove", clear, { passive: true });
    window.addEventListener("keydown", onKey);
    cleanupRef.current = clear;
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-[0.2em] uppercase">
          Wealth You
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted">
            <a className="focus-ring" href="#offer" onClick={() => handleFocusNav("#offer")}>
              Offer
            </a>
            <a className="focus-ring" href="#work" onClick={() => handleFocusNav("#work")}>
              Opportunities
            </a>
            <a className="focus-ring" href="#faq" onClick={() => handleFocusNav("#faq")}>
              FAQ
            </a>
          </nav>
          <a
            href="#work"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-soft"
          >
            Book a meeting
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <Section className="relative">
        <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-12 gap-6 px-6 pb-10 pt-14">
          <div className="col-span-12 lg:col-span-3">
            <LeftNav3D onNavigate={handleFocusNav} />
            <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
              {[
                { label: "FAQ", href: "#faq" },
                { label: "Opportunities", href: "#work" },
                { label: "About us", href: "#about" }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleFocusNav(item.href)}
                  className={`focus-ring rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                    item.label === "Opportunities" ? "border-accent/30 bg-white/90" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <div className="flex items-end gap-4">
                <div className="text-5xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-accent">
                  1% → 10%
                </div>
                <div className="mb-2 text-xs uppercase tracking-[0.4em] text-muted">
                  Wealth 101
                </div>
              </div>
              <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95]">
                Grow your money
              </motion.h1>
              <motion.p variants={fadeUp} className="max-w-xl text-base text-muted">
                Practical financial education. Clear steps. Real accountability.
                Build a calm, repeatable system for cash flow, investing, and
                long-term confidence.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  Book a meeting
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#offer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Sign UP
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-[#efe7dd] p-6 shadow-soft md:grid-cols-[1.1fr_0.9fr]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            >
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.3em] text-muted">
                  Featured path
                </div>
                <h2 className="font-display text-2xl font-semibold">
                  Financial Needs Analysis
                </h2>
                <p className="mt-2 text-sm text-muted">
                  An FNA reveals financial blind spots, protects your future, and builds a clear roadmap toward security and
                  long-term wealth.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
                  <Sparkle className="h-4 w-4" />
                  Returns with little to no risk
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-6">
                <div className="w-full rounded-2xl border border-black/10 bg-white p-4">
                  <svg
                    viewBox="0 0 240 120"
                    className="h-24 w-full text-accent"
                    role="img"
                    aria-label="Abstract chart line"
                  >
                    <path
                      d="M10 90 C40 60 60 70 90 50 C120 30 150 40 180 20 C200 10 220 15 230 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="90" cy="50" r="4" fill="currentColor" />
                    <circle cx="180" cy="20" r="4" fill="currentColor" />
                    <circle cx="230" cy="8" r="4" fill="currentColor" />
                  </svg>
                </div>
                <a
                  href="#work"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-bg transition-transform duration-200 hover:-translate-y-0.5"
                >
                  DO YOUR FNA WITH US
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 flex items-start justify-start lg:col-span-2 lg:justify-end">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <BadgeCTA href="#offer" label="Start here" />
            </motion.div>
          </div>
        </div>
      </Section>

      <Section id="offer" className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-16">
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="h-full min-h-[320px] rounded-3xl border border-black/10 bg-gradient-to-br from-[#f7f2eb] to-[#e9dfd3] p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  What we provide
                </div>
                <div className="text-2xl font-display font-semibold">
                  The best roadmap for your financial goals and objectives.
                </div>
                <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    snapshot
                  </div>
                  <div className="mt-3 text-sm text-muted">
                    Income Clarity, Cash Flow Automation, Risk Management,
                    Investing Fundamentals, Accountability Support and Financial Needs Analysis(FNA).
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="h-full rounded-3xl border border-black/10 bg-white p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">
                Our promise
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                Less noise. More certainty.
              </h3>
              <p className="mt-4 text-sm text-muted">
                We replace overwhelm with calm action plans and consistent
                tracking rituals.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="h-full rounded-3xl border border-black/10 bg-white p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">
                Key features
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {[
                  "Personalized Financial Needs Analysis",
                  "Goal-Based Strategy Sessions",
                  "Tax Reduction & Cash-Flow Optimization",
                  "Investment Guidance"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-16">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted">
              Nothing compares
            </div>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Clarity beats hype.
            </h2>
            <p className="mt-4 max-w-lg text-sm text-muted">
              We build a stable foundation for financial decisions so you can
              move fast without sacrificing confidence.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <StatsStrip />
          </motion.div>
        </div>
      </Section>

      <Section id="about" className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-16">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted">
              About us
            </div>
            <h2 className="mt-6 font-display text-4xl font-semibold">
              Financial literacy built for modern lives.
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted">
              At Wealth You, we provide financial education for those who feel they’re meant for more - more stability, more freedom, more control over their future.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Transparent guidance",
                "Financial Mentorship",
                "Investing Mindset",
                "Long-term Confidence"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="h-full rounded-3xl border border-black/10 bg-white p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">
                Company
              </div>
              <div className="mt-4 h-40 rounded-2xl border border-black/10 bg-gradient-to-br from-[#f5efe7] to-[#e6dbcf]" />
              <p className="mt-4 text-sm text-muted">
                Professional Team with Rich expirience. Detailed guidance. Long-term perspective with evidence based strategies from trusted North American partners.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="work" className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-16">
          <motion.div
            className="col-span-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted">
              Opportunities
            </div>
            <h2 className="mt-6 font-display text-4xl font-semibold">
              Choose the path that fits your pace.
            </h2>
          </motion.div>
          {[
            {
              title: "Join our team",
              bullets: [
                "Official Licensing",
                "Structured Education",
                "Long-lasting support"
              ]
            },
            {
              title: "Social Media Collaboration",
              bullets: [
                "Educational content",
                "Brand Development",
                "Exclusive strategies"
              ]
            },
            {
              title: "Community",
              bullets: [
                "Mindset Growth",
                "Private Networking",
                "Direct Team Support"
              ]
            }
          ].map((card) => (
            <motion.div
              key={card.title}
              className="col-span-12 md:col-span-4 rounded-3xl border border-black/10 bg-white p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <h3 className="font-display text-2xl font-semibold">
                {card.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <a
                href="#work"
                className="focus-ring mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                Apply
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="faq" className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-16">
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted">
              FAQ
            </div>
            <h2 className="mt-6 font-display text-4xl font-semibold">
              Clear rules, Clear goals.
            </h2>
            <p className="mt-4 text-sm text-muted">
              

              Everything you need to decide if this is the right next step for
              your financial growth.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <Accordion />
          </motion.div>
        </div>
      </Section>

      <footer className="border-t border-black/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            © 2026 Wealth You
          </div>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted">
            <a className="focus-ring" href="#about" onClick={() => handleFocusNav("#about")}>
              About
            </a>
            <a className="focus-ring" href="#work" onClick={() => handleFocusNav("#work")}>
              Opportunities
            </a>
            <a className="focus-ring" href="#faq" onClick={() => handleFocusNav("#faq")}>
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
