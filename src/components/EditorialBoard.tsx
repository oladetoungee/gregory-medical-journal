'use client';
import Image from 'next/image';
import { useState } from 'react';
import { editorialBoard } from '@/constants';
import Link from 'next/link';
import { Button } from '@/components/';
import {  ArrowRightIcon} from '@radix-ui/react-icons';

interface EditorialBoardProps {
  showMembers: boolean;
}

const EditorialBoard = ({ showMembers }: EditorialBoardProps) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-primary mb-6">
          {editorialBoard.title}
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-5 mb-6">
          {editorialBoard.description}
        </p>
        {showMembers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorialBoard.members.map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <MemberImage name={member.name} imageSrc={member.image} />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-2">
                    {member.title}
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
          <Link href='/about/editorial-board'>
        <Button
                                    icon={<ArrowRightIcon />}
                                >
              Board Members
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

type MemberImageProps = {
  name: string;
  imageSrc: string;
};

const MemberImage = ({ name, imageSrc }: MemberImageProps) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
    return initials;
  };

  return imageError ? (
    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-primary rounded-t-lg">
      <span className="text-4xl font-bold">{getInitials(name)}</span>
    </div>
  ) : (
    <Image
      src={imageSrc}
      alt={name}
      layout="fill"
      objectFit="cover"
      className="w-full h-48 rounded-t-lg"
      onError={() => setImageError(true)}
    />
  );
};

export default EditorialBoard;
