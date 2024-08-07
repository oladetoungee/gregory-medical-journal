'use client';

import React from 'react';
import Image from 'next/image';
import { TwitterLogoIcon, FrameIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'; // Assuming Radix Icons are installed
import images from '../constants/images'; // Assuming you have a logo image in your constants

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {/* Logo and Description */}
          <div className=" mb-8 md:mb-0 w-[30%]">
            <Image
              src={images.hall1} // Assuming you have a logo image
              alt="Gregory Medical Journal Logo"
              className="h-16 w-auto"
              width={64}
              height={64}
            />
            <p className="mt-4 text-gray-400">
              Gregory Medical Journal provides cutting-edge research and analysis in the field of medicine. Our mission is to advance medical knowledge and improve healthcare practices through high-quality research.
            </p>
             {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <TwitterLogoIcon className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FrameIcon className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInLogoIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:info@gregorymedicaljournal.com" className="hover:text-white transition-colors">
                  info@gregorymedicaljournal.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <address className="not-italic">
                  123 Medical Lane,<br />
                  Suite 456,<br />
                  Health City, HC 78901,<br />
                  Country
                </address>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/journals" className="hover:text-white transition-colors">Journals</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/submit" className="hover:text-white transition-colors">Submit Manuscript</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Gregory Medical Journal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
