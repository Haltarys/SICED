const ImageEmbed = ({ src }) => {
  return (
    <img
      className="image-embed"
      src={src}
      alt={`Could not load image at ${src}`}
    />
  );
};

export default ImageEmbed;
