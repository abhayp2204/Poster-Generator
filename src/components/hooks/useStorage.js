import { useState, useEffect, useReducer } from 'react';
import firebase, { projectStorage, projectFirestore, storageRef} from '../../services/firebase';
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {collection} from 'firebase/firestore';
import auth from '../../services/firebase';



const useStorage = (file) => {
  console.log(file)
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, 'user/'+auth.currentUser.uid+'/images');
    // const storageRef = storageRef(file.name);
    // const collectionRef = projectFirestore.collection('images');
    const collectionRef = collection(projectFirestore,'images');
    // const ts = projectFirestore.serverTimestamp();

    // storageRef.put(file).on('state_changed', (snap) => {
    //   let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //   setProgress(percentage);
    // }, (err) => {
    //   setError(err);
    // }, async () => {
    //   const url = await storageRef.getDownloadURL();
    //   // const createdAt = ts;
    //   await collectionRef.add({ url});//, createdAt });
    //   setUrl(url);
    // });

    uploadBytesResumable(storageRef, file).then((snapshot) => {
      console.log("Uploaded", snapshot.totalBytes, "bytes.");
    }).catch((error) => {
      console.error("Upload failed", error);
    });

  }, [file]);

  return {url, error };
}

export default useStorage;