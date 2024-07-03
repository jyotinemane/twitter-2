
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASB5G4boRL7YUGbKm3_sYAsX9Q9svLtFU",
  authDomain: "twitterapp-9a691.firebaseapp.com",
  projectId: "twitterapp-9a691",
  storageBucket: "twitterapp-9a691.appspot.com",
  messagingSenderId: "368902199579",
  appId: "1:368902199579:web:79705f2ad444cfcea6dbbe",
  measurementId: "G-HX2BQ0FS12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
// const firestore = getFirestore(app);
export default auth;