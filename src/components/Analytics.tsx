'use client';

import { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import {papersData} from '@/constants';
import { Typewriter } from "@/components";

// Register chart elements for react-chartjs-2
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

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
  
    useEffect(() => {
      // Prepare data for review status distribution pie chart
      const statusCount = papersData.reduce(
        (acc: { [key: string]: number }, paper) => {
          acc[paper.reviewStatus] = (acc[paper.reviewStatus] || 0) + 1;
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
            backgroundColor: statusLabels.map(label => statusColors[label] || '#E5E7EB'), // Use dynamic keys safely
            borderColor: statusLabels.map(label => statusColors[label] || '#E5E7EB'),
            borderWidth: 1,
          },
        ],
      });
  
      // Prepare data for submission trends line chart
      const sortedData = papersData.sort((a, b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime());
  
      const submissionDates = sortedData.map(paper => paper.dateSubmitted);
      const cumulativeSubmissions = sortedData.map((_, idx) => idx + 1);
  
      setSubmissionTrends({
        labels: submissionDates,
        datasets: [
          {
            label: 'Cumulative Submissions Over Time',
            data: cumulativeSubmissions,
            fill: false,
            backgroundColor: '#373A7A', // Light blue
            borderColor: '#373A7A', // Blue
          },
        ],
      });
    }, []);
  
    return (
        <div className="m-12">
        <div className="mb-8">
    <Typewriter text="Track and Review Your Papers Analytics" className="page-header text-2xl font-bold mb-6" />
    </div>
  
        {/* Pie Chart for Review Status Distribution */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Review Status Distribution</h2>
          {statusData ? (
      <div className='md:w-[60%] mx-auto sm:w-full'>
              <Pie data={statusData} />
     </div>
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
  
        {/* Line Chart for Paper Submission Trends */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Submission Trends Over Time</h2>
          {submissionTrends ? (
             <div className='md:w-[60%] mx-auto sm:w-full'>
              <Line data={submissionTrends} />
              </div>
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    );
  }
  
