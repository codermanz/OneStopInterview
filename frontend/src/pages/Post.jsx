import { React, useState, useEffect } from 'react';
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

  const [comment, setComment] = useState();

const isUserLoggedIn = props.state.username ? true : false;
const visibility = isUserLoggedIn ? "visible" : "hidden";
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

    const formData = { title: comment, parent_post: post.parent_post };
    axiosInstance
      .post(`/posts/`, formData)
      .then((res) => {
        console.log(res);
//        navigate("/forums/postlist/");
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

function RenderReply(post) {

  return (
    <>
      <Grid item key={post} xs={12} sm={12} md={12} 
            sx={{position: 'static', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '10px' }} >
        <Box sx={{ 
            width: "80%",
            height: "200px",
            color: "white",
            border: "1px solid white",
            borderRadius: "12px", }}>
            <Grid container spacing={2} alignItems="center" padding={2} >
                <Grid item>
                    <Avatar {...(post.author[0])} />
                </Grid>
                <Grid item xs sx= {{ flexDirection: "column", display: "flex" }}>
                    <Typography variant="subtitle1" >{post.author}</Typography>
                    <Typography variant="body2">{post.time}</Typography>
                </Grid>
            </Grid>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1">
                  {post.body}
                </Typography>
            </CardContent>
        </Box> 
      </Grid>
    </>
  );
}


export default function ViewPost(props) {
    const params = useParams();
    const location = useLocation();

    const [post, setPost] = useState({
        title: location.state.title,
        body: location.state.body,
        author: location.state.author,
        time: location.state.time_stamp,
    })

    // Mocking data ATM
    const [replies, setReplies] = useState([
        { author: "User1",
        body: "Reply test1",
        time: "11/29/2022"},
        { author: "User2",
        body: "Reply test2",
        time: "11/30/2022"}
    ]);

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
            <div style={{ marginLeft: drawerWidth }}>
                {replies.map((reply) => (
                    RenderReply(reply)
                ))}
            </div>
          </Box>
      </Box>
    </ThemeProvider>
  );
}