'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PersonIcon, ChevronDownIcon } from '@radix-ui/react-icons';

const NavBar: React.FC = () => {
  return (
    <nav className="hidden md:flex  items-center space-x-6 relative z-20">
      <NavItem title="Home" href="/" />
      <DropdownNavItem title="Journals">
        <DropdownMenuItem title="Articles" href="/journals/articles" />
        <DropdownMenuItem title="Latest Article" href="/journals/latest" />
        <DropdownMenuItem title="Editor's Pick" href="/journals/editors-pick" isLast />
      </DropdownNavItem>
      <DropdownNavItem title="About">
        <DropdownMenuItem title="About This Journal" href="/about/about-this-journal" />
        <DropdownMenuItem title="Editorial Board" href="/about/editorial-board" />
        <DropdownMenuItem title="Publication Ethics" href="/about/publication-ethics" />
        <DropdownMenuItem title="Article Processing Charges" href="/about/processing-charges" isLast />
      </DropdownNavItem>
      <DropdownNavItem title="Submit Manuscript">
        <DropdownMenuItem title="Submission Guidelines" href="/submit/guidelines" />
        <DropdownMenuItem title="Review Flow" href="/submit/review-flow" isLast />
      </DropdownNavItem>

      <div className="ml-auto flex items-center space-x-4">
        <UserDropdown />
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ title: string; href: string }> = ({ title, href }) => {
  return (
    <Link href={href} className="hover:text-primary hover:font-bold transition-colors">
      {title}
    </Link>
  );
};

const DropdownNavItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button className="hover:text-primary hover:font-bold transition-colors">{title}</button>
      {open && (
        <motion.div
       className="absolute bg-white rounded shadow-md rounded-t-none py-2 z-10 border-b-8 border-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const DropdownMenuItem: React.FC<{ title: string; href: string; isLast?: boolean }> = ({ title, href, isLast }) => {
  return (
    <div className="pt-2">
      <Link
        href={href}
        className={`block px-2 py-4 w-36 text-xs ${isLast ? '' : 'border-b border-gray-300'} hover:text-primary hover:font-bold`}
      >
        {title}
      </Link>
    </div>
  );
};

const UserDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative flex items-center cursor-pointer"
    >
      <PersonIcon className="w-4 h-4" />
      <ChevronDownIcon className="w-4 h-4" />
      {open && (
        <motion.div
          className="top-4 right-0 py-2 absolute bg-white rounded shadow-md w-36 rounded-t-none py-2 z-10 border-b-8 border-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <DropdownMenuItem title="Log In" href="/login" />
          <DropdownMenuItem title="Sign Up" href="/signup" isLast />
        </motion.div>
      )}
    </div>
  );
};

export default NavBar;
