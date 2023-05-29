import { getAuth } from "firebase/auth";
import { initializeApp,firestore } from "firebase/app";
import { config } from "./secrets";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import 'firebase/compat/firestore'
import * as firebase from 'firebase/app'

import { Firestore,getFirestore } from "firebase/firestore";

const firebaseConfig = config;

// firebase.initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
// https://modularfirebase.web.app/common-use-cases/storage/
// https://stackoverflow.com/questions/70052479/firebase-storage-an-unknown-error-occurred-please-check-the-error-payload-for
const storage = getStorage(firebaseApp);
const storageRef = ref(storage, "images");

const projectStorage = storage;
const projectFirestore = getFirestore(firebaseApp); //firebaseApp.firestore();
// const projectFirestore = Firestore()

// const timestamp = Firestore.FieldValue.serverTimestamp;


export { storage , storageRef , auth as default, projectFirestore, projectStorage };
