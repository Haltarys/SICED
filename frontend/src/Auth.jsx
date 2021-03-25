import { Redirect } from 'react-router';
import { useLocation } from 'react-router';

const Auth = () => {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  sessionStorage.setItem('code', code);

  return <Redirect to="/" />;
};

export default Auth;
