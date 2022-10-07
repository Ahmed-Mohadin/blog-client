import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';

import NewPostCard from '../components/posts/NewPostCard';
import OldPostCard from '../components/posts/OldPostCard';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, reset } from '../features/post/postSlice';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { posts, error, status, message } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    dispatch(fetchAllPosts());

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <StyledBoxMain
      component={'main'}
      sx={{
        display: status !== 'succeeded' ? 'flex' : 'flexbox',
      }}
    >
      <Typography variant="h6" align="center">
        Welcome {user && user.user.username}
      </Typography>
      {status === 'loading' ? (
        <Box color="success">
          <CircularProgress />
        </Box>
      ) : null}
      {status === 'failed' ? (
        <>
          <Typography variant="h6" color="primary" align="center">
            Failed to fetch
            <br />
            {message}
          </Typography>
        </>
      ) : null}
      {posts && (
        <>
          {posts.map((post, index) => {
            if (index === 0) {
              return (
                <NewPostCard
                  key={post._id}
                  postTitle={post.title}
                  postContent={post.content}
                  postLink={`/blog/posts/${post._id}`}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {posts && (
        <Grid container spacing={4}>
          {posts.map((post, index) => {
            if (index === 0) return null;
            return (
              <OldPostCard
                key={post._id}
                postTitle={post.title}
                postCreatedDate={new Date(post.createdAt).toDateString()}
                postContent={post.content}
                postLink={`/blog/posts/${post._id}`}
              />
            );
          })}
        </Grid>
      )}
    </StyledBoxMain>
  );
}

export default Home;
