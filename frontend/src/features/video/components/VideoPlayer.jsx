function VideoPlayer({ videoFile, thumbnail }) {
  return (
      <video
      key={videoFile}
      src={videoFile}
      poster={thumbnail}
      controls
      className="w-full aspect-video rounded-xl bg-black/40"
      />
  );
}

export { VideoPlayer };
