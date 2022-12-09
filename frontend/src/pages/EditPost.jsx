import { React, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../components/Sidebar-forum";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../axios";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
  },
};


const baseURL = "https://api-onestopinterview.me/api/";
const drawerWidth = 250;

function RenderForm(post) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [caption, setCaption] = useState(post.body);
  const [updatedPost, setUpdatedPost] = useState();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCaption = (e) => {
    setCaption(e.target.value);
  };

  const onSubmit = (e) => {

    if (title == null || caption == null) {
      alert("Title and caption are required.");
      return;
    }

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formData = { title: title, body: caption };

    axiosInstance
      .put(`/postsModify/` + post.id, formData)
      .then((res) => {
        setUpdatedPost(res.data);
        navigate("/forums/posts/" + updatedPost.id, {
          state: {
            id: updatedPost.id,
            title: updatedPost.title,
            body: updatedPost.body,
            parent_post: updatedPost.parent_post,
            author: updatedPost.author,
            time_stamp: formatDate(updatedPost.time_stamp),
            author_username: updatedPost.author_username,
          },
        });
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          position: "static",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box
          sx={{
            width: "80%",
            height: "450px",
            color: "white",
            border: "1px solid white",
            borderRadius: "12px",
          }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <div
              style={{ padding: "15px", width: "100%" }}
              align-items="center"
              flex-direction="column"
              display="flex"
              justify-content="center">
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: "1px solid " }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  display="flex"
                  sx={{ padding: "10px" }}>
                  <Grid item md sx={{ padding: "5px" }}>
                    <TextField
                      fullWidth
                      multiline
                      defaultValue={title}
                      rows={1}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={(e) => onChangeTitle(e)}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </AppBar>
            </div>
            <div
              style={{ padding: "15px", width: "100%" }}
              align-items="center"
              flex-direction="column"
              display="flex"
              justify-content="center">
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: "1px solid " }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  display="flex"
                  sx={{ padding: "10px" }}>
                  <Grid item md>
                    <TextField
                      fullWidth
                      multiline
                      defaultValue={caption}
                      rows={10}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={(e) => onChangeCaption(e)}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </AppBar>
            </div>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              marginTop: "80px",
              justifyContent: "flex-end",
              paddingRight: "4%",
            }}>
            <Button
              type="submit"
              variant="contained"
              href="/forums/posts/"
              sx={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "12px",
              }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={onSubmit}
              sx={{ ml: 2, bgcolor: "rgba(51,102,204)", borderRadius: "12px" }}>
              Submit
            </Button>
          </CardActions>
        </Box>
      </Grid>
    </>
  );
}

export default function EditPost(props) {
  const params = useParams();
  const location = useLocation();

  const [post, setPost] = useState({
    id: location.state.id,
    title: location.state.title,
    body: location.state.body,
    parent_post: location.state.parent_post,
    author: location.state.author,
    time: location.state.time_stamp,
    author_username: location.state.author_username,
  });

  return (
    <ThemeProvider theme={theme}>
      <Navigator
        PaperProps={{ style: { width: drawerWidth, top: "75px" } }}
        sx={{ display: { sm: "block" } }}
      />
      <Box sx={{ flexFlow: "column", alignItems: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "2%",
          }}>
          <div style={{ marginLeft: drawerWidth }}>
            {RenderForm(post)}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
