'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cross2Icon, HamburgerMenuIcon, PersonIcon, ChevronDownIcon} from '@radix-ui/react-icons';

const MobileNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        {isOpen ? <Cross2Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
    
      </button>
      {isOpen && (
        <motion.div
          className="mt-12 absolute top-0 left-0 w-full h-auto bg-white z-30 p-12 flex flex-col space-y-4"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
        >
      
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
          <NavItem title="Submit Manuscript"  href="/manuscript-guidelines" />
        
          <UserDropdown />
   
        
        </motion.div>
      )}
    </div>
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
    <div>
      <button onClick={() => setOpen(!open)} className="hover:text-primary  transition-colors">
        {title}
      </button>
      {open && (
        <motion.div
          className="ml-4"
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
        className={`block px-2 py-4 text-xs ${isLast ? '' : 'border-b border-gray-300'} hover:text-primary hover:font-bold`}
      >
        {title}
      </Link>
    </div>
  );
};

const UserDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="flex items-center cursor-pointer">
        <PersonIcon className="w-4 h-4" />
        <ChevronDownIcon className="w-4 h-4" />
      </div>
      {open && (
        <motion.div
          className="py-2 absolute bg-white rounded shadow-md w-36 z-10 border-b-8 border-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <DropdownMenuItem title="Log In" href="/signin" />
          <DropdownMenuItem title="Sign Up" href="/signup" isLast />
        </motion.div>
      )}
    </div>
  );
};

export default MobileNavBar;
