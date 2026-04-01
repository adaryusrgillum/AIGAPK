import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ──────────────────────────────────────────────
// Replace these values with your Firebase project config.
// Firebase Console → Project settings → General → Your apps → Config
// ──────────────────────────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:xxxxxxxxxxxxxxxx',
};

const app = initializeApp(firebaseConfig);

// Use AsyncStorage for auth state persistence across app restarts
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
