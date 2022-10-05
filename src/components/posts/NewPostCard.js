import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

function NewPost({ postTitle, postContent, postLink }) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://st2.depositphotos.com/1420973/6409/i/600/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={
            'https://st2.depositphotos.com/1420973/6409/i/600/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg'
          }
          alt={'post imag'}
        />
      }
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {postTitle}
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {postContent}
            </Typography>
            <StyledButton variant="contained" component={Link} to={postLink}>
              Continue reading…
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NewPost;
