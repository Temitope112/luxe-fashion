
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";

import { useCartStore } from "../store/cart-store";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  const shipping = subtotal >= 150 ? 0 : 10;

  const total = subtotal + shipping;

  const isFormComplete =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state.trim() !== "";

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!isFormComplete || items.length === 0) {
      return;
    }

    // Payment integration will be added here later.
    console.log("Order ready for payment", {
      customer: form,
      items,
      subtotal,
      shipping,
      total,
    });
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 max-w-md text-neutral-500">
            Add some products to your cart before proceeding
            to checkout.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            LuxeStore
          </Link>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Lock size={15} />
            Secure Checkout
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section className="px-6 py-10 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
            {/* Left */}
            <div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
                  Checkout
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  Complete your order.
                </h1>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-12 space-y-10"
              >
                {/* Contact */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                      Contact Information
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      We&apos;ll use this information to contact you
                      about your order.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
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
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black sm:col-span-2"
                      />
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="border-t border-neutral-200 pt-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                      Delivery Information
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Where should we deliver your order?
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Address */}
                    <div>
                      <label
                        htmlFor="address"
                        className="text-sm font-medium"
                      >
                        Delivery Address
                      </label>

                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street address"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* City */}
                      <div>
                        <label
                          htmlFor="city"
                          className="text-sm font-medium"
                        >
                          City
                        </label>

                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="Lagos"
                          className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                        />
                      </div>

                      {/* State */}
                      <div>
                        <label
                          htmlFor="state"
                          className="text-sm font-medium"
                        >
                          State
                        </label>

                        <select
                          id="state"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-black"
                        >
                          <option value="">
                            Select state
                          </option>
                          <option value="Lagos">Lagos</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Ogun">Ogun</option>
                          <option value="Abuja">
                            Federal Capital Territory
                          </option>
                          <option value="Rivers">Rivers</option>
                          <option value="Kano">Kano</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="border-t border-neutral-200 pt-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                      Payment
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Secure payment will be available at the
                      next step.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-black">
                        <div className="h-2.5 w-2.5 rounded-full bg-black" />
                      </div>

                      <div>
                        <p className="font-medium">
                          Secure Online Payment
                        </p>

                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                          You&apos;ll be redirected to secure
                          payment when payment integration is
                          connected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={!isFormComplete}
                    className={`w-full rounded-xl px-6 py-4 font-semibold transition ${
                      isFormComplete
                        ? "bg-black text-white hover:bg-neutral-800"
                        : "cursor-not-allowed bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    Continue to Payment
                  </button>

                  {!isFormComplete && (
                    <p className="mt-3 text-center text-xs text-neutral-400">
                      Please complete all required fields.
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
                <h2 className="text-xl font-semibold">
                  Order Summary
                </h2>

                <div className="mt-7 space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />

                        <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-xs font-medium text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-xs text-neutral-500">
                          {item.selectedColor} ·{" "}
                          {item.selectedSize}
                        </p>

                        <p className="mt-2 text-sm font-semibold">
                          $
                          {(
                            item.product.price *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-7 border-t border-neutral-200" />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">
                      Delivery
                    </span>

                    <span className="font-medium">
                      {shipping === 0
                        ? "Free"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="my-7 border-t border-neutral-200" />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {subtotal < 150 && (
                  <p className="mt-5 rounded-xl bg-neutral-50 p-4 text-xs leading-5 text-neutral-500">
                    Add $
                    {(150 - subtotal).toFixed(2)} more to
                    qualify for free shipping.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

