import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import useFetch from './useFetch';

const Home = () => {
  const { isLoading, error, data: profiles } = useFetch(
    'http://localhost:3000/profiles',
  );

  return (
    <div className="home">
      {isLoading && <div>Loading profiles...</div>}
      {error && <ErrorPage error={error} />}
      <div className="profiles">
        {profiles &&
          profiles.map((profile) => (
            <Link
              className="link"
              key={profile.name}
              to={'/profiles/' + profile.name}
            >
              <div>{profile.name}</div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
