"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "./nav-links";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative pb-1 transition-colors duration-200 ${
              active
                ? "font-semibold text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {link.title}

            {active && (
              <motion.div
                layoutId="active-nav"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-black"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}