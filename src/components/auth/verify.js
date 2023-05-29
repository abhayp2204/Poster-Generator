import * as React from "react";
import Alert from "@mui/material/Alert";
import auth from "../../services/firebase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import Card from "@mui/material/Card";
import { CardActions, CardContent } from "@mui/material";
import { useEffect } from "react";

export default function Verify() {
  const [verifyEmail, setVerifyEmail] = React.useState(false);
  const [error, setError] = React.useState("");
  const [user_email,setUserEmail] = React.useState("");
  
  onAuthStateChanged(auth, (user) => {

    if (user) {
      const email = auth.currentUser.email;
      setUserEmail(email);
    } else {
      this.name = "Unknown"
    }
  });

  const navigate = useNavigate();
  // useEffect(() => {
  //   auth.currentUser.reload();

  //   auth.onAuthStateChanged( async function(user) {
  //     console.log("HIJ");
  //     if(user){
  //     await user.reload()
  //     if (user.emailVerified) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       console.log("hello");
  //       navigate("/main");
  //     }
  //     console.log(user.emailVerified);
  //     console.log("hello");}
  //   });
  //   console.log("DEF");

  //   });

  const handleVerify = (event) => {
    event.preventDefault();
    console.log("XYZ");
    sendEmailVerification(auth.currentUser)
      .then(function () {
        setVerifyEmail(true);
      })
      .catch(function (error) {
        setError(error.code.substring(5).replaceAll("-", " "));
      });
  };

  const handleCheck = (event) => {
    event.preventDefault();
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("hello");
          navigate("/main");
        } else {
          setError("Please verify your email");
        }
      }
    });
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ padding: 3 }}>
          <CardContent>
            <Typography variant="h4">
              {/* Welcome {auth.currentUser.email}! */}
              Welcome {user_email}!
            </Typography>
            <Typography variant="h6">
              Please verify your email address.
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {verifyEmail && (
              <Alert severity="success">Verification mail sent!</Alert>
            )}
          </CardContent>
          <CardActions>
            <Button
              // variant="contained"
              color="secondary"
              variant="outlined"
              //   size="small"
              onClick={(e) => {
                handleVerify(e);
              }}
            >
              Send Verification
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              // variant="contained"
              //   size="small"
              onClick={(e) => {
                handleCheck(e);
              }}
            >
              Done
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
