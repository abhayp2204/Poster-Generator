import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../services/firebase";
import Alert from "@mui/material/Alert";
import "../../css/Login.css";

export default function SignUp() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // confirm password
    if (data.get("password") !== data.get("confirm-password")) {
      setError("Passwords do not match");
    } else {
      createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/verify");
        })
        .catch((error) => {
          setError(error.code.substring(5).replaceAll("-", " "));
        });
    }
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
        <Typography className="sign-in-text" component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          className="up"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}

              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="outlined"
                // variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
