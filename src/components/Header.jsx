import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow-md">
      <Link to="/" className="text-blue-600 hover:underline">Accueil</Link>
      <Link to="/upload" className="text-blue-600 hover:underline">Upload</Link>
      <Link to="/register" className="text-blue-600 hover:underline">Se connecter</Link>
    </nav>
  );
}

