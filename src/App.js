import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/upload">Upload</Link>
        <p> </p>
        <Link to="/register">Se connecter</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;