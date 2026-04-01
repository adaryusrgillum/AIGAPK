import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Create a new account and set the display name.
 * Returns the Firebase User object on success.
 */
export async function signUp(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  return user;
}

/**
 * Sign in an existing user with email + password.
 * Returns the Firebase User object on success.
 */
export async function signIn(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

/**
 * Send a password-reset email to the given address.
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  await firebaseSignOut(auth);
}
