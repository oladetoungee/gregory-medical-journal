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
import { useAuth } from "@/contexts/AuthContext";
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
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="h-screen flex">
      {/* Mobile Navigation Overlay */}
      {isNavOpen && (
        <nav className="bg-primary fixed top-[60px] left-0 w-full z-10 md:hidden">
          <NavList navItems={navItems} />
        </nav>
      )}

      {/* Sidebar Navigation for Desktop - Fixed */}
      <nav className="bg-primary hidden md:block fixed left-0 top-0 h-full w-64 z-20">
        <div className="flex h-full flex-col gap-2">
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

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header - Fixed */}
        <header className="flex items-center justify-between md:justify-end px-6 py-3 bg-primary h-[60px] w-full fixed top-0 right-0 md:left-64 z-10">
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex gap-2 items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || user.email || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center text-base font-semibold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                
                <LogoutButton />
              </div>
            ) : (
              <Link href="/signin">
                <button className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100">
                  Sign In
                </button>
              </Link>
            )}
          </div>
          <button
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="block md:hidden"
          >
            <HamburgerMenuIcon className="h-6 w-6 text-gray-400 hover:text-gray-50" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <section className="flex-1 overflow-auto pt-[60px]">
          {children}
        </section>
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

