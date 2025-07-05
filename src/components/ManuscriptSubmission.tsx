"use client";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input, AutosizeTextarea } from "@/components/ui";
import { Button, Typewriter } from "@/components";
import { motion } from "framer-motion";
import { FileIcon, InfoIcon, X, Loader2 } from "lucide-react";
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { articleService } from '@/lib/firebase/article-service';
import { fileService } from '@/lib/firebase/file-service';

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

export default function ManuscriptSubmission() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorInput, setAuthorInput] = useState({ name: "", affiliation: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    if (!user) {
      toast.error("Please sign in to submit a manuscript.");
      return;
    }

    // Validate if media files are provided
    if (!data.coverImage || !data.coverImage[0]) {
      toast.error("Please upload a cover image.");
      return;
    }
    if (!data.manuscriptFile || !data.manuscriptFile[0]) {
      toast.error("Please upload the manuscript file.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate the paper ID first
      const paperId = `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Upload files to Firebase Storage using the actual paper ID
      const { coverImageURL, manuscriptURL } = await fileService.uploadArticleFiles(
        data.coverImage[0],
        data.manuscriptFile[0],
        user.uid,
        paperId
      );

      // Format authors
      const formattedAuthors = [
        ...authors.map((author) => ({
          name: author.name,
          affiliation: author.affiliation,
          email: author.email,
        })),
      ];

      if (formattedAuthors.length === 0) {
        toast.error("Please add at least one author.");
        setIsSubmitting(false);
        return;
      }

      // Create article data for Firebase with the correct paper ID
      const articleData = {
        title: data.title,
        excerpt: data.abstract,
        image: coverImageURL,
        document: manuscriptURL,
        link: `/journals/articles/${paperId}`,
        isEditorPick: false,
        status: 'under-review' as const,
        submissionDate: new Date().toISOString(),
        submittedBy: user.uid,
        authors: formattedAuthors,
      };

      // Submit article to Firebase with the pre-generated paper ID
      await articleService.addArticleWithId(articleData, user.uid, paperId);

      // Send confirmation emails
      try {
        const emailData = {
          name: user.displayName || user.email || 'Anonymous',
          email: user.email || '',
          articleTitle: data.title,
          message: data.abstract
        };

        const emailResponse = await fetch('/api/paperEmails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          console.log('Confirmation emails sent successfully');
        } else {
          console.error('Failed to send confirmation emails');
        }
      } catch (emailError) {
        console.error('Error sending confirmation emails:', emailError);
        // Don't fail the submission if email fails
      }

      toast.success('Manuscript submitted successfully! You will receive a confirmation email shortly.');
      reset();
      setAuthors([]);
      setOpen(false);
    } catch (error: any) {
      console.error('Error submitting manuscript:', error);
      toast.error('There was an error submitting your manuscript. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  if (!user) {
    return (
      <div className="m-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to submit manuscripts</h2>
        </div>
      </div>
    );
  }

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
                <div className="space-y-2">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="text-sm">{author.name} - {author.affiliation}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAuthor(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    placeholder="Author name"
                    value={authorInput.name}
                    onChange={(e) => setAuthorInput(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Affiliation"
                    value={authorInput.affiliation}
                    onChange={(e) => setAuthorInput(prev => ({ ...prev, affiliation: e.target.value }))}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={authorInput.email}
                    onChange={(e) => setAuthorInput(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <Button type="button" onClick={addAuthor} className="w-full">
                  Add Author
                </Button>
              </div>

              <div className="space-y-2">
                <label htmlFor="coverImage" className="text-sm font-medium">Cover Image</label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  {...register("coverImage", { required: "Cover image is required" })}
                />
                {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="manuscriptFile" className="text-sm font-medium">Manuscript File (PDF)</label>
                <Input
                  id="manuscriptFile"
                  type="file"
                  accept=".pdf"
                  {...register("manuscriptFile", { required: "Manuscript file is required" })}
                />
                {errors.manuscriptFile && <p className="text-red-500">{errors.manuscriptFile.message}</p>}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  'Submit Manuscript'
                )}
              </Button>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
