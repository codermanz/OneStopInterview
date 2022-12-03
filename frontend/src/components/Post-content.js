import { React, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api";


function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
}

const renderPost = (post) => {
  return (
    <>
      <Grid item key={post} xs={12} sm={12} md={12} 
            sx={{position: 'flex', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Box sx={{ 
          width: "80%",
          height: "100%",
          backgroundColor: "#101F33",
          color: "white",
          border: "1px solid white",
          borderRadius: "12px", }}>
          <Grid container spacing={2} alignItems="center" padding={1} >
            <Grid item>
              <Avatar {...stringAvatar(post.author)} />
              </Grid>
              <Grid item xs sx= {{ flexDirection: "column", display: "flex" }}>
              <Typography variant="subtitle1" >{post.author}</Typography>
              <Typography variant="body2">{post.time}</Typography>
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
            <Button size="large" href="/forums/post">View</Button>
            <Button size="large">Edit</Button>
          </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

export default function Content() {
  const [posts, setPosts] = useState([
    {author: "Bea",
      title: "This is Title Test1",
      body: "Test body",
      time: "11/29/2022"},
    {author: "Team1",
      title: "This is Title Test2",
      body: "Test body",
      time: "11/30/2022"}
  ]);

        /*
  const getPosts = async () => {
    axios ({
      method: "get",
      url: baseURL+"/posts/",
    })
      .then(function (res) {
        console.log("Trying to get posts.");
        const result = res.data;
        console.log(result);
        setPosts(result);
      
        response.data.results.forEach(result=> {
          if (result.user.email == email) {
            setPosts(posts => [...posts, result]);
          }
        });
      })
      .catch(function (res) {
        console.error(res);
    });
  }
   
  useEffect(() => {
    getPosts();
  }, []);

        */

  return (
    <main>
      <Container maxWidth="100%" >
        <Grid container spacing={4} >
        {posts.map((post) => (
          renderPost(post)
        ))}
        </Grid>
      </Container>
    </main>   
  );
}