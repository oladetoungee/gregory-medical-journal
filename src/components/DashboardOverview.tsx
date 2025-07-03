"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Typewriter } from "@/components";
import { LibraryIcon, ChartBarIcon, UserIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { articleService } from '@/lib/firebase/article-service';
import { Article } from '@/lib/firebase/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define CTA box configuration
const ctaItems = [
  {
    label: "Explore Papers",
    href: "/dashboard/papers",
    color: "bg-orange-50",
    icon: <LibraryIcon className="w-6 h-6" />,
  },
  {
    label: "View Analytics",
    href: "/dashboard/analytics",
    color: "bg-lime-50",
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    label: "Manage Account",
    href: "/dashboard/account",
    color: "bg-indigo-50",
    icon: <UserIcon className="w-6 h-6" />,
  },
];

// Utility function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Function to style review status
const getStatusStyles = (status: string) => {
  switch (status) {
    case 'under review':
      return 'bg-yellow-100 text-yellow-700';
    case 'rejected':
      return 'bg-red-100 text-red-700 font-bold';
    case 'accepted':
      return 'bg-green-100 text-green-700';
    case 'approved':
      return 'bg-blue-100 text-blue-700';
    case 'draft':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function DashboardOverview() {
  const { user } = useAuth();
  const [papers, setPapers] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPapers = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userArticles = await articleService.getArticlesByUser(user.uid);
        setPapers(userArticles.slice(0, 5)); // Show only latest 5 papers
      } catch (error) {
        console.error('Error fetching user papers:', error);
        toast.error('Failed to load your papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPapers();
  }, [user?.uid]);

  if (!user) {
    return (
      <div className="m-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view your dashboard</h2>
          <Link href="/signin">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="m-12">
      {/* Welcome Message */}
      <div className="mb-8">
        <Typewriter
          text={`👋 Welcome to Gregory Medical Journal, ${user.displayName || user.email || 'Guest'}!`}
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

      {/* Papers Table */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Your Latest Papers</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No papers submitted yet.</p>
            <Link href="/dashboard/papers">
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Submit Your First Paper
              </button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableCaption className='text-xs'>A list of your recent papers submitted for review.</TableCaption>
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead>Date Submitted</TableHead>
                <TableHead>Name of Paper</TableHead>
                <TableHead>Review Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>{formatDate(paper.submissionDate)}</TableCell>
                  <TableCell>
                    <Link href={`/journals/articles/${paper.id}`} className="text-primary hover:underline">
                      {paper.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block px-3 py-1 rounded-full text-[8px] ${getStatusStyles(paper.status)}`}>
                      {paper.status}
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
