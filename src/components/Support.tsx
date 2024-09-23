'use client';

import { useForm } from "react-hook-form";
import { Input,  AutosizeTextarea } from "@/components/ui";
import { Button } from "@/components/";
import { toast } from 'react-toastify';
import { Typewriter } from "@/components";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Support() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        reset();
      } else {
        toast.error("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="m-12">
    <div className="mb-8">
<Typewriter text="Need Help? Reach out to the Gregory Journal Team" className="page-header text-2xl font-bold mb-6" />
</div>
      <p className="text-sm mb-6 text-primary">If you have any questions or need assistance, please fill out the form below.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <Input id="name" {...register("name", { required: true })} placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <Input id="email" type="email" {...register("email", { required: true })} placeholder="Your Email" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <AutosizeTextarea id="message" {...register("message", { required: true })} placeholder="Your Message" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
