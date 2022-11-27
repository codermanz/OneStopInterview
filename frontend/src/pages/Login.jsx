import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import logo from "../assets/logo.svg";
import theme from "../themes/theme";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../components/index";

function BadLogin(props) {
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 8 seconds
    setTimeout(() => {
      props.setAlert(false);
    }, 8000);
  });

  return (
    <Grid item sx={{ mb: 3 }}>
      <Box sx={{ width: "100%" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Sign in error — <strong>username or password is incorrect.</strong>
        </Alert>
      </Box>
    </Grid>
  );
}

export default function Login(props) {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialFormData = Object.freeze({
    username: "",
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

    if (formData.username && formData.password) {
      setLoading(true);
      axiosInstance
        .post(`token/`, {
          user_name: formData.username,
          password: formData.password,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          props.setState({ username: formData.username });
          navigate("/");
        })
        .catch((err) => {
          setAlert(true);
          let errorBody = err.response;
          return Promise.resolve(errorBody);
        })
        .then(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#151517",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}>
        <Grid container sx={{ minHeight: "100vh", color: "white" }}>
          <Grid
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            marginBottom="120px"
            item
          />
          <Grid item xs={12} sm={8} md={5} elevation={6} square="true">
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Avatar sx={{ m: 1, bgcolor: "rgba(51,102,204)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  SelectProps={{ style: { color: "white" } }}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  SelectProps={{ style: { color: "white" } }}
                  onChange={handleChange}
                />
                <Grid item align="right">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      mb: 2,
                      bgcolor: "rgba(51,102,204)",
                      borderRadius: "12px",
                    }}>
                    Sign In
                  </Button>
                </Grid>

                {alert ? <BadLogin alert={alert} setAlert={setAlert} /> : null}

                <Grid item>
                  <Typography variant="body2" align="center">
                    Don't have an account yet?
                  </Typography>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 1,
                        mb: 2,
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "12px",
                      }}>
                      Register
                    </Button>
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
