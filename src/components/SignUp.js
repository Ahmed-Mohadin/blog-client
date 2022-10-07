import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, reset } from '../features/user/userSlice';
import CircularProgress from '@mui/material/CircularProgress';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    errorUsername: '',
    errorPassword: '',
    errorConfirmPassword: '',
  });

  const { username, password, confirmPassword } = formData;
  const { errorUsername, errorPassword, errorConfirmPassword } = formError;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, status, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      if (message) {
        const errors = JSON.parse(message);
        setFormError({
          errorUsername:
            errors[0]?.param === 'username' && errors[0].msg !== ''
              ? errors[0].msg
              : '',
          errorPassword:
            errors[0]?.param === 'password' && errors[0].msg !== ''
              ? errors[0].msg
              : errors[1]?.param === 'password' && errors[1].msg !== ''
              ? errors[1].msg
              : '',
          errorConfirmPassword:
            errors[0]?.param === 'confirmPassword' && errors[0].msg !== ''
              ? errors[0].msg
              : errors[1]?.param === 'confirmPassword' && errors[1].msg !== ''
              ? errors[1].msg
              : '',
        });
      }
    }

    if (status === 'succeded' || user) {
      navigate('/blog');
    }
    dispatch(reset());
  }, [user, error, status, message, navigate, dispatch]);

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
      errorPassword: '',
      errorConfirmPassword: '',
    });
    const userData = {
      username,
      password,
      confirmPassword,
    };
    dispatch(signUp(userData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {status === 'loading' ? (
          <Box color="success">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    value={username}
                    onChange={onChange}
                  />
                  <Typography color="error">{errorUsername}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                  <Typography color="error">{errorPassword}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                  />
                  <Typography color="error">{errorConfirmPassword}</Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography
                    variant="body2"
                    component={Link}
                    to="/blog/sign-in"
                  >
                    Already have an account? Sign in
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default SignUp;
