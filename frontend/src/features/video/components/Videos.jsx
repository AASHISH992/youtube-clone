import {Video} from "./index.js";


function Videos({ videos = [], className='' }) {
  return (
    <div className={`flex w-full flex-wrap ${className}`}>
      {videos.map((video) => (
        <Video
          key={video.id}
          id={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          channel={video.channel}
          views={video.views}
          uploadedTime={video.uploadedTime}
          avatar={video.avatar}
          duration={video.duration}
        />
      ))}
    </div>
  );
}
export default Videos;
