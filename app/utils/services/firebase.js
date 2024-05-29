// Import the functions you need from the SDKs you need
import {    initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAErZJ9TokYUCE7HZyoLU5z7h3o-ejK0W8',
  authDomain: 'photos-ba1d2.firebaseapp.com',
  projectId: 'photos-ba1d2',
  storageBucket: 'photos-ba1d2.appspot.com',
  messagingSenderId: '382642084034',
  appId: '1:382642084034:web:b3ca2e6c048cedfb62c35b',
  measurementId: 'G-DMRDXNXT2J',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
