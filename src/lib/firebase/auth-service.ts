import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
    
    // Send welcome email from Gregory Medical Journal
    try {
      const emailData = {
        name: username,
        email: email
      };

      const emailResponse = await fetch('/api/signupEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (emailResponse.ok) {
        console.log('Welcome email sent successfully');
      } else {
        console.error('Failed to send welcome email');
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the registration if email fails
    }
    
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