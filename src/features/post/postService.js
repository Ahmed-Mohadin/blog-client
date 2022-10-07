import axios from 'axios';

const API_URL = 'http://localhost:8080/api/posts/';

// Fetch all posts
export const fetchAllPosts = async () => {
  const response = await axios.get(API_URL);
  let data = response.data;
  data = data.posts.filter((post) => post.published !== false);
  return data;
};

// Fetch single post
export const fetchSinglePost = async (id) => {
  const response = await axios.get(API_URL + id);
  const data = response.data;
  return data.post;
};

const postService = {
  fetchAllPosts,
  fetchSinglePost,
};

export default postService;
