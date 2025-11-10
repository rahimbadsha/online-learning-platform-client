// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import app from "../utils/firebase/firebase.config";
import AuthContext from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => signOut(auth);

  const updateUser = (info) => updateProfile(auth.currentUser, info);

  const passwordResetEmail = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUser,
    passwordResetEmail,
    user,
    loading,
  };

  return (
    <div>
        <AuthContext value={authData}>{children}</AuthContext>
    </div>
    
  );
};

export default AuthProvider;
