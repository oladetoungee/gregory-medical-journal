'use client';

import { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useAuth } from '@/contexts/AuthContext';
import { analyticsService } from '@/lib/firebase/analytics-service';
import { Typewriter } from "@/components";
import { Loader2 } from 'lucide-react';

// Register chart elements for react-chartjs-2
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// Status colors as background
const statusColors: { [key: string]: string } = {
  'under-review': '#FEF3C7', // Yellow faded
  'rejected': '#FECACA', // Red faded
  'accepted': '#D1FAE5', // Green faded
  'approved': '#a88932', // Blue faded
  'published': '#a88932', // Green faded
};

export default function Analytics() {
  const { user } = useAuth();
  const [statusData, setStatusData] = useState<any>(null);
  const [submissionTrends, setSubmissionTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get article statistics
        const stats = await analyticsService.getArticleStats();
        const trends = await analyticsService.getSubmissionTrends();

        // Prepare data for review status distribution pie chart
        const statusLabels = ['under-review', 'accepted', 'rejected', 'published'];
        const statusValues = [
          stats.underReview,
          stats.accepted,
          stats.rejected,
          stats.published
        ];

        setStatusData({
          labels: statusLabels,
          datasets: [
            {
              label: 'Review Status Distribution',
              data: statusValues,
              backgroundColor: statusLabels.map(label => statusColors[label] || '#a88932'),
              borderColor: statusLabels.map(label => statusColors[label] || '#E5E7EB'),
              borderWidth: 1,
            },
          ],
        });

        // Prepare data for submission trends line chart
        if (trends.length > 0) {
          const submissionDates = trends.map(item => item.date);
          const cumulativeSubmissions = trends.map((_, idx) => idx + 1);

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
        } else {
          // Fallback data if no trends available
          setSubmissionTrends({
            labels: ['No data available'],
            datasets: [
              {
                label: 'Cumulative Submissions Over Time',
                data: [0],
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
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to demo data if Firebase fails
        setStatusData({
          labels: ['No data'],
          datasets: [
            {
              label: 'Review Status Distribution',
              data: [1],
              backgroundColor: ['#E5E7EB'],
              borderColor: ['#E5E7EB'],
              borderWidth: 1,
            },
          ],
        });
        setSubmissionTrends({
          labels: ['No data available'],
          datasets: [
            {
              label: 'Cumulative Submissions Over Time',
              data: [0],
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
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.email]);

  if (!user) {
    return (
      <div className="m-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view analytics</h2>
        </div>
      </div>
    );
  }

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
        <h2 className="text-base text-center font-semibold mb-4">Submission Trends Over Time</h2>
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
