'use client';
import Image from 'next/image';
import aboutThisJournal from '@/constants/aboutThisJournal';
import images from '@/constants/images';
import {
    EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import {
    MapIcon,
} from 'lucide-react';

// Common style classes
const styles = {
    heading1: 'text-3xl sm:text-4xl font-bold text-center text-primary mb-4',
    heading: 'text-2xl sm:text-3xl font-bold text-primary mb-4',
    paragraph: 'text-sm sm:text-base text-gray-500 leading-7',
    image: 'rounded-lg w-full max-h-64 object-cover',
    hr: 'border-t border-gray-300 my-8',
    icon: 'inline-block mr-2 h-4 w-4',
    gridContainer: 'grid lg:grid-cols-2 gap-8 items-center',
};

const AboutThisJournal = () => {
    return (
        <div className='py-12 px-6 sm:px-12 lg:px-12 bg-white'>
            <div className='container mx-auto space-y-8'>
                <div className="space-y-4">
                    <h1 className={styles.heading1}>
                        {aboutThisJournal.title}
                    </h1>
                    <p className={styles.paragraph}>
                        {aboutThisJournal.description}
                    </p>
                </div>

                <hr className={styles.hr} />

                <div className={styles.gridContainer}>
                    <Image
                        src={images.mission}
                        alt="Our Mission"
                        className={`${styles.image} order-2 lg:order-1`}
                    />
                    <div className="order-1 lg:order-2">
                        <h2 className={styles.heading}>Our Mission</h2>
                        <p className={styles.paragraph}>
                            {aboutThisJournal.mission}
                        </p>
                    </div>
                </div>

                <hr className={styles.hr} />

                <div className={styles.gridContainer}>
                    <div>
                        <h2 className={styles.heading}>Our Vision</h2>
                        <p className={styles.paragraph}>
                            {aboutThisJournal.vision}
                        </p>
                    </div>
                    <Image
                        src={images.vision}
                        alt="Our Vision"
                        className={styles.image}
                    />
                </div>

                <hr className={styles.hr} />

                <div className={styles.gridContainer}>
                    <Image
                        src={images.scope}
                        alt="Scope"
                        className={`${styles.image} order-2 lg:order-1`}
                    />
                    <div className="order-1 lg:order-2">
                        <h2 className={styles.heading}>Our Research Scope</h2>
                  
                        <ul className={`list-disc pl-5 ${styles.paragraph}`}>
                            {aboutThisJournal.scopeList.map((item, index) => (
                                <li key={index} className="mt-1">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className={styles.hr} />

                <div className={styles.gridContainer}>
                    <div>
                        <h2 className={styles.heading}>Publication Identifiers</h2>
                        <p className={styles.paragraph}>
                            <strong>e-ISSN:</strong> {aboutThisJournal.identifiers.eISSN}<br />
                            <strong>p-ISSN:</strong> {aboutThisJournal.identifiers.pISSN}<br />
                            <strong>DOI Prefix:</strong> {aboutThisJournal.identifiers.doiPrefix}<br />
                        </p>
                    </div>
                    <Image
                        src={images.identifier}
                        alt="Publication Identifiers"
                        className={styles.image}
                    />
                </div>

                <hr className={styles.hr} />

                <div className={styles.gridContainer}>
                    <Image
                        src={images.contact}
                        alt="Contact"
                        className={`${styles.image} order-2 lg:order-1`}
                    />
                    <div className="order-1 lg:order-2">
                        <h2 className={styles.heading}>Contact</h2>
                        <p className={styles.paragraph}>
                            For editorial and submission inquiries, please contact us at: <br />
                            <EnvelopeClosedIcon className={styles.icon} /> {aboutThisJournal.contact.email}<br />
                            <MapIcon className={styles.icon} /> {aboutThisJournal.contact.address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutThisJournal;
