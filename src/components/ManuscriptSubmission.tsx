"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button, Typewriter } from "@/components";
import { motion } from "framer-motion";
import { UploadIcon, FileIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

export default function ManuscriptSubmission() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authors: [],
    coverImage: null,
    manuscript: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files?.[0] || null,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data: ", formData);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Typewriter
        text="Submit Your Manuscript, Get Your Research Published"
        className="page-header text-2xl font-bold mb-6"
      />
      <p className="text-primary text-sm mt-1 text-center">
        Join the community of researchers sharing groundbreaking work.
      </p>

      <div className="text-left my-6">
        <hr className="border-t border-gray-300 my-8" />
        <h2 className="text-2xl font-semibold mb-4">Submission Instructions</h2>
        <p className="text-primary text-sm mb-4">
          Before you submit your manuscript, please ensure it complies with our guidelines. You can review the submission rules and formatting requirements on the 
          <a href="/manuscript-guidelines" target="_blank" className="text-bold underline ml-1">manuscript guidelines</a> page.
        </p>
        <ul className="list-disc list-inside pl-4 text-primary text-sm mb-4">
          <li>Title and abstract</li>
          <li>Complete author details</li>
          <li>Correctly formatted citations</li>
          <li>Any supplementary materials like figures or tables</li>
        </ul>
        <div className="flex items-center gap-2 mb-4">
          <InfoIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">Ensure your manuscript is in PDF format and does not exceed 10 MB.</p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <FileIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">All figures must be in high-resolution image formats (JPEG/PNG).</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            Submit Your Manuscript
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Submit Your Manuscript</DialogTitle>
          <DialogDescription>
            Fill out the details and attach your manuscript for submission.
          </DialogDescription>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" name="title" placeholder="Enter manuscript title" onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="abstract" className="text-sm font-medium">Abstract</label>
                <textarea
                  id="abstract"
                  name="abstract"
                  placeholder="Write a short abstract..."
                  className="w-full rounded-md border p-2"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="authors" className="text-sm font-medium">Authors</label>
                <Input
                  id="authors"
                  name="authors"
                  placeholder="Enter authors (comma-separated)"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4 mt-1">
                  <UploadIcon className="w-6 h-6" />
                  <Input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Manuscript (PDF)</label>
                <Input
                  type="file"
                  name="manuscript"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
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
          If you're unsure about the submission process or need assistance with preparing your manuscript, feel free to reach out to our editorial team. We are here to guide you through every step.
        </p>
        <Button className="mt-4">
          <Link href="/contact">
            Contact Editorial Team
          </Link>
        </Button>
      </div>
    </div>
  );
}
