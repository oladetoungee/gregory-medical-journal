# Firebase Security Rules

## Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles collection
    match /articles/{articleId} {
      allow read: if true; // Anyone can read approved articles
      allow create: if request.auth != null; // Only authenticated users can create
      allow update, delete: if request.auth != null && 
        (request.auth.token.role == 'admin' || request.auth.token.role == 'editor' || 
         resource.data.submittedByEmail == request.auth.token.email);
    }
    
    // Members collection
    match /members/{memberId} {
      allow read: if true; // Anyone can read members
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
    
    // Users collection (for user profiles)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Article files
    match /articles/{articleId}/{fileName} {
      allow read: if true; // Anyone can read article files
      allow write: if request.auth != null && 
        (request.auth.token.role == 'admin' || request.auth.token.role == 'editor');
    }
    
    // User profile images
    match /users/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Realtime Database Rules

```json
{
  "rules": {
    "board": {
      ".read": true,
      ".write": "auth != null && (auth.token.role == 'admin' || auth.token.role == 'editor')"
    },
    "papers": {
      ".read": true,
      ".write": "auth != null"
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "notifications": {
      ".read": "auth != null",
      ".write": "auth != null && (auth.token.role == 'admin' || auth.token.role == 'editor')"
    },
    "analytics": {
      ".read": "auth != null && auth.token.role == 'admin'",
      ".write": "auth != null && auth.token.role == 'admin'"
    }
  }
}
```
```

## Setup Instructions

1. Go to Firebase Console
2. Navigate to Firestore Database > Rules
3. Replace the default rules with the Firestore rules above
4. Navigate to Storage > Rules
5. Replace the default rules with the Storage rules above
6. Navigate to Realtime Database > Rules
7. Replace the default rules with the Realtime Database rules above

## User Roles

To implement user roles, you'll need to:

1. Create custom claims in Firebase Functions
2. Set up user roles in your user profile documents
3. Update the auth context to handle roles

Example user profile structure:
```javascript
{
  uid: "user_id",
  email: "user@example.com",
  username: "username",
  role: "user", // "user", "editor", "admin"
  createdAt: "2024-01-01T00:00:00Z",
  affiliation: "University Name"
}
``` 