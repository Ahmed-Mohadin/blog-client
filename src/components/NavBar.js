import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StyledLogoButton = styled(StyledButton)(({ theme }) => ({
  display: 'none',
  fontSize: '2rem',
  paddingBlock: theme.spacing(0),
  textTransform: 'none',
}));

function Navbar() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <StyledLogoButton
          sx={{ display: { sm: 'block' } }}
          component={Link}
          to={'/blog'}
        >
          Blog
        </StyledLogoButton>
        <StyledLogoButton
          sx={{ display: { xs: 'block', sm: 'none' } }}
          component={Link}
          to={'/blog'}
        >
          B
        </StyledLogoButton>
        <Box>
          <StyledButton
            variant="outlined"
            component={Link}
            to={'/blog/sign-up'}
          >
            Sign Up
          </StyledButton>
          <StyledButton
            variant="outlined"
            component={Link}
            to={'/blog/sign-in'}
          >
            Sign In
          </StyledButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
