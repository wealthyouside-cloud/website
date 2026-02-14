"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

type CardTime = "monday-8pm" | "wednesday-8pm" | "flexible";

const REASON_OPTIONS = [
  "Financial planning",
  "Investment education",
  "Tax strategy",
  "Career opportunity",
  "Social media collaboration"
] as const;

const CARD_TIME_OPTIONS: Array<{ value: CardTime; label: string }> = [
  { value: "monday-8pm", label: "Monday 8pm" },
  { value: "wednesday-8pm", label: "Wednesday 8pm" },
  { value: "flexible", label: "Flexible" }
];

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [cardTime, setCardTime] = useState<CardTime | "">("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const isMessageRequired = useMemo(() => cardTime === "flexible", [cardTime]);

  const toggleReason = (reason: string) => {
    setReasons((current) =>
      current.includes(reason) ? current.filter((item) => item !== reason) : [...current, reason]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!fullName.trim() || !email.trim() || !cardTime || reasons.length === 0) {
      setFeedback({ type: "error", text: "Please complete all required fields." });
      return;
    }

    if (isMessageRequired && !message.trim()) {
      setFeedback({
        type: "error",
        text: "Message is required when card time is set to Flexible."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          reasons,
          cardTime,
          message
        })
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setFeedback({ type: "error", text: data.error ?? "Unable to submit your request." });
        return;
      }

      setFeedback({
        type: "success",
        text: "Your request was sent. We will reach out shortly."
      });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setReasons([]);
      setCardTime("");
      setMessage("");
    } catch {
      setFeedback({
        type: "error",
        text: "Network error while submitting the form. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-black/10 bg-white p-6 shadow-soft sm:p-8">
      <div>
        <label htmlFor="full-name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-black/10 bg-bg px-4 py-3 text-sm outline-none transition focus:border-accent/40"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-black/10 bg-bg px-4 py-3 text-sm outline-none transition focus:border-accent/40"
        />
      </div>

      <div>
        <label htmlFor="phone-number" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Phone Number (Optional)
        </label>
        <input
          id="phone-number"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-black/10 bg-bg px-4 py-3 text-sm outline-none transition focus:border-accent/40"
        />
      </div>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Reason (Bullets Why)
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {REASON_OPTIONS.map((reason) => {
            const checked = reasons.includes(reason);
            return (
              <label
                key={reason}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked ? "border-accent/40 bg-[#f8f2ef]" : "border-black/10 bg-bg"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-accent"
                  checked={checked}
                  onChange={() => toggleReason(reason)}
                />
                <span>{reason}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">CardTime</legend>
        <p className="mt-2 text-sm text-muted">
          Pick your preferred meeting slot. If you choose Flexible, please include details in Message.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {CARD_TIME_OPTIONS.map((option) => {
            const selected = cardTime === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setCardTime(option.value)}
                className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-black/10 bg-bg text-ink hover:border-accent/40"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Message {isMessageRequired ? "(Required for Flexible)" : "(Optional)"}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required={isMessageRequired}
          rows={5}
          className="mt-2 w-full resize-y rounded-2xl border border-black/10 bg-bg px-4 py-3 text-sm outline-none transition focus:border-accent/40"
          placeholder="Tell us what you want to cover."
        />
      </div>

      {feedback ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border border-[#5a9068]/30 bg-[#edf7ef] text-[#285436]"
              : "border border-[#9e3b3b]/30 bg-[#fbefef] text-[#7a1f1f]"
          }`}
        >
          {feedback.text}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send request"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
