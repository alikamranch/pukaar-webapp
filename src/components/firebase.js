import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBa6teEdNlb8asQW80UqfczU9KHaNX5A74",
  authDomain: "pukaar-humanity.firebaseapp.com",
  databaseURL: "https://pukaar-humanity.firebaseio.com",
  projectId: "pukaar-humanity",
  storageBucket: "pukaar-humanity.appspot.com",
  messagingSenderId: "827576416772",
  appId: "1:827576416772:web:b0a311f9a5a858e2ed5351",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
