import { useParams } from 'react-router';
import Error from './Error';
import Widget from './Widget';
import useFetch from './useFetch';
import { Button, Container, Row } from 'react-bootstrap';
import Loading from './Loading';

const Profile = () => {
  const { name } = useParams();
  const { isLoading, error, data: profile } = useFetch(
    `http://localhost:3000/profiles/${name}`,
  );

  return (
    <Container fluid className="h-100">
      <Row>
        {isLoading && <Loading msg="Loading profile..." />}
        {error && <Error error={error} />}
      </Row>
      {profile && (
        <>
          <Row>
            {profile.name && (
              <Button variant="secondary" size="lg" block disabled>
                {profile.name}
              </Button>
            )}
          </Row>
          <div className="base" style={{ backgroundColor: 'grey' }}>
            <Widget widget={profile.widget} depth={0} />
          </div>
        </>
      )}
    </Container>
  );
};

export default Profile;
