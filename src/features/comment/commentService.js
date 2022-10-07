import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments/';

// Create comment
const createComment = async (commentData) => {
  const comment = {
    username: commentData.username,
    comment: commentData.comment,
  };
  const response = await axios.post(API_URL + commentData.id, comment);
  return response.data;
};

const commentService = {
  createComment,
};

export default commentService;
