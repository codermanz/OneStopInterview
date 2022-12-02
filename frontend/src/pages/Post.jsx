import { React, useState, useEffect } from 'react';
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
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

const renderPost = (post) => {
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
                    <Avatar {...stringAvatar(post.author)} />
                </Grid>
                <Grid item xs sx= {{ flexDirection: "column", display: "flex", paddingInline: '10px' }}>
                    <Typography variant="subtitle1" >{post.author}</Typography>
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

const renderCommentbox = () => {
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
                              placeholder="Comment..."
                              rows={3}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              variant="standard" />
                        </Grid>
                      </Grid>
                    </Toolbar>
                </AppBar>
              </div>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '4%' }}>
                <Button
                    type="submit" variant="contained" href="/forums/postlist/"
                    sx={{ backgroundColor: "transparent", color: "white",
                        border: "1px solid white", borderRadius: "12px", }}>
                    Cancel
                </Button>
                <Button
                    type="submit" variant="contained" onClick={onSubmitReply()}
                    sx={{ ml: 2, bgcolor: "rgba(51,102,204)", borderRadius: "12px", }}>
                    Submit
                </Button>
            </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

const renderReply = (post) => {
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
                    <Avatar {...stringAvatar(post.author)} />
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

function onSubmitReply() {

}


export default function ViewPost() {
    const post = {
        author: "Bea",
        title: "This is title test",
        body: "Test body",
        time: "11/29/2022"
    };

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
                {renderPost(post)}
            </div>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "center", display: 'flex', flexDirection: 'column', marginTop: '2%'}}>
            <div style={{ marginLeft: drawerWidth }}>
                {renderCommentbox(post)}
            </div>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "center", display: 'flex', flexDirection: 'column', marginTop: '2%'}}>
            <div style={{ marginLeft: drawerWidth }}>
                {replies.map((reply) => (
                    renderReply(reply)
                ))}
            </div>
          </Box>
      </Box>
    </ThemeProvider>
  );
}