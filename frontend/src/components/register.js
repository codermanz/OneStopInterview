import React, { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";

export default function SignUp() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`/user/register/`, {
        email: formData.email,
        user_name: formData.username,
        first_name: formData.firstname,
        last_name: formData.lastname,
        password: formData.password,
      })
      .then((res) => {
        navigate("/login");
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
        <Paper elevation={16}>
          <Typography variant="h5" mb={2}>
            Sign Up
          </Typography>
          <form
            styles={{ width: "100%", marginTop: theme.spacing(3) }}
            noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: theme.spacing(3, 0, 2) }}
              onClick={handleSubmit}>
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  <Button>
                    <Typography variant="body2">
                      Already have an account? Sign in
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </ThemeProvider>
    </Container>
  );
}
