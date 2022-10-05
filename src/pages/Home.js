import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';

import NewPostCard from '../components/posts/NewPostCard';
import OldPostCard from '../components/posts/OldPostCard';

import useFetch from '../hooks/useFetch';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function Home() {
  const { data, error, loading } = useFetch('http://localhost:8080/api/posts/');

  return (
    <StyledBoxMain
      component={'main'}
      sx={{
        display: loading || error ? 'flex' : 'flexbox',
      }}
    >
      {loading && (
        <Box color="success">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography variant="h6" color="primary">
          Failed to fetch
        </Typography>
      )}
      {data && (
        <>
          {data.map((post, index) => {
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
            return (
              <Grid container spacing={4}>
                <OldPostCard
                  key={post._id}
                  postTitle={post.title}
                  postCreatedDate={new Date(post.createdAt).toDateString()}
                  postContent={post.content}
                  postLink={`/blog/posts/${post._id}`}
                />
              </Grid>
            );
          })}
        </>
      )}
    </StyledBoxMain>
  );
}

export default Home;
