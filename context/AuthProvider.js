import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          getUserData(user.uid).then((data) => {
            setUser({
              uid: user.uid,
              email: user.email,
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              aboutMe: data.aboutMe,
              rides: data.rides,
              matched: data.matched,
            });
          });
          setIsLogged(true);
        } catch (error) {
          console.error("Set user error", error.message);
        }
      } else {
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchCurrentUser = async () => {
    const { uid, email } = auth.currentUser;
    const user = await getUserData(uid);
    setUser({ uid: uid, email: email, ...user });
  };

  const getCurrentUser = async () => {
    return auth.currentUser;
  };

  const handleSignUp = async (
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUid = userCredential.user.uid;
      const db = getFirestore(app);
      await setDoc(doc(db, "users", userUid), {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        rides: [],
        matched: [],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserData = async (userUid) => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        handleSignIn,
        handleSignUp,
        handleLogOut,
        getUserData,
        getCurrentUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
