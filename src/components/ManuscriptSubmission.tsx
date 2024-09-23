"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui";
import { Button, Typewriter } from "@/components";
import { motion } from "framer-motion";
import { UploadIcon, FileIcon, InfoIcon, X } from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  abstract: string;
  coverImage: FileList;
  manuscriptFile: FileList;
}

export default function ManuscriptSubmission() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorInput, setAuthorInput] = useState("");

  // Form submission handler
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log({
      ...data,
      authors,
      manuscriptFile: data.manuscriptFile[0],
      coverImage: data.coverImage[0],
    });
    reset();
    setAuthors([]);
    setOpen(false);
  };

  // Add author on Enter key press
  const handleAuthorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && authorInput.trim()) {
      e.preventDefault();
      if (!authors.includes(authorInput)) {
        setAuthors((prev) => [...prev, authorInput]);
        setAuthorInput("");
      }
    }
  };

  // Remove author
  const handleRemoveAuthor = (author: string) => {
    setAuthors((prev) => prev.filter((a) => a !== author));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Typewriter text="Submit Your Manuscript, Get Your Research Published" className="page-header text-2xl font-bold mb-6" />

      <p className="text-primary text-sm mt-1 text-center">
        Join the community of researchers sharing groundbreaking work.
      </p>

      <div className="text-left my-6">
        <hr className="border-t border-gray-300 my-8" />
        <h2 className="text-2xl font-semibold mb-4">Submission Instructions</h2>
        <p className="text-primary text-sm mb-4">
          Ensure your manuscript complies with our guidelines. Review the 
          <a href="/manuscript-guidelines" target="_blank" className="text-bold underline ml-1">manuscript guidelines</a> page.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <InfoIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">Ensure your manuscript is in PDF format and does not exceed 10 MB.</p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <FileIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">All figures must be in high-resolution formats (JPEG/PNG).</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Submit Your Manuscript</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Submit Your Manuscript</DialogTitle>    
          <DialogDescription>
            Fill out the details and attach your manuscript for submission.
          </DialogDescription>
          <hr className="border-t border-gray-300 my-2" />

          <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="Enter manuscript title" {...register("title", { required: true })} />
              </div>

              <div className="space-y-2">
                <label htmlFor="abstract" className="text-sm font-medium">Abstract</label>
                <Textarea
                  id="abstract"
                  placeholder="Write a short abstract..."
                  {...register("abstract", { required: true })}
           
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Authors</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    onKeyDown={handleAuthorKeyPress}
                    placeholder="Enter author name and press Enter"
                    className="flex-grow"
                  />
                
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
  {authors.map((author, index) => (
    <div key={index} className="flex items-center bg-white p-2 rounded-md shadow-md">
      <span className="text-sm mr-2">{author}</span>
    
        <X className="w-4 h-4 text-red-500"  onClick={() => handleRemoveAuthor(author)} />
   
    </div>
  ))}
</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium mb-4">Cover Image</label>
                <div className="flex items-center gap-4 mt-1">
                  <UploadIcon className="w-6 h-6" />
                  <Input id="coverImage" type="file" accept="image/*" {...register("coverImage", { required: true })} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Manuscript (PDF)</label>
                <Input id="manuscriptFile" type="file" accept=".pdf" {...register("manuscriptFile", { required: true })} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>

      <div className="mt-10">
        <hr className="border-t border-gray-300 my-8" />
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className="text-primary text-sm">
          If you need assistance with your manuscript, reach out to our editorial team for guidance.
        </p>
        <Button className="mt-4">
          <Link href="/contact">Contact Editorial Team</Link>
        </Button>
      </div>
    </div>
  );
}
