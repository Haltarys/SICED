import DiscordProfile from './DiscordProfile';
import ImageEmbed from './ImageEmbed';
import Imgur from './Imgur';
import Weather from './Weather';
import YoutubeEmbed from './YoutubeEmbed';

const Widget = ({ widget, depth }) => {
  if (widget.type === 'split-vertical') {
    return (
      <div className={`widget split-vertical depth-${depth % 3}`}>
        <Widget widget={widget.left} depth={depth + 1} />
        <Widget widget={widget.right} depth={depth + 1} />
      </div>
    );
  } else if (widget.type === 'split-horizontal') {
    return (
      <div className={`widget split-horizontal depth-${depth % 3}`}>
        <Widget widget={widget.top} depth={depth + 1} />
        <Widget widget={widget.bottom} depth={depth + 1} />
      </div>
    );
  } else {
    return (
      <div className={`widget depth-${depth % 3}`}>
        {widget.type === 'image' && <ImageEmbed src={widget.data} />}
        {widget.type === 'imgur' && <Imgur id={widget.data} />}
        {widget.type === 'youtube' && (
          <YoutubeEmbed url={widget.data} autoplay={true} loop />
        )}
        {widget.type === 'discord' && <DiscordProfile />}
        {widget.type === 'weather' && <Weather city={widget.data} />}
      </div>
    );
  }
};

export default Widget;
