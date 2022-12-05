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

function RenderPost(post, props, navigate) {
  const isUserAuthor = (post.author_username==props.state.username) ? "visible" : "hidden";

  const savedTime = post.time_stamp;
  const formatedDate = new Date(savedTime).toLocaleString(
    "en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
  );

  function ViewPost(props) {
    navigate("/forums/posts/" + post.id, 
      {state:{id: post.id,
              title: post.title,
              body: post.body,
              author: post.author,
              time_stamp: formatedDate}
      }
    );
  }

  return (
    <>
      <Grid item key={post} xs={10} sm={10} md={10} 
            sx={{position: 'flex', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Box sx={{ 
          width: "80%",
          height: "100%",
          backgroundColor: "#101F33",
          color: "white", border: "1px solid white",
          borderRadius: "12px", }}>
          <Grid container spacing={2} alignItems="center" padding={1} >
            <Grid item>
              <Avatar {...(post.author[0])} />
              </Grid>
              <Grid item xs sx= {{ flexDirection: "column", display: "flex" }}>
              <Typography variant="subtitle1" >{post.author_username}</Typography>
              <Typography variant="body2">{formatedDate}</Typography>
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
            <Button size="large" style={{visibility : isUserAuthor}} >Edit</Button>
            <Button size="large" style={{visibility : isUserAuthor}} >Delete</Button>
            <Button size="large" onClick={(e)=> ViewPost(post)}>View</Button>
          </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

const baseURL = "https://onestopinterview.onrender.com/api";

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