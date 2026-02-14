"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = {
  question: string;
  answer: string;
};

const items: Item[] = [
  {
    question: "Who is this for?",
    answer:
      "Our services are designed for individuals who want to build long-term wealth, support their income, and manage their finances with confidence. Whether you are just starting out or looking to improve your current financial strategy, we provide professional guidance tailored to your goals."
  },
  {
    question: "Why should I trust you?",
    answer:
      "At Wealth You, we focus on education, transparency, and long-term relationships. We work alongside 70+ of the largest financial companies across North America, giving clients access to a wide range of trusted financial solutions. Our goal is to help you understand your options clearly so you can make confident financial decisions."
  },
  {
    question: "What if I am brand new to investing?",
    answer:
      "That’s perfectly fine. We believe that anyone can build a successful investment plan with the right guidance. Even if you have little or no prior investing experience, we’ll help you understand the basics and create a clear, manageable plan tailored to your situation."
  },
  {
    question: "Do I need a lot of money to start investing?",
    answer:
      "No. Long-term investing and wealth building are not about starting with a large sum — they are about consistency and strategic planning. Even investing as little as $50 per month can grow into a meaningful amount over time when supported by a long-term investment strategy."
  },
  {
    question: "Do you offer 1-on-1 meetings?",
    answer:
      "Yes. We offer personalized 1-on-1 consultations to understand your goals and provide financial education and strategy guidance. Most of the meetings are held virtually for convenience and flexibility."
  },
  {
    question: "Do I need to pay anything?",
    answer:
      "No. Consultations and educational sessions are provided at no cost. If you decide to move forward with financial products or services, any associated fees will always be explained clearly in advance."
  }
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border border-black/10 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="px-6 py-5">
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between text-left text-base font-medium"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
