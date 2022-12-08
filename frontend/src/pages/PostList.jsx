import { React, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navigator from '../components/Sidebar-forum';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate, Link } from "react-router-dom";
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

const baseURL = "https://onestopinterview.onrender.com/api";

function RenderPost(post, props, navigate) {
  const isUserAuthor = (post.author_username==props.state.username) ? "visible" : "none";
  const isPostReply = (post.title=="REPLY POST") ? "none" : "visible";

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  function ViewPost() {
    navigate("/forums/posts/" + post.id, 
      {state:{id: post.id,
              title: post.title,
              body: post.body,
              parent_post: post.parent_post,
              author: post.author,
              time_stamp: formatDate(post.time_stamp),
              author_username: post.author_username} }
    );
  }

  function EditPost(post) {
    navigate("/forums/editpost/", 
      {state:{id: post.id,
              title: post.title,
              body: post.body,
              parent_post: post.parent_post,
              author: post.author,
              time_stamp: formatDate(post.time_stamp),
              author_username: post.author_username} }
    );
  }

  function DeletePost(post) {
    if (window.confirm("Are you sure you want to delete this post?") == true) {
      axiosInstance
        .delete(`/postsModify/` + post.id)
        .then(() => {
          const fetchData = async () =>{
            axios ({
              method: "get",
              url: baseURL + "/posts/", })
            .then(function (response) {
              response.data.forEach(res=> {
                if (res.parent_post == post.id) {
                  axiosInstance
                    .delete(`/postsModify/` + res.id)
                    .then(() => {
                    })
                    .catch((err) => {
                      let errorBody = err.response;
                      return Promise.resolve(errorBody);
                    });
                }
              });
            })
            .catch(function (response) {
              console.error(response);
            });
          }
          fetchData()
          window.location.reload();
        })
        .catch((err) => {
          let errorBody = err.response;
          return Promise.resolve(errorBody);
        });
    }
  }

  return (
    <>
      <Grid item key={post.id} xs={10} sm={10} md={10} 
            sx={{position: 'flex', display: 'flex', flexDirection: 'column', alignItems: 'center'  }} >
        <Box sx={{ 
          width: "80%",
          height: "100%",
          backgroundColor: "#101F33",
          color: "white", border: "1px solid white",
          borderRadius: "12px", 
          display: isPostReply,
          }}>
          <Grid container spacing={2} alignItems="center" padding={1} >
            <Grid item>
              <Avatar {...(post.author_username[0])} />
              </Grid>
              <Grid item xs sx= {{ flexDirection: "column", display: "flex" }}>
              <Typography variant="subtitle1" >{post.author_username}</Typography>
              <Typography variant="body2">{formatDate(post.time_stamp)}</Typography>
              </Grid>
          </Grid>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body1">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="large" onClick={(e)=> ViewPost(post)}>View</Button>
            <Button size="large" onClick={(e)=> EditPost(post)} style={{display: isUserAuthor}}>Edit</Button>
            <Button size="large" onClick={(e)=> DeletePost(post)} style={{display: isUserAuthor}} >Delete</Button>
          </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

export default function PostList(props) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const isUserLoggedIn = props.state.username ? true : "none";
  const drawerWidth = isUserLoggedIn=="none" ? 200 : 250;

  useEffect(() => {
    const fetchData = async () =>{
      axios ({
        method: "get",
        url: baseURL + "/posts/",
      })
        .then(function (response) {
          response.data.forEach(post=> {
            setPosts(posts => [...posts, post]);
          });
        })
        .catch(function (response) {
          console.error(response);
      });
    }
    fetchData()
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: isUserLoggedIn }} >
        <Navigator
          PaperProps={{ style: { width: drawerWidth, top: '75px' } }}
          sx={{ display: { sm: 'block',  } }} />
      </div>
      <Box 
        sx={{ display: 'flex', flexFlow: 'column', alignItems: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
          <Box sx={{ flex: 1, justifyContent: "center", flexDirection: 'column', marginTop: '30px', marginBottom: '30px' }}>
            <div style={{ marginLeft: drawerWidth }}>
              <Container maxWidth="100%" >
                <Grid container spacing={4} >
                  {posts.map((post) => 
                    RenderPost(post, props, navigate)
                  )}
                </Grid>
              </Container>
            </div>
          </Box>
      </Box>
    </ThemeProvider>
  );
}