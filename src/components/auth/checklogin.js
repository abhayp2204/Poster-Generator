import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Check() {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        navigate("/main");
      } else {
        navigate("/login");
      }
    });
  });
  return <div>Loading...</div>;
}
