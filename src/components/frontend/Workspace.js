// Import React
import React, { useState, createRef, useRef } from "react";
import {onAuthStateChanged} from 'firebase/auth';

// Components
import TemplateData from "../../data/TemplateData";

// CSS
import "../../css/Workspace.css";
import auth from "../../services/firebase";

// to display image
import { storage, storageRef } from "../../services/firebase";
import {  getDownloadURL } from "firebase/storage";
import {ref as refer } from "firebase/storage";

function Workspace(props) {
  // const [img, setImg] = useState(
  //   "https://firebasestorage.googleapis.com/v0/b/temp1-aafa0.appspot.com/o/images?alt=media&token=b9f2d8dc-3662-4db1-814f-17061243c912"
  // );

  const user_id="";
  if (auth.currentUser) {
    const user_id = auth.currentUser.uid;
  }
  const [img,setImg] = useState("https://firebasestorage.googleapis.com/v0/b/temp1-aafa0.appspot.com/user/"+ user_id +"/images");

  React.useEffect(() => {
    // getDownloadURL(storageRef)
    //   .then((url) => {

    //     const xhr = new XMLHttpRequest();
    //     xhr.responseType = "blob";
    //     // xhr.getResponseHeader("Access-Control-Allow-Origin": '*');

    //     xhr.onload = (event) => {
    //       const blob = xhr.response;
    //     };
    //     xhr.open("GET", url);
    //     xhr.send();

    //     // Or inserted into an <img> element
    //     setImg(document.getElementById("images"));
    //     img.setAttribute("src", url);
    //     console.log(img);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //   });
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      console.log(auth.currentUser);
      if (auth.currentUser) {
        console.log(user);
        console.log(auth.currentUser);
        const storageRef = refer(storage, "user/" + auth.currentUser.uid + "/images");
        getDownloadURL(storageRef).then((url) => {
          setImg(url);
      });

    
      
    }
  });
    // if (auth.currentUser) {
    //   const storageRef = refer(storage, "user/" + auth.currentUser.uid + "/images");
    //   getDownloadURL(storageRef).then((downloadURL) => {
    //     console.log("Fvfdvf", downloadURL);
    //     setImg(downloadURL);
    //     // window.location.reload(false);
    //   });
    // }
  }, []);

  // React.useEffect(() => {
  //   window.location.reload(false);
  // }, [img]);



  return (
    <div className="workspace">
      {/* <TextboxList /> */}
      <div className="w1">
        <img className="pim" src={img} alt=""></img>
        </div>
    </div>
  );
}

export default Workspace;
