'use client'
import { aboutThisJournal } from '@/constants';

const AboutThisJournal= () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-6">{aboutThisJournal.title}</h1>
        <p className="text-base sm:text-lg text-gray-700 leading-7 mb-6">{aboutThisJournal.description}</p>
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">Our Mission</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-7">{aboutThisJournal.mission}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-8">Our Vision</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-7">{aboutThisJournal.vision}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutThisJournal;
