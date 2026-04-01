import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const ADMIN_EMAIL = 'admin@abelinsgroup.com';
const ADMIN_PASSWORD = 'Admin2026!';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!isAdmin) setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing, isAdmin]);

  const adminSignIn = useCallback((email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ displayName: 'Admin', email: ADMIN_EMAIL, uid: 'admin-demo' });
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const adminSignOut = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin, initializing, adminSignIn, adminSignOut }),
    [user, isAdmin, initializing, adminSignIn, adminSignOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
