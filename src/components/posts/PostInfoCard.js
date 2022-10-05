// import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';

import CommentCard from '../comments/CommentCard';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PostInfo({
  postTitle,
  postCreatedDate,
  postUpdatedDate,
  postAuthor,
  postContent,
  postComments,
}) {
  return (
    <>
      <Card sx={{ maxWidth: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image="https://st2.depositphotos.com/1420973/6409/i/600/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h3">
            {postTitle}
          </Typography>
          <Typography gutterBottom component="span" sx={{ marginRight: 1 }}>
            By:
          </Typography>
          <Typography gutterBottom component="span" fontWeight={'bold'}>
            {capitalizeFirstLetter(postAuthor)}
          </Typography>
          <Box sx={{ marginBlock: 1 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Typography variant="body2" component={'span'} color="text.secondary">
            Created: {postCreatedDate}
          </Typography>
          <Typography component={'span'} sx={{ marginInline: 1 }}>
            |
          </Typography>
          <Typography variant="body2" component={'span'}>
            Updated: {postUpdatedDate}
          </Typography>
          <Box sx={{ marginBlock: 1 }}></Box>
          <Typography variant="body2" color="text.secondary">
            {postContent}
          </Typography>
        </CardContent>
      </Card>
      <Container component="section" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CommentIcon />
          </Avatar>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              autoComplete="off"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              autoComplete="off"
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              multiline
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Comment
            </Button>
          </Box>
        </Box>
      </Container>
      <Typography
        variant="body1"
        component={'h6'}
        gutterBottom
        sx={{ marginLeft: 2 }}
      >
        Comments ({postComments.length})
      </Typography>
      {postComments.length > 0
        ? postComments.map((comment, index) => {
            return (
              <CommentCard
                key={comment._id}
                commentUsername={comment.username}
                commentComment={comment.comment}
                commentCreatedAt={new Date(comment.createdAt).toDateString()}
              />
            );
          })
        : null}
    </>
  );
}

export default PostInfo;
