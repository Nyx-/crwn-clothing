import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMBcNnhH4Or3_UeL4wfqZiM-ZRwn_8wqQ",
    authDomain: "crwn-db-75dce.firebaseapp.com",
    databaseURL: "https://crwn-db-75dce.firebaseio.com",
    projectId: "crwn-db-75dce",
    storageBucket: "crwn-db-75dce.appspot.com",
    messagingSenderId: "490898755272",
    appId: "1:490898755272:web:d976650c6e31ba8cfedffd"
}

export const createUserPofileDocument = async (userAuth, additionalData) => {
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
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
