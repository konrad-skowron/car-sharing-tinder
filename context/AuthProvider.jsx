import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsLogged(false);
          const data = await getUserData(user.uid);
          setUser({ uid: user.uid, email: user.email, ...data });

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

  useEffect(() => {
    if (!user?.uid) return;

    const db = getFirestore(app);
    const unsubscribeFirestore = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists) {
        setUser((prevUser) => ({
          ...prevUser,
          ...doc.data(),
        }));
      }
    });

    return () => unsubscribeFirestore();
  }, [user?.uid]);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error("SingIn: ", error.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      setIsLogged(false);
      const { uid, email } = auth.currentUser;
      const fetchedUser = await getUserData(uid);
      setUser({ uid: uid, email: email, ...fetchedUser });
    } catch (error) {
      console.log("FetchingCurrentUSer", error.message);
    } finally {
      setIsLogged(true);
    }
  };

  const getCurrentUser = async () => {
    return auth.currentUser;
  };

  const handleSignUp = async (email, password, firstName, lastName, phoneNumber) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      throw new Error("SingUp: ", error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw new Error("Logout:", error.message);
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
