'use client'
import React from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center space-x-4">
      <NavItem title="Home" href="/" />
      <DropdownNavItem title="Journals">
        <DropdownMenuItem title="Medical Research" href="/journals/medical-research" />
        <DropdownMenuItem title="Clinical Trials" href="/journals/clinical-trials" />
      </DropdownNavItem>
      <NavItem title="About" href="/about" />
      <NavItem title="Submit Manuscript" href="/submit" />
      <div className="ml-auto flex space-x-4">
  <Link href="/login" className="text-blue-900 hover:text-blue-600">
    Login
  </Link>
  <Link href="/signup" className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-600">
    Signup
  </Link>
</div>

    </nav>

  );
};

const NavItem: React.FC<{ title: string; href: string }> = ({ title, href }) => {
  return (
    <Link href={href} className="text-blue-900 hover:text-blue-600">
      {title}
    </Link>
  );
};

const DropdownNavItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-blue-900 hover:text-blue-600">{title}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content asChild>
          <motion.div
            className="bg-white rounded shadow-md mt-2 py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {children}
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const DropdownMenuItem: React.FC<{ title: string; href: string }> = ({ title, href }) => {
  return (
    <DropdownMenu.Item asChild>
      <Link href={href}>
        <a className="block px-4 py-2 text-blue-900 hover:bg-gray-100">{title}</a>
      </Link>
    </DropdownMenu.Item>
  );
};

export default NavBar;
