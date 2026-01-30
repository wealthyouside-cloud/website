"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = {
  question: string;
  answer: string;
};

const items: Item[] = [
  {
    question: "What makes your program different?",
    answer:
      "We focus on fundamentals and repeatable systems, not hype. Every lesson maps to a practical decision you can make immediately."
  },
  {
    question: "Who is this for?",
    answer:
      "Builders, creatives, and professionals who want clear financial literacy, better cash flow, and confident investing habits."
  },
  {
    question: "Do you offer 1:1 support?",
    answer:
      "Yes. We offer focused coaching sessions and a guided roadmap based on your current stage and goals."
  },
  {
    question: "How long does it take to see progress?",
    answer:
      "Most members report clarity within the first week and measurable improvements within a month of consistent action."
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. All plans are month-to-month with clear terms and zero hidden fees."
  },
  {
    question: "What if I am brand new to investing?",
    answer:
      "You will start with a fundamentals track that covers budgeting, risk, and simple portfolio construction."
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
