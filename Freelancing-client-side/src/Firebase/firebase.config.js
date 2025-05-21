/** @format */

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDNm5t71eOKVgdffNFH0sTACbIbvMeusFk",
  authDomain: "freelancer-726da.firebaseapp.com",
  projectId: "freelancer-726da",
  storageBucket: "freelancer-726da.firebasestorage.app",
  messagingSenderId: "1029880895507",
  appId: "1:1029880895507:web:6f67359122882b77ea07e6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Make sure this line is present
export default app;
