import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import PostInfoCard from '../components/posts/PostInfoCard';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePost, reset } from '../features/post/postSlice';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function PostInfo() {
  const id = useParams().id;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { posts, error, status, message } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(fetchSinglePost(id));
    return () => {
      dispatch(reset());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error, message, id, dispatch]);

  return (
    <Box>
      <StyledBoxMain
        component={'main'}
        sx={{
          display: status !== 'succeeded' ? 'flex' : 'flexbox',
        }}
      >
        {status === 'loading' ? (
          <Box color="success">
            <CircularProgress />
          </Box>
        ) : null}
        {status === 'failed' ? (
          <Typography variant="h6" color="primary">
            Failed to fetch
          </Typography>
        ) : null}
        {posts && (
          <PostInfoCard
            user={user}
            postTitle={posts[0]?.title}
            postCreatedDate={new Date(posts[0]?.createdAt).toDateString()}
            postUpdatedDate={new Date(posts[0]?.updatedAt).toDateString()}
            postAuthor={posts[0]?.author.username}
            postContent={posts[0]?.content}
            postComments={posts[0]?.comments}
          />
        )}
      </StyledBoxMain>
    </Box>
  );
}

export default PostInfo;
