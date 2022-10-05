import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostInfo from './pages/PostInfo';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Container sx={{ marginTop: '2rem', paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/blog" element={<Home />} />
          <Route path="/blog/sign-up" element={<SignUp />} />
          <Route path="/blog/sign-in" element={<SignIn />} />
          <Route path="/blog/posts/:id" element={<PostInfo />} />
          <Route path="*" element={<Navigate to="/blog" replace />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
