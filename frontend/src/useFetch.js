import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      })
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
