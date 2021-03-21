import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>SICED</h1>
      </Link>
      <h2>Système d'Information et de Contrôle d'Écran à Distance</h2>
    </nav>
  );
};

export default Navbar;
