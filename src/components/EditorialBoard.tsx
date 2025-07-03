"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Typewriter } from "@/components/";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { editorialBoard } from "@/constants";
import { motion } from "framer-motion";
import { memberService } from "@/lib/firebase/member-service";
import { Member } from "@/lib/firebase/types";

interface EditorialBoardProps {
  showMembers?: boolean;
}

const EditorialBoard: React.FC<EditorialBoardProps> = ({ showMembers = true }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("Fetching members...");
        const fetchedMembers = await memberService.getMembers();
        console.log("Fetched members:", fetchedMembers);
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
          Editorial Board
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b pb-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-3 w-3/4 rounded mb-1"></div>
                  <div className="bg-gray-200 h-2 w-1/2 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
          Editorial Board
        </h2>
        <p className="text-center text-gray-500 text-sm">No editorial board members available.</p>
      </div>
    );
  }

  // If showMembers is false, show a compact version
  if (!showMembers) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
          Editorial Board
        </h2>
        <div className="space-y-4">
          {members.slice(0, 4).map((member) => (
            <div key={member.id} className="border-b pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm font-semibold">
                      {member.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-600">{member.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/about/editorial-board">
            <Button icon={<ArrowRightIcon />} className="text-sm">
              View All Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If showMembers is true, show the full page layout
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto">
        <Typewriter
          className="page-header h-12"
          text="Editorial Board"
        ></Typewriter>

        <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-5 my-6">
          {editorialBoard.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <motion.div
              key={member.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-2xl font-semibold">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">{member.title}</p>
                  {member.bio && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;