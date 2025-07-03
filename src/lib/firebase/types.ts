// Firebase Service Types

export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  image: string;
  document?: string;
  link: string;
  isEditorPick: boolean;
  status: 'under-review' | 'accepted' | 'rejected' | 'published';
  submissionDate: string;
  submittedBy: string; // User UID
  submittedByName: string;
  submittedByEmail: string;
  authors: Array<{
    name: string;
    affiliation: string;
    email: string;
  }>;
}

export interface Member {
  id?: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  email?: string;
  order?: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  affiliation?: string;
  role: 'user' | 'admin' | 'editor';
  createdAt: string;
  image?: string;
} 