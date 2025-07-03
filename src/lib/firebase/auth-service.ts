import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
} from 'firebase/auth';
import { set, get, update, ref as dbRef } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';

// Authentication Services
export const authService = {
  // Register new user
  async register(email: string, password: string, username: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    
    // Send email verification
    await sendEmailVerification(userCredential.user);
    
    // Create user record in Realtime Database
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      username: username,
      displayName: username,
      firstName: '',
      lastName: '',
      affiliation: '',
      bio: '',
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await set(dbRef(realtimeDb, `users/${userCredential.user.uid}`), userData);
    
    return userCredential.user;
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Sign out user
  async signOut() {
    await signOut(auth);
  },

  // Reset password
  async resetPassword(email: string) {
    const actionCodeSettings = {
      url: typeof window !== 'undefined' 
        ? `${window.location.origin}/reset-password/confirm`
        : 'http://localhost:3000/reset-password/confirm',
      handleCodeInApp: true,
    };
    
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  },

  // Send email verification
  async sendEmailVerification() {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Get user data from Realtime Database
  async getUserData(uid: string) {
    const userRef = dbRef(realtimeDb, `users/${uid}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // Update user data in Realtime Database
  async updateUserData(uid: string, updates: any) {
    const userRef = dbRef(realtimeDb, `users/${uid}`);
    await update(userRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },
}; 