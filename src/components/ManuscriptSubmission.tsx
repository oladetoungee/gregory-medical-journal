"use client";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input, AutosizeTextarea } from "@/components/ui";
import { Button, Typewriter } from "@/components";
import { motion } from "framer-motion";
import { UploadIcon, FileIcon, InfoIcon, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from 'react-toastify';
import axios from 'axios';

interface Author {
  name: string;
  affiliation: string;
  email: string;
}

interface FormData extends FieldValues {
  title: string;
  abstract: string;
  coverImage: FileList;
  manuscriptFile: FileList;
}

export default function ManuscriptSubmission(user: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorInput, setAuthorInput] = useState({ name: "", affiliation: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    // Validate if media files are provided
    if (!data.coverImage || !data.coverImage[0]) {
      toast.error("Please upload a cover image.");
      return;
    }
    if (!data.manuscriptFile || !data.manuscriptFile[0]) {
      toast.error("Please upload the manuscript file.");
      return;
    }

    setIsSubmitting(true); // Show loader
    try {
      const formData = new FormData();
      formData.append("files", data.coverImage[0]);
      formData.append("files", data.manuscriptFile[0]);

      // Upload files to Strapi
      const fileUploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });

      const uploadedFiles = fileUploadResponse.data;
      const coverImageId = uploadedFiles.find((file: any) => file.name === data.coverImage[0].name)?.id;
      const manuscriptFileId = uploadedFiles.find((file: any) => file.name === data.manuscriptFile[0].name)?.id;

      const excerpt = data.abstract.split('\n').map((para: string) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: para }],
      }));

      const formattedAuthors = authors.map((author) => ({
        name: author.name,
        affiliation: author.affiliation,
        email: author.email,
      }));

      if (formattedAuthors.length === 0) {
        toast.error("Please add at least one author.");
        setIsSubmitting(false); // Hide loader
        return;
      }

      const articleData = {
        data: {
          title: data.title,
          excerpt: excerpt,
          editorPick: false,
          submissionDate: new Date().toISOString(),
          Authors: formattedAuthors,
          image: coverImageId,
          document: manuscriptFileId,
          submittedByName: user.user.username,
          submittedByEmail: user.user.email,
          status: 'under review',
        },
      };

      // Submit article to Strapi
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`, articleData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });

      // Send confirmation emails to both user and admin
      await axios.post('/api/paperEmails', {
        name: user.user.username,
        email: user.user.email,
        articleTitle: data.title,
        message: "Your manuscript has been successfully submitted and is under review.",
      });

      toast.success('Manuscript submitted successfully! Confirmation email sent.');
      reset();
      setAuthors([]);
      setOpen(false);
    } catch (error: any) {
      console.error('Error submitting manuscript:', error);
      toast.error('There was an error submitting your manuscript. Please try again.');
    } finally {
      setIsSubmitting(false); // Hide loader
    }
  };


  const addAuthor = () => {
    if (authorInput.name && authorInput.affiliation && authorInput.email) {
      setAuthors((prev) => [...prev, authorInput]);
      setAuthorInput({ name: "", affiliation: "", email: "" });
    } else {
      toast.error('Please fill out all author fields.');
    }
  };

  const handleRemoveAuthor = (index: number) => {
    setAuthors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="m-12">
      <div className="mb-8">
        <Typewriter text="Submit Your Manuscript, Get Your Research Published" className="page-header text-2xl font-bold mb-6" />
      </div>
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

        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogTitle>Submit Your Manuscript</DialogTitle>    
          <DialogDescription>
            Fill out the details and attach your manuscript for submission.
          </DialogDescription>
          <hr className="border-t border-gray-300 my-2" />

          <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="Enter manuscript title" {...register("title", { required: "Title is required" })} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="abstract" className="text-sm font-medium">Abstract</label>
                <AutosizeTextarea id="abstract" placeholder="Kindly input at least 2 paragraphs..." {...register("abstract", { required: "Abstract is required" })} />
                {errors.abstract && <p className="text-red-500">{errors.abstract.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Authors</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Input
                    type="text"
                    placeholder="Author's Name"
                    value={authorInput.name}
                    onChange={(e) => setAuthorInput({ ...authorInput, name: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Affiliation"
                    value={authorInput.affiliation}
                    onChange={(e) => setAuthorInput({ ...authorInput, affiliation: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={authorInput.email}
                    onChange={(e) => setAuthorInput({ ...authorInput, email: e.target.value })}
                  />
                  <Button onClick={addAuthor}>Add Author</Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center bg-white p-2 rounded-md shadow-md">
                      <span className="text-sm mr-2">{author.name} - {author.affiliation} ({author.email})</span>
                      <X className="w-4 h-4 text-red-500" onClick={() => handleRemoveAuthor(index)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium mb-4">Cover Image</label>
                <div className="flex items-center gap-4 mt-1">
                  <UploadIcon className="w-6 h-6" />
                  <Input id="coverImage" type="file" accept="image/*" {...register("coverImage")} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Manuscript (PDF)</label>
                <Input id="manuscriptFile" type="file" accept=".pdf" {...register("manuscriptFile")} />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
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
          <Link href="/dashboard/support">Contact Editorial Team</Link>
        </Button>
      </div>
    </div>
  );
}
