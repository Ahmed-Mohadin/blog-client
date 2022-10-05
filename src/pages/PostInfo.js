import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';

import { useParams } from 'react-router-dom';
import PostInfoCard from '../components/posts/PostInfoCard';
import useFetchSingle from '../hooks/useFetchSingle';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function PostInfo() {
  const id = useParams().id;
  const { data, error, loading } = useFetchSingle(
    `http://localhost:8080/api/posts/${id}`
  );
  if (error) {
    return null;
  }
  return (
    <Box>
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
          <PostInfoCard
            postTitle={data.title}
            postCreatedDate={new Date(data.createdAt).toDateString()}
            postUpdatedDate={new Date(data.updatedAt).toDateString()}
            postAuthor={data.author.username}
            postContent={data.content}
            postComments={data.comments}
          />
        )}
      </StyledBoxMain>
    </Box>
  );
}

export default PostInfo;
