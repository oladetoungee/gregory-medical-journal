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
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorInput, setAuthorInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      title: (event.target as any).title.value,
      abstract,
      authors,
      manuscriptFile: (event.target as any).manuscriptFile.files[0],
      coverImage: (event.target as any).coverImage.files[0],
    });
  };

  const handleAbstractChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbstract(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto to handle shrinking
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height dynamically
  };

  const handleAddAuthor = () => {
    if (authorInput.trim() && !authors.includes(authorInput)) {
      setAuthors([...authors, authorInput]);
      setAuthorInput("");
    }
  };

  const handleRemoveAuthor = (author: string) => {
    setAuthors(authors.filter((a) => a !== author));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header with Typewriter Effect */}
      <Typewriter text="Submit Your Manuscript, Get Your Research Published" className="page-header text-2xl font-bold mb-6" />

      <p className="text-primary text-sm mt-1 text-center">
        Join the community of researchers sharing groundbreaking work.
      </p>

      {/* Instructions and Links */}
      <div className="text-left my-6">
        <hr className="border-t border-gray-300 my-8" />
        <h2 className="text-2xl font-semibold mb-4">Submission Instructions</h2>
        <p className="text-primary text-sm mb-4">
          Before you submit your manuscript, please ensure it complies with our guidelines. You can review the submission rules and formatting requirements on the
          <a href="/manuscript-guidelines" target="_blank" className="text-bold underline ml-1">manuscript guidelines</a> page.
        </p>
        <p className="text-primary text-sm mb-4">
          Ensure that your manuscript includes all necessary components, such as:
          <ul className="list-disc list-inside pl-4">
            <li>Title and abstract</li>
            <li>Complete author details</li>
            <li>Correctly formatted citations</li>
            <li>Any supplementary materials like figures or tables</li>
          </ul>
        </p>
        <div className="flex items-center gap-2 mb-4">
          <InfoIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">Ensure your manuscript is in PDF format and does not exceed 10 MB.</p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <FileIcon className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">All figures must be in high-resolution image formats (JPEG/PNG).</p>
        </div>
      </div>

      {/* Submit Button Trigger */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Submit Your Manuscript</Button>
        </DialogTrigger>

        {/* Dialog for Form Submission */}
        <DialogContent>
          <DialogTitle>Submit Your Manuscript</DialogTitle>
          <DialogDescription>
            Fill out the details and attach your manuscript for submission.
          </DialogDescription>

          {/* Submission Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="Enter manuscript title" required />
              </div>
              
              {/* Abstract Input (Expandable Textarea) */}
              <div>
                <label htmlFor="abstract" className="text-sm font-medium">Abstract</label>
                <textarea
                  id="abstract"
                  value={abstract}
                  onChange={handleAbstractChange}
                  placeholder="Write a short abstract..."
                  className="w-full rounded-md border p-2 resize-none"
                  required
                  style={{ minHeight: "100px", maxHeight: "500px" }}
                />
              </div>

              {/* Authors Input (Multi-input Field) */}
              <div>
                <label className="text-sm font-medium">Authors</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    placeholder="Enter author name and press enter"
                  />
                  <Button type="button" onClick={handleAddAuthor}>Add Author</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-md">
                      <span className="mr-2">{author}</span>
                      <Button   onClick={() => handleRemoveAuthor(author)}>Remove</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4 mt-1">
                  <UploadIcon className="w-6 h-6" />
                  <Input id="coverImage" type="file" accept="image/*" required />
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="text-sm font-medium">Manuscript (PDF)</label>
                <Input id="manuscriptFile" type="file" accept=".pdf" required />
              </div>
            </div>

            {/* Submit Button */}
            <DialogFooter className="mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Additional Resources Section */}
      <div className="mt-10">
        <hr className="border-t border-gray-300 my-8" />
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className="text-primary text-sm">
          If you're unsure about the submission process or need assistance with preparing your manuscript, feel free to reach out to our editorial team. We are here to guide you through every step.
        </p>
        <Button className="mt-4">
          <Link href="/contact">Contact Editorial Team</Link>
        </Button>
      </div>
    </div>
  );
}
