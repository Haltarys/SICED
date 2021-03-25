import { Redirect } from 'react-router';
import Error from './Error';
import Loading from './Loading';
import useFetch from './useFetch';

const DiscordProfile = () => {
  const code = sessionStorage.getItem('code');

  if (!code) {
    <Redirect to="/" />;
  }
  const { isLoading, error, data } = useFetch(
    `http://localhost:3000/auth/discord?code=${code}`,
  );

  return (
    <div className="discord">
      {isLoading && <Loading msg=" Loading Discord profile..." />}
      {error && <Error error={error} />}
      {data && (
        <div className="discord">
          <img
            src={`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=128`}
            alt=""
          />
          {data.username}
        </div>
      )}
    </div>
  );
};

export default DiscordProfile;
