'use client';

import { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { fetchArticles } from '@/constants/fetchArticles';
import { Typewriter } from "@/components";
import { Loader2 } from 'lucide-react';

// Register chart elements for react-chartjs-2
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface Paper {
  id: string;
  submissionDate: string;
  status: string;
  title: string;
}

// Status colors as background
const statusColors: { [key: string]: string } = {
  'under review': '#FEF3C7', // Yellow faded
  'rejected': '#FECACA', // Red faded
  'accepted': '#D1FAE5', // Green faded
  'approved': '#DBEAFE', // Blue faded
};

export default function Analytics() {
  const [statusData, setStatusData] = useState<any>(null);
  const [submissionTrends, setSubmissionTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch articles with correct typing
        const { articles }: { articles: Paper[] } = await fetchArticles({ pageSize: 1000 });

        // Prepare data for review status distribution pie chart
        const statusCount = articles.reduce(
          (acc: { [key: string]: number }, paper: Paper) => {
            acc[paper.status] = (acc[paper.status] || 0) + 1;
            return acc;
          },
          {}
        );

        const statusLabels = Object.keys(statusCount);
        const statusValues = Object.values(statusCount);

        setStatusData({
          labels: statusLabels,
          datasets: [
            {
              label: 'Review Status Distribution',
              data: statusValues,
              backgroundColor: statusLabels.map(label => statusColors[label] || '#E5E7EB'),
              borderColor: statusLabels.map(label => statusColors[label] || '#E5E7EB'),
              borderWidth: 1,
            },
          ],
        });

        // Prepare data for submission trends line chart
        const sortedData = articles.sort(
          (a: Paper, b: Paper) => new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        );

        const submissionDates = sortedData.map((paper: Paper) =>
          new Date(paper.submissionDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        );
        const cumulativeSubmissions = sortedData.map((_, idx: number) => idx + 1);

        setSubmissionTrends({
          labels: submissionDates,
          datasets: [
            {
              label: 'Cumulative Submissions Over Time',
              data: cumulativeSubmissions,
              fill: false,
              backgroundColor: '#373A7A',
              borderColor: '#373A7A',
              borderWidth: 2,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#373A7A',
              pointHoverBackgroundColor: '#373A7A',
              pointHoverBorderColor: '#fff',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-12">
      <div className="mb-8">
        <Typewriter text="Track and Review Your Papers Analytics" className="page-header text-2xl font-bold mb-6" />
      </div>

      {/* Pie Chart for Review Status Distribution */}
      <div className="mb-12">
        <h2 className="text-base text-center font-semibold mb-4">Review Status Distribution</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
          </div>
        ) : (
          statusData && (
            <div className='md:w-[50%] mx-auto sm:w-full'>
            <Pie data={statusData} />
   </div>
          )
        )}
      </div>

      {/* Line Chart for Paper Submission Trends */}
      <div className="mb-12">
      <h2 className="text-base text-center  font-semibold mb-4">Submission Trends Over Time</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
          </div>
        ) : (
          submissionTrends && (
            <div className='md:w-[60%] mx-auto sm:w-full'>
            <Line data={submissionTrends} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
