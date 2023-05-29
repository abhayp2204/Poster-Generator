import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import auth from "../../services/firebase";

export default function SignOut() {
  const navigate = useNavigate();
  React.useEffect(() => {
    auth.signOut();
    navigate("/");
  });
  return <div>Signing Out...</div>;
}
