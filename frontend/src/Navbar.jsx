import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const SICEDNavbar = () => {
  return (
    <Navbar
      className="d-flex justify-content-around"
      bg="primary"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/">
        <h1>SICED</h1>
      </Navbar.Brand>
      <div>Système d'Information et de Contrôle d'Écran à Distance</div>
    </Navbar>
  );
};

export default SICEDNavbar;
