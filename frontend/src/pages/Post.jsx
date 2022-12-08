import { React, useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Link, Routes, useParams, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../components/Sidebar-forum';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
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
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
  },
};

const baseURL = "https://api-onestopinterview.me/api/";

const drawerWidth = 250;

function RenderPost(post) {
  return (
    <>
      <Grid item key={post} xs={12} sm={12} md={12} 
            sx={{position: 'static', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '10px' }} >
        <Box sx={{ 
            width: "80%",
            height: "300px",
            color: "white",
            backgroundColor: "#101F33",
            border: "1px solid white",
            borderRadius: "12px", }}>
            <Grid container spacing={2} alignItems="center" padding={2} >
                <Grid item>
                    <Avatar {...(post.author[0])} />
                </Grid>
                <Grid item xs sx= {{ flexDirection: "column", display: "flex", paddingInline: '10px' }}>
                    <Typography variant="subtitle1" >{post.author_username}</Typography>
                    <Typography variant="body2">{post.time}</Typography>
                </Grid>
            </Grid>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight='bold'>
                  {post.title}
                </Typography>
                <Typography variant="body1">
                  {post.body}
                </Typography>
            </CardContent>
        </Box> 
      </Grid>
    </>
  );
}

function RenderCommentbox(props, post) {
  const navigate = useNavigate();

  const [comment, setComment] = useState();
  const isUserLoggedIn = props.state.username ? true : false;
  const isUserAuthor = (post.author==props.state.username) ? "visible" : "hidden";
  const placeholder = isUserLoggedIn ? "Comment..." : "You have to log-in first to leave a comment.";

  const onChangeComment = (e) => {
    if (!e.target.value) {
      setComment(undefined);
      return;
    }
    setComment(e.target.value);
  };

  const onSubmitReply = (e) => {
    if (comment == null) {
      alert("Comment is required.");
      return;
    }

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric"}
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formData = { title: "REPLY POST", body: comment, parent_post: post.id };
    axiosInstance
      .post(`/posts/`, formData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
    });
  }

  return (
    <>
      <Grid item xs={12} sm={12} md={12} 
            sx={{position: 'static', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Box sx={{ 
          width: "80%",
          height: "230px",
          color: "white",
          border: "1px solid white",
          borderRadius: "12px", }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <div
                style={{ padding: "20px", width: "100%" }}
                align-items="center"
                flex-direction="column"
                display="flex"
                justify-content="center">
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  sx={{ borderBottom: '1px solid ' }} >
                    <Toolbar>
                      <Grid container spacing={2} alignItems="center" display='flex'>
                        <Grid item md>
                            <TextField
                              fullWidth
                              multiline
                              disabled={!isUserLoggedIn}
                              placeholder={placeholder}
                              rows={3}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              onChange={e=>onChangeComment(e)}
                              variant="standard" />
                        </Grid>
                      </Grid>
                    </Toolbar>
                </AppBar>
              </div>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '4%' }}>
                <Button
                    type="submit" variant="contained" href="/forums/posts/"
                    sx={{ backgroundColor: "transparent", color: "white",
                        border: "1px solid white", borderRadius: "12px", }}>
                    Cancel
                </Button>
                <Button
                    type="submit" variant="contained" onClick={onSubmitReply}
                    sx={{ ml: 2, bgcolor: "rgba(51,102,204)", borderRadius: "12px", }}>
                    Submit
                </Button>
            </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

function RenderReply(id) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      axios ({
        method: "get",
        url: baseURL + "posts/",
      })
        .then(function (response) {
          response.data.forEach(post=> {
            if (post.parent_post == id) {
              setReplies(replies=> [...replies, post]);
            }
          });
        })
        .catch(function (response) {
          console.error(response);
      });
    }
    fetchData()
  }, []);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div style={{ marginLeft: drawerWidth }}>
      {replies.map((reply) => (
        <Grid item key={reply.id} xs={12} sm={12} md={12} 
              sx={{position: 'static', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '10px' }} >
          <Box sx={{ 
              width: "80%",
              height: "200px",
              color: "white",
              border: "1px solid white",
              borderRadius: "12px", }}>
              <Grid container spacing={2} alignItems="center" padding={2} >
                  <Grid item>
                      <Avatar {...(reply.author[0])} />
                  </Grid>
                  <Grid item xs sx= {{ flexDirection: "column", display: "flex" }}>
                      <Typography variant="subtitle1" >{reply.author_username}</Typography>
                      <Typography variant="body2">{formatDate(reply.time_stamp)}</Typography>
                  </Grid>
              </Grid>
              <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">
                    {reply.body}
                  </Typography>
              </CardContent>
          </Box> 
        </Grid>
      ))}
    </div>
  );
}


export default function ViewPost(props) {
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
    })

  return (
    <ThemeProvider theme={theme}>
      <Navigator
        PaperProps={{ style: { width: drawerWidth, top: '75px' } }}
        sx={{ display: { sm: 'block',  } }}
      />
      <Box 
        sx={{ flexFlow: 'column', alignItems: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
          <Box sx={{ flex: 1, justifyContent: "center", display: 'flex', flexDirection: 'column', marginTop: '2%'}}>
            <div style={{ marginLeft: drawerWidth }}>
                {RenderPost(post)}
            </div>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "center", display: 'flex', flexDirection: 'column', marginTop: '2%'}}>
            <div style={{ marginLeft: drawerWidth }}>
                {RenderCommentbox(props, post)}
            </div>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "center", display: 'flex', flexDirection: 'column', marginTop: '2%'}}>
              {RenderReply(post.id)}
          </Box>
      </Box>
    </ThemeProvider>
  );
}
