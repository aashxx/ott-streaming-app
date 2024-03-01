import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBioo9hH5K4-vLfrEAJlu5fmW7FtbhYmmY",
  authDomain: "video-streaming-app-59520.firebaseapp.com",
  projectId: "video-streaming-app-59520",
  storageBucket: "video-streaming-app-59520.appspot.com",
  messagingSenderId: "724201458845",
  appId: "1:724201458845:web:a1a889c802f6a8d658d874"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export { auth, storage, provider };

export default db;