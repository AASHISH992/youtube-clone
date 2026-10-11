function AvatarShapeAvatarSizeExtraSmall({ children }) {
  return (
    <div className="w-6 h-6">
      <div className="flex items-center justify-center shrink-0 overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}
function AvatarShapeAvatarSizeSmall({ children }) {
  return (
    <div className="w-10 h-10">
      <div className="flex items-center justify-center shrink-0 overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}

function LockupMetadataViewModelAvatar({ children }) {
  return <div className="mb-3 flex w-13 flex-col h-full">{children}</div>;
}

export {
  AvatarShapeAvatarSizeExtraSmall,
  AvatarShapeAvatarSizeSmall,
  LockupMetadataViewModelAvatar,
};
