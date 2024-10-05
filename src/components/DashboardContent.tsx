"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import {  ChartBarIcon, UserIcon, GripHorizontal, HelpCircle, LibraryIcon, WalletMinimal } from 'lucide-react';
import { LogoutButton } from "@/components/forms/LogoutButton";
import images from "@/constants/images";
import { usePathname } from 'next/navigation';

// Reusable navigation items array
const navItems = [
  { href: "/dashboard", icon: <GripHorizontal />, label: "Overview" },
  { href: "/dashboard/papers", icon: <LibraryIcon />, label: "Papers" },
  { href: "/dashboard/analytics", icon: <ChartBarIcon />, label: "Analytics" },
  { href: "/dashboard/account", icon: <UserIcon />, label: "Account" },
  { href: "/dashboard/payment", icon: <WalletMinimal />, label: "Payment" },
  { href: "/dashboard/support", icon: <HelpCircle />, label: "Help Center" },

];

export default function DashboardContent({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { ok: boolean; data: { username: string, image: string } };
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="h-screen">
      {/* Mobile Navigation */}
      {isNavOpen && (
        <nav className="bg-primary absolute top-[60px] left-0 w-full z-10 md:hidden">
          <NavList navItems={navItems} />
        </nav>
      )}

      <div className="grid md:grid-cols-[24%_1fr] h-full">
        {/* Sidebar Navigation for Desktop */}
        <nav className="bg-primary hidden md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center pl-2">
              <div className="flex items-center gap-4">
                <Image
                  src={images.hall1}
                  alt="Gregory Medical Journal Logo"
                  className="h-4 w-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-sm font-semibold text-white">
                  Gregory Medical Journal
                </h3>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavList navItems={navItems.filter(item => item.label !== "Log Out")} />
              </nav>
            </div>
          </div>
        </nav>

   {/* Main Content */}
<main className="flex flex-col m-0 p-0 text-gray-400">
  {/* Header */}
  <header className="flex items-center justify-between md:justify-end px-6 py-3 bg-primary h-[60px] w-full">
    <div className="flex items-center gap-2">
      {/* <BellIcon className="h-6 w-6 text-gray-400 hover:text-gray-50" /> */}
      {user.ok ? (
        <div className="flex gap-2 items-center">
          {user.data.image ? (
            <img
              src={user.data.image}
              alt={user.data.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center text-base font-semibold">
              {user.data.username[0].toUpperCase()}
            </div>
          )}
         
          <LogoutButton />
        </div>
      ) : (
        <p>Login</p>
      )}
    </div>
    <button
      onClick={() => setIsNavOpen((prev) => !prev)}
      className="block md:hidden"
    >
      <HamburgerMenuIcon className="h-6 w-6 text-gray-400 hover:text-gray-50" />
    </button>
  </header>
  <section>{children}</section>
</main>

      </div>
    </div>
  );
}

// Extracted NavList component for rendering nav items
function NavList({ navItems }: { navItems: { href: string; icon: React.ReactNode; label: string }[] }) {
  return (
    <div className="flex flex-col items-start gap-4 p-4 text-sm font-medium">
      {navItems.map(({ href, icon, label }) => (
        <NavItem key={href} href={href} icon={icon}>
          {label}
        </NavItem>
      ))}
    </div>
  );
}

// Reusable NavItem component
function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex md:text-base text-sm items-center gap-8 rounded-lg px-3 py-2 
        ${isActive ? 'text-primary bg-secondary w-full' : 'text-gray-400 hover:text-gray-50'}
      `}
    >
      {icon}
      {children}
    </Link>
  );
}

