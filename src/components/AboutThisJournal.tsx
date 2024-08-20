'use client';
import Image from 'next/image';
import aboutThisJournal from '@/constants/aboutThisJournal';
import images from '@/constants/images';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { MapIcon } from 'lucide-react';

const AboutThisJournal = () => {
    return (
        <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
                        {aboutThisJournal.title}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 leading-7">
                        {aboutThisJournal.description}
                    </p>
                </div>

                <hr className="border-t border-gray-300 my-8"/>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Mission</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-7">
                            {aboutThisJournal.mission}
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={images.research2}
                            alt="Our Mission"
                            className="rounded-lg w-full max-h-64 object-cover"
                        />
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-8"/>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Vision</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-7">
                            {aboutThisJournal.vision}
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={images.research3}
                            alt="Our Vision"
                            className="rounded-lg w-full max-h-64 object-cover"
                        />
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-8"/>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Research Scope</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-7">
                            {aboutThisJournal.scopeHeading}
                        </p>
                        <ul className="list-disc pl-5 text-base sm:text-lg text-gray-700 leading-7">
                            {aboutThisJournal.scopeList.map((item, index) => (
                                <li key={index} className="mt-1">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={images.research4}
                            alt="Scope"
                            className="rounded-lg w-full max-h-64 object-cover"
                        />
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-8"/>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Publication Identifiers</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-7">
                            <strong>e-ISSN:</strong> {aboutThisJournal.identifiers.eISSN}<br/>
                            <strong>p-ISSN:</strong> {aboutThisJournal.identifiers.pISSN}<br/>
                            <strong>DOI Prefix:</strong> {aboutThisJournal.identifiers.doiPrefix}<br/>
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={images.research5}
                            alt="Publication Identifiers"
                            className="rounded-lg w-full max-h-64 object-cover"
                        />
                    </div>
                </div>

                <hr className="border-t border-gray-300 my-8"/>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Contact</h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-7">
                            For editorial and submission inquiries, please contact us at: <br/>
                            <EnvelopeClosedIcon className="inline-block mr-2" /> {aboutThisJournal.contact.email}<br/>
                            <MapIcon className="inline-block mr-2" /> {aboutThisJournal.contact.address}
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={images.editor}
                            alt="Contact"
                            className="rounded-lg w-full max-h-64 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutThisJournal;
