import lookup from 'country-code-lookup';
import Error from './Error';
import Loading from './Loading';
import useFetch from './useFetch';

const DateElem = ({ msg, timestamp }) => {
  const date = new Date(timestamp * 1000);

  return (
    <span>
      {msg} {date.toUTCString()}
    </span>
  );
};

const Weather = ({ city }) => {
  const { isLoading, error, data } = useFetch(
    `http://localhost:3000/weather/${city}`,
  );

  return (
    <div>
      {isLoading && <Loading msg=" Loading weather..." />}
      {error && <Error error={error} />}
      {data && (
        <div>
          {data.name}, {lookup.byIso(data.sys.country).country} <br />
          Weather:
          {/cloud/gi.test(data.weather[0].description) && '🌧 '}
          {/sun|clear/gi.test(data.weather[0].description) && '🌞 '}
          {data.weather[0].description}
          <br />
          <DateElem msg="Sunrise:" timestamp={data.sys.sunrise} />
          <br />
          <DateElem msg="Sunset:" timestamp={data.sys.sunset} />
        </div>
      )}
    </div>
  );
};

export default Weather;
