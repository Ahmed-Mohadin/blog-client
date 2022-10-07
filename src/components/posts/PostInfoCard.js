import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';

import CommentCard from '../comments/CommentCard';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, reset } from '../../features/comment/commentSlice';

function capitalizeFirstLetter(string) {
  // eslint-disable-next-line eqeqeq
  if (string == null || string == undefined) {
    return string;
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function PostInfo({
  user,
  postTitle,
  postCreatedDate,
  postUpdatedDate,
  postAuthor,
  postContent,
  postComments,
}) {
  const id = useParams().id;

  const [formData, setFormData] = useState({
    username: user ? user.user.username : '',
    comment: '',
  });

  const [formError, setFormError] = useState({
    errorUsername: '',
    errorComment: '',
  });

  const { username, comment } = formData;
  const { errorUsername, errorComment } = formError;

  const dispatch = useDispatch();
  const { comments, error, status, message } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    if (error) {
      if (message) {
        const errors = JSON.parse(message);
        setFormError({
          errorUsername:
            errors[0]?.param === 'username' && errors[0].msg !== ''
              ? errors[0].msg
              : errors[1]?.param === 'username' && errors[1].msg !== ''
              ? errors[1].msg
              : '',
          errorComment:
            errors[0]?.param === 'comment' && errors[0].msg !== ''
              ? errors[0].msg
              : errors[1]?.param === 'comment' && errors[1].msg !== ''
              ? errors[1].msg
              : '',
        });
      }
    }

    if (status === 'succeeded') {
      window.location.reload();
    }

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postComments, comments, id, error, status, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError({
      errorUsername: '',
      errorComment: '',
    });
    const commentData = {
      id,
      username,
      comment,
    };
    dispatch(createComment(commentData));
  };

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
      <Container component="section" maxWidth="xs">
        <Box
          sx={{
            marginBlock: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CommentIcon />
          </Avatar>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={onChange}
                  value={username}
                />
                <Typography color="error">{errorUsername}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
                  id="comment"
                  label="Comment"
                  name="comment"
                  multiline
                  onChange={onChange}
                  value={comment}
                />
                <Typography color="error">{errorComment}</Typography>
              </Grid>
            </Grid>
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
        Comments ({postComments?.length})
      </Typography>
      {postComments?.length > 0
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
