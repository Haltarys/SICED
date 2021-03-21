import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  return (
    <div className="error-page">
      <h2>An error occurred</h2>
      {error && <p>{error}</p>}
      {window.location.pathname !== '/' && (
        <Link className="link" to="/">
          Go back to the homepage
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
