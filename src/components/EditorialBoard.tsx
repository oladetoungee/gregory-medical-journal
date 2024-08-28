"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Typewriter } from "@/components/";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import axios from "axios";

interface EditorialBoardProps {
  showMembers: boolean;
}

interface ImageData {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      width: number;
      height: number;
      url: string;
    };
  };
}

interface Member {
  id: number;
  name: string;
  bio: string;
  role: string;
  image: ImageData | null;
}

type MemberImageProps = {
  name: string;
  imageSrc: string | null;
};

const MemberImage = ({ name, imageSrc }: MemberImageProps) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("");
    return initials;
  };

  return imageError ? (
    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-primary rounded-t-lg">
      <span className="text-2xl font-bold">{getInitials(name)}</span>
    </div>
  ) : (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageSrc}`}
      alt={name}
      layout="fill"
      objectFit="cover"
      className="w-full h-48 rounded-t-lg"
      onError={() => setImageError(true)}
    />
  );
};

const EditorialBoard = ({ showMembers }: EditorialBoardProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/members?populate=*`);
        console.log(response.data);
        const member = response.data.data.map((data: any) => ({
          id: data.id,
          name: data.attributes.name,
          bio: data.attributes.bio,
          role: data.attributes.role,
          image: data.attributes.image?.data?.attributes?.url || null,
        }))

      setMembers(member);
      setLoading(false);
      console.log("member:", member)
      } catch (error) {
        console.log('Error fetching members:', error);
        setLoading(false); 
      }
    }
      fetchMembers();
  }, []);
  
  if (loading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto">
        <Typewriter
          className="page-header h-12"
          text="Editorial Board"
        ></Typewriter>

        <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-5 mb-6">
          Our editorial board comprises esteemed professionals and academics with extensive expertise 
          in their respective fields. They play a crucial role in ensuring the quality and integrity of 
          the articles published in Gregory Medical Journal.
        </p>
        {showMembers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <MemberImage
                    name={member.name}
                    imageSrc={
                      member.image
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${member.image}`
                        : null
                    }
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-6">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!showMembers && (
          <Link href="/about/editorial-board">
            <Button icon={<ArrowRightIcon />}>Board Members</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EditorialBoard;