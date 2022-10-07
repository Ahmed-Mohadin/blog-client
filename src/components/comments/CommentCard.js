import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CommentCard({ commentUsername, commentComment, commentCreatedAt }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: '0.5rem' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {commentUsername}
        </Typography>
        <Typography variant="h6" component="h5">
          {commentComment}
        </Typography>
        <Typography variant="body2">{commentCreatedAt}</Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
