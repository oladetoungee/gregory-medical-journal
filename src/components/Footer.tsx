'use client';

import React from 'react';
import Image from 'next/image';
import {
    TwitterLogoIcon,
    FrameIcon,
    EnvelopeClosedIcon,
    LinkedInLogoIcon,
    QuestionMarkCircledIcon
} from '@radix-ui/react-icons';
import {
    Lock,
    ScrollText,
    MapIcon,
    PhoneCallIcon
} from 'lucide-react';
import images from '../constants/images';

const socialLinks = [
    { href: 'https://twitter.com', icon: <TwitterLogoIcon className="w-4 h-4" />, label: 'Twitter' },
    { href: 'https://facebook.com', icon: <FrameIcon className="w-4 h-4" />, label: 'Facebook' },
    { href: 'https://linkedin.com', icon: <LinkedInLogoIcon className="w-4 h-4" />, label: 'LinkedIn' },
];

const contactDetails = [
    { icon: <EnvelopeClosedIcon className="w-4 h-4" />, text: 'info@gregorymedicaljournal.com', link: 'mailto:info@gregorymedicaljournal.com' },
    { icon: <PhoneCallIcon className="w-4 h-4" />, text: '+234 123 456 7890', link: 'tel:+2341234567890' },
    { icon: <MapIcon className="w-4 h-4" />, text: 'Amaoke Achara, Uturu, Abia State, Nigeria', link: null },
];

const helpLinks = [
    { icon: <QuestionMarkCircledIcon className="w-4 h-4" />, text: 'FAQ', href: '/faq' },
    { icon: <Lock className="w-4 h-4" />, text: 'Privacy Policy', href: '/privacy-policy' },
    { icon: <ScrollText className="w-4 h-4" />, text: 'Terms of Use', href: '/terms-of-service' },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-gray-400 text-sm py-6 px-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap md:flex-nowrap justify-between space-y-8 md:space-y-0 md:space-x-12">
                    <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={images.hall1}
                                alt="Gregory Medical Journal Logo"
                                className="h-8 w-8"
                                width={64}
                                height={64}
                            />
                            <h3 className="text-lg font-semibold text-white">Gregory Medical Journal</h3>
                        </div>
                        <p className="mb-4">
                            Gregory Medical Journal provides cutting-edge research and analysis in the field of medicine. 
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ href, icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-2">
                            {contactDetails.map(({ icon, text, link }, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    {icon}
                                    {link ? (
                                        <a href={link} className="hover:text-gray-100 transition-colors">
                                            {text}
                                        </a>
                                    ) : (
                                        <address className="not-italic">{text}</address>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <h3 className="text-lg font-semibold mb-4 text-white">Help</h3>
                        <ul className="space-y-2">
                            {helpLinks.map(({ icon, text, href }) => (
                                <li key={text} className="flex items-center space-x-2">
                                    {icon}
                                    <a href={href} className="hover:text-gray-100 transition-colors">{text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white pt-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Gregory Medical Journal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
