import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error = ({ error }) => {
  const isHome = window.location.pathname === '/';

  return (
    <Card
      className="text-center"
      border="danger"
      text="danger"
      style={{ width: '18rem' }}
    >
      <Card.Header>An error occurred</Card.Header>
      <Card.Body>
        {error && <Card.Text>{error}</Card.Text>}
        {!isHome && (
          <Button as={Link} to="/" variant="outline-danger">
            Go back to the homepage
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Error;
