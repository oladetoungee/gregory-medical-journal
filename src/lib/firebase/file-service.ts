import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase';

// File Upload Services
export const fileService = {
  // Upload file to Firebase Storage
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  },

  // Delete file from Firebase Storage
  async deleteFile(url: string) {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  },

  // Upload article files
  async uploadArticleFiles(coverImage: File, manuscriptFile: File, userUid: string, articleId: string) {
    const coverImagePath = `papers/${userUid}/${articleId}/cover-${Date.now()}-${coverImage.name}`;
    const manuscriptPath = `papers/${userUid}/${articleId}/manuscript-${Date.now()}-${manuscriptFile.name}`;

    const [coverImageURL, manuscriptURL] = await Promise.all([
      this.uploadFile(coverImage, coverImagePath),
      this.uploadFile(manuscriptFile, manuscriptPath),
    ]);

    return {
      coverImageURL,
      manuscriptURL,
    };
  },

  // Upload article cover image
  async uploadArticleCover(file: File, userUid: string, articleId: string): Promise<string> {
    const path = `papers/${userUid}/${articleId}/cover.${file.name.split('.').pop()}`;
    return this.uploadFile(file, path);
  },

  // Upload article manuscript
  async uploadArticleManuscript(file: File, userUid: string, articleId: string): Promise<string> {
    const path = `papers/${userUid}/${articleId}/manuscript.${file.name.split('.').pop()}`;
    return this.uploadFile(file, path);
  },

  // Upload user profile image
  async uploadProfileImage(file: File, userId: string): Promise<string> {
    const path = `users/${userId}/profile.${file.name.split('.').pop()}`;
    return this.uploadFile(file, path);
  },
}; 