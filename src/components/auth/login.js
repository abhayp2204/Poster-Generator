import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "../../services/firebase";
import "../../css/Login.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/verify");
        }
        navigate("/main");
      })
      .catch((error) => {
        setError(error.code.substring(5).replaceAll("-", " "));
      });
  };
  return (
    <Container className="login-container" component="main" maxWidth="xs">
      <Box
        className="login-box"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div class="login">
          <Typography className="sign-in-text" component="h1" variant="h5">
            Sign in
          </Typography>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          className="up"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
