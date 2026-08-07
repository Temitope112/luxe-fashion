export interface NavLink {
  title: string;
  href: string;
}

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/products",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];