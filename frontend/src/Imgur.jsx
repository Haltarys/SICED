import { Container } from 'react-bootstrap';
import Error from './Error';
import ImageEmbed from './ImageEmbed';
import Loading from './Loading';
import useFetch from './useFetch';

const Imgur = ({ id }) => {
  const { isLoading, error, data } = useFetch(
    `http://localhost:3000/imgur/image/${id}`,
  );

  return (
    <Container fluid>
      {isLoading && <Loading msg=" Loading image from Imgur..." />}
      {error && <Error error={error} />}
      {data && <ImageEmbed src={data.data.link} />}
    </Container>
  );
};

export default Imgur;
