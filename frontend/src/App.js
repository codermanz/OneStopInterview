import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  InterviewPage,
  Login,
  ResumeTips,
  Roadmap,
  Registration,
  Checkpoints,
  Error,
} from "./pages";
import Jobs from "./pages/Jobs"
import Forums from "./pages/Forums";
import PostList from "./pages/PostList";
import MyPostList from "./pages/MyPostList";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import { Navbar, Logout, Loader } from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import axiosInstance from "./axios";

function App() {
  const [appState, setAppState] = useState({
    username: null,
    progress: null,
  });
  const [loading, setLoading] = useState(true);

  const getUserInfo = () => {
    axiosInstance
      .get(`/user/userInfo/`)
      .then((res) => {
        const result = res.data;
        setAppState({
          username: result.user_name,
          progress: result.progress_percentage,
        });
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <CssBaseline />
      <Router>
        <div className="bg-dark-bg">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Navbar state={appState} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<Login setState={setAppState} />}
                />
                <Route
                  path="/interview"
                  element={<InterviewPage state={appState} />}
                />
                <Route path="/forums" element={<Forums />} />
                <Route path="/forums/posts" element={<PostList state={appState} />} />
                <Route path="/forums/myposts" element={<MyPostList state={appState} />} />
                <Route path="/forums/posts/:id" element={<Post state={appState} />} />
                <Route path="/forums/addpost" element={<AddPost state={appState} />} />
                <Route path="/forums/editpost" element={<EditPost state={appState} />} />
                <Route path="/resume-tips" element={<ResumeTips />} />
                <Route path="/resume-tips/checkpoints" element={<Checkpoints />} />
                <Route path="/jobs" element={<Jobs state={appState}/>}/>
                <Route path="/roadmap" element={<Roadmap state={appState} />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/logout" element={<Logout setState={setAppState} />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
