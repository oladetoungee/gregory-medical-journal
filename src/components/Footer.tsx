'use client';

import React from 'react';
import Image from 'next/image';
import { TwitterLogoIcon, FrameIcon, EnvelopeClosedIcon, LinkedInLogoIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
    Lock,
    ScrollText,
    MapIcon,
    PhoneCallIcon,


} from 'lucide-react';
import images from '../constants/images';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-gray-400 text-sm py-6 px-4">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className=" mb-8 md:mb-0 w-[40%]">
                        <div className='flex gap-4'>
                            <Image
                                src={images.hall1}
                                alt="Gregory Medical Journal Logo"
                                className="h-8 w-8"
                                width={64}
                                height={64}
                            />
                            <h3 className="text-lg font-semibold mb-4 text-white">Gregory Medical Journal</h3>
                        </div>
                        <p className="mt-4  mb-4">
                            Gregory Medical Journal provides cutting-edge research and analysis in the field of medicine. Our mission is to advance medical knowledge and improve healthcare practices through high-quality research.
                        </p>
                        <div>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <TwitterLogoIcon className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <FrameIcon className="w-4 h-4" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    <LinkedInLogoIcon className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-2 ">
                            <li className="flex items-center space-x-2">
                                <EnvelopeClosedIcon className="w-4 h-4" />
                                <a href="mailto:info@gregorymedicaljournal.com" className="hover:text-gray-100 transition-colors">
                                    info@gregorymedicaljournal.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <PhoneCallIcon className="w-4 h-4" />
                                <a href="tel:+2341234567890" className="hover:text-white transition-colors">
                                    +234 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapIcon className="w-4 h-4" />
                                <address className="not-italic">
                                    Amaoke Achara<br />
                                    Uturu, Abia State<br />
                                    Nigeria
                                </address>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4 text-white">Help</h3>
                        <ul className="space-y-2 ">
                            <li className='flex gap-2'>
                                <QuestionMarkCircledIcon className="w-4 h-4" />
                                <a href="/faq" className="hover:text-gray-100 transition-colors">FAQ</a>
                            </li>
                            <li className='flex gap-2'>
                                <Lock className="w-4 h-4" />
                                <a href="/privacy-policy" className="hover:text-gray-100 transition-colors">Privacy Policy</a>
                            </li>
                            <li className='flex gap-2'>
                                <ScrollText className="w-4 h-4" />
                                <a href="/terms-of-service" className="hover:text-gray-100 transition-colors">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white pt-4 text-center ">
                    <p>&copy; {new Date().getFullYear()} Gregory Medical Journal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
{/* <footer className="bg-primary text-white py-8 px-6">
<div className=" mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between">


    <div className="flex-1">
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={images.hall1} // Assuming you have a logo image
          alt="Gregory Medical Journal Logo"
          className="h-10 w-10"
          width={40}
          height={40}
        />
        <h3 className="text-lg font-semibold">Gregory Medical Journal</h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        Gregory Medical Journal provides cutting-edge research and analysis in the field of medicine. Our mission is to advance medical knowledge and improve healthcare practices through high-quality research.
      </p>
      <div className="flex space-x-4 mt-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
          <TwitterLogoIcon className="w-4 h-4" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
          <FrameIcon className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
          <LinkedInLogoIcon className="w-4 h-4" />
        </a>
      </div>
    </div>


    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li className="flex items-center space-x-2">
          <EnvelopeClosedIcon className="w-4 h-4" />
          <a href="mailto:info@gregorymedicaljournal.com" className="hover:text-gray-100 transition-colors">
            info@gregorymedicaljournal.com
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <PhoneCallIcon className="w-4 h-4" />
          <a href="tel:+2341234567890" className="hover:text-white transition-colors">
            +234 123 456 7890
          </a>
        </li>
        <li className="flex items-start space-x-2">
          <MapIcon className="w-4 h-4" />
          <address className="not-italic">
            Amaoke Achara<br />
            Uturu, Abia State<br />
            Nigeria
          </address>
        </li>
      </ul>
    </div>


    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-4">Help</h3>
      <ul className="space-y-2 text-gray-300 text-sm">
        <li className='flex gap-2'>
        <QuestionMarkCircledIcon className="w-4 h-4" />
     
          <a href="/faq" className="hover:text-gray-100 transition-colors">FAQ</a>
        </li>
        <li className='flex gap-2'>
        <Lock className="w-4 h-4" />
          <a href="/privacy-policy" className="hover:text-gray-100 transition-colors">Privacy Policy</a>
        </li>
        <li className='flex gap-2'>
        <ScrollText className="w-4 h-4" />
          <a href="/terms-of-service" className="hover:text-gray-100 transition-colors">Terms of Use</a>
        </li>
      </ul>
    </div>

  </div>

  <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
    <p>&copy; {new Date().getFullYear()} Gregory Medical Journal. All rights reserved.</p>
  </div>
</div>
</footer> */}