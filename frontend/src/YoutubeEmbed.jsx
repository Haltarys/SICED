export const extractYoutubeID = (url) => {
  const regex1 = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]{11})/g;
  const regex2 = /https:\/\/youtu\.be\/([a-zA-Z0-9\-_]{11})/g;
  const match = regex1.exec(url) || regex2.exec(url);

  return match ? match[1] : null;
};

const YoutubeEmbed = ({ url, autoplay, loop, fill }) => {
  const id = extractYoutubeID(url);

  // return <div>{url}</div>;
  return (
    <iframe
      className="youtube-embed"
      src={`https://www.youtube.com/embed/${id}?autoplay=${Number(
        autoplay,
      )}&loop=${Number(loop)}&playlist=${id}`}
      frameBorder="0"
      allowFullScreen
      title="Embedded youtube"
    />
  );
};

export default YoutubeEmbed;
