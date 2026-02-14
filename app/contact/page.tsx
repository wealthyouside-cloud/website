import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="focus-ring text-sm font-semibold uppercase tracking-[0.2em]">
            Wealth You
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted">Book a meeting</div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f3ec] via-[#efe4d8] to-[#e5d8ca] p-8 shadow-soft">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">Contact</div>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Let&apos;s lock your next financial move.
              </h1>
              <p className="mt-4 max-w-md text-sm text-muted">
                Fill out the form and we&apos;ll confirm your preferred time card. The visual panel stays fixed
                while you complete the form for a cleaner flow.
              </p>
              <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">What happens next</div>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    We review your selected reason and card time.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    We reply by email to confirm your session.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Flexible slots are arranged from your message details.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
