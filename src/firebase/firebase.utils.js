import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCOR6zMMeX1ld-8UCs2oXxRHR_JESVue-I",
  authDomain: "crwn-db-5a703.firebaseapp.com",
  projectId: "crwn-db-5a703",
  storageBucket: "crwn-db-5a703.appspot.com",
  messagingSenderId: "1066650517342",
  appId: "1:1066650517342:web:4edcdeed7cb11fd98959cf",
  measurementId: "G-N9W47JQ68P",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
