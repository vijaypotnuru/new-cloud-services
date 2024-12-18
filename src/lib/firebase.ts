
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCSDcBNzUwPY9XeS4-RP7t40rJguP-DlVk",
  authDomain: "vpt-admin1.firebaseapp.com",
  projectId: "vpt-admin1",
  storageBucket: "vpt-admin1.appspot.com",
  messagingSenderId: "785994318295",
  appId: "1:785994318295:web:31b2f26e4ce63e88bb4b92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)