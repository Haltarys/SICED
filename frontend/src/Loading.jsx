import { Button, Spinner } from 'react-bootstrap';

const Loading = ({ msg }) => {
  return (
    <Button variant="secondary" size="lg" block disabled>
      <Spinner as="span" animation="border" variant="light" /> {msg}
    </Button>
  );
};

export default Loading;
