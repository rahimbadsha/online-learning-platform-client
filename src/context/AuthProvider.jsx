import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from  "firebase/auth";
import app from "../utils/firebase/firebase.config";
import AuthContext from "./AuthContext";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth/cordova";

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const signIn = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const signInWIthGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleAuthProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUser = (userInfo) => {
      return updateProfile(auth.currentUser, userInfo);
    };

    const passwordResetEmail = (email) => {
      return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
      // set the observer
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        //console.log("current user in auth state change", currentUser);
        setUser(currentUser);
        setLoading(false);
      });

      // clear the observer on unmount
      return () => {
        unsubscribe();
      };
    }, []);

    const authData = {
      createUser,
      signIn,
      setUser,
      signInWIthGoogle,
      logOut,
      updateUser,
      passwordResetEmail,
      user,
      loading,
    };

  return <div>
    <AuthContext value={authData}>{children}</AuthContext>
  </div>;
};

export default AuthProvider;
