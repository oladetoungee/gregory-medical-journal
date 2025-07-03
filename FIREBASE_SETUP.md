# Firebase Setup Guide

## Overview
This guide will help you set up Firebase for the Gregory Medical Journal project, replacing Strapi with Firebase for authentication, data storage, and file management.

## Prerequisites
- Firebase project created
- Firebase configuration details ready
- Node.js and npm installed

## Step 1: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
```

## Step 2: Firebase Console Setup

### 2.1 Enable Services
1. Go to Firebase Console
2. Select your project
3. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**
   - **Realtime Database**

### 2.2 Configure Authentication
1. Go to Authentication > Sign-in method
2. Enable Email/Password authentication
3. Optionally enable other providers (Google, GitHub, etc.)

### 2.3 Set Up Firestore Database
1. Go to Firestore Database
2. Create database in production mode
3. Choose a location close to your users
4. Apply the security rules from `firebase-rules.md`

### 2.4 Configure Storage
1. Go to Storage
2. Start in production mode
3. Choose a location
4. Apply the security rules from `firebase-rules.md`

### 2.5 Set Up Realtime Database
1. Go to Realtime Database
2. Create database
3. Apply the security rules from `firebase-rules.md`

## Step 3: Install Dependencies

The Firebase SDK has already been installed. If you need to reinstall:

```bash
npm install firebase
```

## Step 4: Migrate Data

Run the migration script to populate Firebase with initial data:

```bash
node scripts/migrate-to-firebase.js
```

This will migrate:
- Articles from static data
- Editorial board members
- Set all existing articles as "approved"

## Step 5: Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Test the following features:
   - User registration
   - User login/logout
   - Article display
   - Editorial board display

## Step 6: Security Rules

Apply the security rules provided in `firebase-rules.md`:

1. **Firestore Rules**: Go to Firestore Database > Rules
2. **Storage Rules**: Go to Storage > Rules  
3. **Realtime Database Rules**: Go to Realtime Database > Rules

## Step 7: Admin Dashboard Setup

### 7.1 Create Admin Users
You'll need to manually create admin users in Firebase Console:

1. Go to Authentication > Users
2. Add a user with admin privileges
3. Set custom claims for admin role (requires Firebase Functions)

### 7.2 Firebase Functions for User Roles
Create a Firebase Function to set user roles:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.setUserRole = functions.https.onCall(async (data, context) => {
  // Verify admin permissions
  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  const { uid, role } = data;
  
  await admin.auth().setCustomUserClaims(uid, { role });
  
  return { success: true };
});
```

## Step 8: File Upload Configuration

### 8.1 Storage Rules
Ensure your storage rules allow file uploads for authenticated users:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /articles/{articleId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 8.2 File Upload Service
The file upload service is already implemented in `src/lib/firebase/file-service.ts`.

## Step 9: Monitoring and Analytics

### 9.1 Firebase Analytics
Enable Firebase Analytics for better insights:

1. Go to Analytics in Firebase Console
2. Follow the setup instructions
3. Add analytics events to your app

### 9.2 Error Monitoring
Set up Firebase Crashlytics for error monitoring:

```bash
npm install @firebase/crashlytics
```

## Step 10: Production Deployment

### 10.1 Environment Variables
Ensure all environment variables are set in your production environment.

### 10.2 Security Rules
Review and update security rules for production use.

### 10.3 Performance Optimization
- Enable Firestore offline persistence
- Implement proper indexing
- Use pagination for large datasets

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check if Email/Password auth is enabled
   - Verify environment variables
   - Check browser console for errors

2. **Permission Denied Errors**
   - Review security rules
   - Check user authentication status
   - Verify user roles

3. **File Upload Issues**
   - Check storage rules
   - Verify file size limits
   - Check network connectivity

### Debug Mode
Enable Firebase debug mode:

```javascript
// In your firebase config
const app = initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## Next Steps

1. **Admin Dashboard**: Create a comprehensive admin dashboard
2. **User Management**: Implement user profile management
3. **Article Submission**: Build article submission workflow
4. **Review Process**: Implement article review system
5. **Notifications**: Add real-time notifications
6. **Search**: Implement advanced search functionality

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)

For project-specific issues:
- Check the project documentation
- Review the code comments
- Test with the provided examples 