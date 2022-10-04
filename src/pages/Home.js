import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NewPost from '../components/posts/NewPost';
import FeaturedPost from '../components/posts/FeaturedPost';

function Home() {
  return (
    <Box component={'main'}>
      <NewPost />
      <Grid container spacing={4}>
        <FeaturedPost />
        <FeaturedPost />
        <FeaturedPost />
        <FeaturedPost />
      </Grid>
    </Box>
  );
}

export default Home;
