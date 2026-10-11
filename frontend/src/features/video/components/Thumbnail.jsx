function ThumbnailViewModelImage({ children }) {
  return (
    <img
      src={children}
      alt="thumbnail"
      className="flex w-40 h-24 object-cover rounded-lg flex-none"
    />
  );
}

function ThumbnailBottomOverlayViewModel({ children }) {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden bg-neutral-800  ">
      {children}
    </div>
  );
}

export { ThumbnailViewModelImage, ThumbnailBottomOverlayViewModel };
