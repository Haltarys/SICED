import { Image } from 'react-bootstrap';

const ImageEmbed = ({ src }) => {
  return <Image style={{ maxWidth: '100%', maxHeight: '100%' }} src={src} />;
};

export default ImageEmbed;
