export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ] as const;
  
  export type NavLink = typeof navLinks[number];
  