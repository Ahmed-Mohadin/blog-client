import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

// Sign up user
const signUp = async (userData) => {
  const response = await axios.post(API_URL + 'sign-up', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Sign in user
const signIn = async (userData) => {
  const response = await axios.post(API_URL + 'sign-in', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Sign out user
const signOut = () => {
  localStorage.removeItem('user');
};

const userService = {
  signUp,
  signOut,
  signIn,
};

export default userService;
