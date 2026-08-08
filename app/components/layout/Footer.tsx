
"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/products?category=Women" },
      { label: "Men", href: "/products?category=Men" },
      { label: "Accessories", href: "/products?category=Accessories" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              LuxeStore
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
              Premium fashion curated for modern lifestyles.
              Timeless designs, quality materials, and effortless
              everyday style.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-6 border-t border-neutral-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} LuxeStore. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-black">
              VISA
            </span>

            <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-black">
              MASTERCARD
            </span>

            <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-black">
              PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

