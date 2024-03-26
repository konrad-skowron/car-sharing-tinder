import React, { useState, useEffect } from 'react';
import app from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Layout from "./_layout";
import SignIn from "./ride/Authentication/Login/SignIn";
import SignUp from "./ride/Authentication/Register/SignUp";
import Home from "./ride/MainPage/Home/Home";

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        global.email = user.email;
        global.uid = user.uid;
        getUserData(uid).then(data => {
          global.firstName = data.firstName;
          global.lastName = data.lastName;
          global.phoneNumber = data.phoneNumber;
          setUser(user);
        });
      } else {
        global.email = '';
        global.uid = '';
        global.firstName = '';
        global.lastName = '';
        global.phoneNumber = '';
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [auth]);

   global.handleAuthentication = handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userUid = userCredential.user.uid;

          const db = getFirestore(app);

          await setDoc(doc(db, "users", userUid), {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
          });
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  global.getUserData = getUserData = async (userUid) => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  return (
    user ? (
      // TODO: Await firebase response
      <Home />
    ) : (
      isLogin ? (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      ) : (
        <SignUp
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )
    )

    // <SafeAreaView>
    //   <Stack.Screen
    //     options={{
    //       headerTitle: "",
    //       headerStyle: { backgroundColor: "gray" },
    //       headerShadowVisible: false,
    //       headerRight: () => <Text>Profile</Text>,
    //     }}
    //   />
    //   <ScrollView>
    //     <View>
    //       <Link href="ride" asChild>
    //         <Pressable>
    //           <Text>Create ride</Text>
    //         </Pressable>
    //       </Link>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default App;
