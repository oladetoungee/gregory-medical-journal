"use client";

import { motion } from 'framer-motion';
import { Typewriter } from "@/components";
import { LibraryIcon, ChartBarIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the expected shape of the user prop
interface User {
  ok: boolean;
  data: {
    username: string;
  } | null; // Allow data to be null
}

// Hardcoded data for the table
const papers = [
  { dateSubmitted: '2024-09-15', name: 'AI and Medicine', reviewStatus: 'Under Review' },
  { dateSubmitted: '2024-08-25', name: 'Emerging Technologies in Healthcare', reviewStatus: 'Rejected' },
  { dateSubmitted: '2024-07-30', name: 'Neuroscience Monthly', reviewStatus: 'Accepted' },
];

export default function DashboardOverview({ user }: { user: User }) {
  // CTA boxes configuration
  const ctaItems = [
    { label: "Explore Papers", href: "/dashboard/papers", color: "bg-orange-50", icon: <LibraryIcon className="w-6 h-6" /> },
    { label: "View Analytics", href: "/dashboard/analytics", color: "bg-lime-50", icon: <ChartBarIcon className="w-6 h-6" /> },
    { label: "Manage Account", href: "/dashboard/account", color: "bg-indigo-50", icon: <UserIcon className="w-6 h-6" /> },
  ];

  // Function to style review status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600 font-bold';
      case 'Accepted':
        return 'bg-green-100 text-green-600';
      default:
        return '';
    }
  };

  return (
    <div className="m-12">
      {/* Welcome Message */}
      <div className="mb-8">
        <Typewriter
          text={`👋 Welcome to Gregory Medical Journal, ${user.data?.username || 'Guest'}!`}
          className="page-header text-2xl font-bold"
       
        />
      </div>

      {/* CTA Boxes */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {ctaItems.map(({ label, href, color, icon }) => (
          <Link key={label} href={href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer flex flex-col justify-between items-center p-6 rounded-lg shadow-md text-primary ${color}`}
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <p className="text-center font-medium">{label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Stylish Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Latest Papers</h2>
        {papers.length === 0 ? (
          <p className="text-gray-500">No papers available.</p>
        ) : (
          <Table>
            <TableCaption>A list of recent papers submitted for review.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Name of Paper</TableHead>
                <TableHead>Review Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper, index) => (
                <TableRow key={index}>
                  <TableCell>{paper.dateSubmitted}</TableCell>
                  <TableCell>{paper.name}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusStyles(paper.reviewStatus)}`}>
                      {paper.reviewStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
