'use client';

import { useState, useEffect } from 'react';
import { Input, AutosizeTextarea } from "@/components/ui";
import { toast } from 'react-toastify';
import { Typewriter, SubmitButton } from "@/components";
import { useAuth } from '@/contexts/AuthContext';

export default function Support() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || user.email || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true);    
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        setFormData({ name: '', email: '', message: '' });  // Reset form
      } else {
        toast.error("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="m-12">
      <div className="mb-8">
        <Typewriter text="Need Help? Reach out to the Gregory Journal Team" className="page-header text-2xl font-bold mb-6" />
      </div>
      <p className="text-sm mb-6 text-primary">If you have any questions or need assistance, please fill out the form below.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <AutosizeTextarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required />
        </div>
        <SubmitButton
          className="w-full flex justify-center items-center text-primary hover:bg-primary"
          text="Send Message"
          loadingText="Sending..."
          loading={loading}  
        />
      </form>
       {/* Add tutorial link here */}
       <p className="my-4 text-xs text-primary">
        For a step-by-step guide on how to use the Gregory Medical Journal website and dashboard, click 
        <a href="https://www.example.com/tutorial" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer"> here</a>.
      </p>
    </div>
  );
}
