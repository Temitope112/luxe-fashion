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
      "Women",
      "Men",
      "Accessories",
      "New Arrivals",
    ],
  },

  {
    title: "Company",
    links: [
      "About",
      "Contact",
      "Careers",
      "Blog",
    ],
  },

  {
    title: "Support",
    links: [
      "FAQ",
      "Shipping",
      "Returns",
      "Privacy Policy",
    ],
  },
];


const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
  },
];


export default function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">


        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


          {/* Brand */}
          <div>

            <Link
              href="/"
              className="text-3xl font-bold tracking-tight"
            >
              LuxeStore
            </Link>


            <p className="mt-6 max-w-sm leading-7 text-neutral-400">
              Premium fashion curated for modern lifestyles.
              Timeless designs, quality materials, and effortless style.
            </p>



            {/* Social Icons */}
            <div className="mt-8 flex gap-3">

              {socials.map((social) => {

                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition duration-300 hover:bg-white hover:text-black"
                  >
                    <Icon size={18}/>
                  </Link>
                );

              })}

            </div>


          </div>




          {/* Footer Links */}

          {footerLinks.map((section)=>(

            <div key={section.title}>

              <h3 className="text-lg font-semibold">
                {section.title}
              </h3>


              <ul className="mt-6 space-y-4">

                {section.links.map((link)=>(

                  <li key={link}>

                    <Link
                      href="#"
                      className="text-neutral-400 transition hover:text-white"
                    >
                      {link}
                    </Link>

                  </li>

                ))}

              </ul>


            </div>

          ))}


        </div>




        {/* Bottom */}

        <div className="mt-16 flex flex-col gap-6 border-t border-neutral-800 pt-8 md:flex-row md:items-center md:justify-between">


          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} LuxeStore.
            All rights reserved.
          </p>



          {/* Payment */}
          <div className="flex items-center gap-3">

            <span className="rounded bg-white px-3 py-2 text-xs font-bold text-black">
              VISA
            </span>


            <span className="rounded bg-white px-3 py-2 text-xs font-bold text-black">
              Mastercard
            </span>


            <span className="rounded bg-white px-3 py-2 text-xs font-bold text-black">
              Pay
            </span>

          </div>


        </div>


      </div>

    </footer>
  );
}