"use client";
import Image from "next/image";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { MapIcon } from "lucide-react";
import { Typewriter } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  heading: "text-xl sm:text-2xl font-bold text-primary mb-4",
  paragraph: "text-sm sm:text-base text-gray-500 leading-7",
  image: "rounded-lg w-full max-h-64 object-cover",
  hr: "border-t border-gray-300 my-8",
  icon: "inline-block mr-2 h-4 w-4",
  gridContainer: "grid lg:grid-cols-2 gap-8 items-center",
};

type GrandChildren = {
  text: string;
  bold?: boolean;
};

type Children = {
  type: string;
  text?: string;
  bold?: boolean;
  children?: GrandChildren[];
};

type Description = {
  type: string;
  format?: string;
  children: Children[];
};

interface ImageData {
  id: number;
    name: string;
    alternativeText: string;
    width: number;
    height: number;
    url: string;
}

interface Abouts {
  id: number;
  title: string;
  description: Description[];
  image: ImageData;
}

const AboutThisJournal = () => {
  const [abouts, setAbouts] = useState<Abouts[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/abouts?populate=*`
        );
        const aboutUs = response.data.data.map((data: any) => ({
          id: data.id,
          title: data.attributes.title,
          description: data.attributes.description,
          image: {
            url: data.attributes.image.data.attributes.url,
            alternativeText: data.attributes.image.data.attributes.alternativeText,
            width: data.attributes.image.data.attributes.width,
            height: data.attributes.image.data.attributes.height,
          },
        }));
        setAbouts(aboutUs);
      } catch (error) {
        console.log("Error fetching about:", error);
      }
    };
    fetchAbouts();
  }, []);

  const renderContent = (description: Description[]) => {
    return description.map((desc, index) => {
      switch (desc.type) {
        case "paragraph":
          return (
            <span key={index} className={styles.paragraph}>
              {desc.children.map((child, i) => (
                <span key={i} className={child.bold ? "font-bold" : ""}>
                  {child.text}
                </span>
              ))}
            </span>
          );
        case "list":
          return (
            <ul key={index} className={`list-disc pl-5 ${styles.paragraph}`}>
              {desc.children.map((child, i) => (
                <li key={i} className="mt-1">
                  {child.children?.map((grandChild, j) => (
                    <span key={j} className={grandChild.bold ? "font-bold" : ""}>
                      {grandChild.text}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

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
            discussion on innovative approaches. Established in 2024, our
            journal is committed to maintaining the highest standards of
            scientific integrity and scholarly excellence.
          </p>
        </div>

        <hr className={styles.hr} />

        <div className="container mx-auto space-y-8">
          {abouts.map((about) => (
            <>
              <div key={about.id} className={styles.gridContainer}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI}${about.image.url}`}
                  alt={about.image.alternativeText}
                  className={`${styles.image} order-2 lg:order-1`}
                  width={about.image.width}
                  height={about.image.height}
                />

                <div className={about.id === 2 || about.id === 4 ? "" : "order-1 lg:order-2"}>
                  <h2 className={styles.heading}>{about.title}</h2>

                  {renderContent(about.description)}
                </div>
              </div>
              <hr className={styles.hr} />
            </>
          ))}

          {/* Example of hardcoded data (like Contact info) */}
          {/* <div className={styles.gridContainer}>
            <Image
              src="/path/to/contact-image.jpg"
              alt="Contact"
              width={"300"}
              height={"200"}
              className={`${styles.image} order-2 lg:order-1`}
            />
            <div className="order-1 lg:order-2">
              <h2 className={styles.heading}>Contact</h2>
              <p className={styles.paragraph}>
                For editorial and submission inquiries, please contact us at:
                <br />
                <EnvelopeClosedIcon className={styles.icon} />{" "}
                contact@gregorymedicaljournal.org
                <br />
                <MapIcon className={styles.icon} /> Gregory Medical Journal
                Editorial Office Amaoke Achara, Uturu, Abia State, Nigeria
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutThisJournal;
