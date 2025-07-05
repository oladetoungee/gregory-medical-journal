"use client";
import Image from "next/image";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { MapIcon } from "lucide-react";
import { Typewriter } from "@/components";
import { aboutThisJournal } from "@/constants";
import images from "@/constants/images";

const styles = {
  heading: "text-xl sm:text-2xl font-bold text-primary mb-4",
  paragraph: "text-sm sm:text-base text-gray-500 leading-7",
  image: "rounded-lg w-full max-h-64 object-cover",
  hr: "border-t border-gray-300 my-8",
  icon: "inline-block mr-2 h-4 w-4",
  gridContainer: "grid lg:grid-cols-2 gap-8 items-center",
};

const AboutThisJournal = () => {

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <div className="space-y-4">
          <Typewriter
            className="page-header"
            text={"About Gregory Medical Journal"}
          ></Typewriter>

          <p className={styles.paragraph}>
            Gregory Medical Journal is a peer-reviewed journal dedicated to
            publishing high-quality research across various fields of medicine.
            Our aim is to advance medical knowledge and practice by
            disseminating significant scientific findings and promoting
            discussion on innovative approaches. Established in 2025, our
            journal is committed to maintaining the highest standards of
            scientific integrity and scholarly excellence.
          </p>
        </div>

        <hr className={styles.hr} />

        <div className="container mx-auto space-y-8">
          {/* Mission Section */}
          <div className={styles.gridContainer}>
            <Image
              src={images.mission}
              alt="Our Mission"
              className={`${styles.image} order-2 lg:order-1`}
              width={300}
              height={200}
            />
            <div className="order-1 lg:order-2">
              <h2 className={styles.heading}>Our Mission</h2>
              <p className={styles.paragraph}>{aboutThisJournal.mission}</p>
            </div>
          </div>
          <hr className={styles.hr} />

          {/* Vision Section */}
          <div className={styles.gridContainer}>
            <div className="order-1 lg:order-2">
              <Image
                src={images.vision}
                alt="Our Vision"
                className={`${styles.image} order-2 lg:order-1`}
                width={300}
                height={200}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={styles.heading}>Our Vision</h2>
              <p className={styles.paragraph}>{aboutThisJournal.vision}</p>
            </div>
          </div>
          <hr className={styles.hr} />

          {/* Scope Section */}
          <div className={styles.gridContainer}>
            <Image
              src={images.scope}
              alt="Our Scope"
              className={`${styles.image} order-2 lg:order-1`}
              width={300}
              height={200}
            />
            <div className="order-1 lg:order-2">
              <h2 className={styles.heading}>Our Scope</h2>
              <ul className={`list-disc pl-5 ${styles.paragraph}`}>
                {aboutThisJournal.scopeList.map((item, index) => (
                  <li key={index} className="mt-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr className={styles.hr} />

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className={styles.heading}>Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <EnvelopeClosedIcon className={styles.icon} />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className={styles.paragraph}>{aboutThisJournal.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapIcon className={styles.icon} />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className={styles.paragraph}>{aboutThisJournal.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThisJournal;
