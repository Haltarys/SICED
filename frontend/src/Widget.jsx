import { Fragment } from 'react';
import ImageEmbed from './ImageEmbed';
import YoutubeEmbed from './YoutubeEmbed';

const isSplitWidget = (type) => type.startsWith('split');

const Widget = ({ widget, depth }) => {
  depth = depth % 3;
  const isSplit = isSplitWidget(widget.type);

  // return <div>{widget.type}</div>;

  return (
    <div className={`widget depth-${depth} widget-${widget.type}`}>
      {isSplit ? (
        <Fragment>
          <Widget widget={widget.left} depth={depth + 1} />
          <Widget widget={widget.right} depth={depth + 1} />
        </Fragment>
      ) : (
        <div className="leaf">
          {widget.type === 'image' && <ImageEmbed src={widget.data} />}
          {widget.type === 'youtube' && (
            <YoutubeEmbed url={widget.data} autoplay={false} loop />
          )}
        </div>
      )}
    </div>
  );
};
export default Widget;
