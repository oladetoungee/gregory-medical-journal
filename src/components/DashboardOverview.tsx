"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Typewriter } from "@/components";
import { LibraryIcon, ChartBarIcon, UserIcon, Loader2 } from 'lucide-react';
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
import { fetchArticles } from "@/constants/fetchArticles";

// Define the expected shape of the user prop
interface User {
  ok: boolean;
  data: {
    username: string;
    email: string;
  } | null; // Allow data to be null
}

type Paper = {
  id: string;
  submissionDate: string;
  title: string;
  status: string;
  submittedByEmail: string;
};

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
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function DashboardOverview({ user }: { user: User }) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching user papers on component load
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await fetchArticles({ pageSize: 1000 });
        const userArticles = articles.filter(
          (article: Paper) => article.submittedByEmail === user?.data?.email
        );
        setPapers(userArticles);
      } catch (error) {
        console.error('Error fetching user papers:', error);
        toast.error('Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [user?.data?.email]);

  const sendTestEmail = async () => {
    try {
      const response = await fetch('/api/signupEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'demilad1998@gmail.com',
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Email sent successfully!');
      } else {
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
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

      {/* Papers Table */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Latest Papers</h2>

        <button onClick={sendTestEmail}>Send Test Email</button>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
          </div>
        ) : papers.length === 0 ? (
          <p className="text-gray-500">No papers available.</p>
        ) : (
          <Table>
            <TableCaption className='text-xs'>A list of recent papers submitted for review.</TableCaption>
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead>Date Submitted</TableHead>
                <TableHead>Name of Paper</TableHead>
                <TableHead>Review Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(paper.submissionDate)}</TableCell>
                  <TableCell>{paper.title}</TableCell>
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
