import { stringify } from 'querystring';
import { Button, Container } from 'react-bootstrap';
import Error from './Error';
import Loading from './Loading';
import ProfileList from './ProfileList';
import useFetch from './useFetch';

const DISCORD_CLIENT_ID = '823522904246714378';
const DISCORD_CALLBACK_URL = 'http://localhost:3001/auth/discord';

const Home = () => {
  const { isLoading, error, data: profiles } = useFetch(
    'http://localhost:3000/profiles',
  );
  const url = `https://discord.com/api/oauth2/authorize?${stringify({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_CALLBACK_URL,
    response_type: 'code',
    scope: 'identify',
  })}`;

  return (
    <Container
      fluid
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading && <Loading msg=" Loading profiles..." />}
      {error && <Error error={error} />}
      {profiles && <ProfileList profiles={profiles} />}
      <Button size="lg" href={url}>
        Sign in with Discord
      </Button>
    </Container>
  );
};

export default Home;
