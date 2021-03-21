import { Fragment } from 'react';
import { useParams } from 'react-router';
import ErrorPage from './ErrorPage';
import useFetch from './useFetch';
import Widget from './Widget';

const Profile = () => {
  const { name } = useParams();
  const { isLoading, error, data: profile } = useFetch(
    `http://localhost:3000/profiles/${name}`,
  );

  console.log(profile);

  return (
    <div className="profile">
      {isLoading && <div>Loading profile...</div>}
      {error && <ErrorPage error={error} />}
      {profile && (
        <Fragment>
          <div className="profile-name">{profile.name}</div>
          <Widget widget={profile.widget} depth={0} />
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
