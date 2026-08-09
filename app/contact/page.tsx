"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const isFormComplete = useMemo(() => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.subject.trim() !== "" &&
      form.message.trim() !== ""
    );
  }, [form]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormComplete) return;

    setSubmitted(true);
  };

  const whatsappNumber = "2348057977603";

  const whatsappMessage = encodeURIComponent(
    "Hello LuxeStore, I would like to make an enquiry."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const resetForm = () => {
    setSubmitted(false);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Contact LuxeStore
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
            We&apos;d love to
            <br />
            hear from you.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Have a question about an order, a product, or LuxeStore in
            general? Send us a message and we&apos;ll get back to you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold">Let&apos;s talk.</h2>

            <p className="mt-5 max-w-md leading-7 text-neutral-600">
              Our team is available to help with orders, products, shipping,
              and any other questions you may have.
            </p>

            <div className="mt-10 space-y-7">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-semibold">Email</p>

                  <p className="mt-1 text-sm text-neutral-500">
                    hello@luxestore.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="font-semibold">Phone</p>

                  <p className="mt-1 text-sm text-neutral-500">
                    +234 8057977603
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="font-semibold">Location</p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center gap-4 rounded-2xl border border-neutral-200 p-5 transition hover:border-black hover:bg-neutral-50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Phone size={19} />
              </div>

              <div>
                <p className="font-semibold">Chat with us on WhatsApp</p>

                <p className="mt-1 text-sm text-neutral-500">
                  Get a quick response from our team.
                </p>
              </div>
            </a>

            {/* Support */}
            <div className="mt-6 rounded-3xl bg-neutral-100 p-6">
              <p className="font-semibold">Customer Support</p>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-xl text-white">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-bold">Message sent</h2>

                <p className="mt-3 max-w-md text-neutral-500">
                  Thanks for reaching out. We&apos;ll get back to you as soon
                  as possible.
                </p>

                <button
                  onClick={resetForm}
                  className="mt-8 rounded-full border border-black px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Write your message..."
                    className="mt-2 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isFormComplete}
                  className={`w-full rounded-xl px-6 py-4 font-semibold transition ${
                    isFormComplete
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "cursor-not-allowed bg-neutral-200 text-neutral-400"
                  }`}
                >
                  Send Message
                </button>

                {!isFormComplete && (
                  <p className="text-center text-xs text-neutral-400">
                    Please complete all fields to send your message.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}