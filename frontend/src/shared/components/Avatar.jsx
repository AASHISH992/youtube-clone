function AvatarShapeAvatarSizeExtraSmall({ children, className='' }) {
  return (
    <div className=" size-6">
      <div className="flex items-center justify-center shrink-0 overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}
function AvatarShapeAvatarSizeSmall({
  children,
  className = "flex items-center justify-center shrink-0 overflow-hidden rounded-full",
}) {
  return (
    <div className="size-10 ">
      <div className={`${className}`}>{children}</div>
    </div>
  );
}

function LockupMetadataViewModelAvatar({
  children,
  className = "mb-3 flex w-13 flex-col h-full",
}) {
  return <div className={` ${className}   `}>{children}</div>;
}

export {
  AvatarShapeAvatarSizeExtraSmall,
  AvatarShapeAvatarSizeSmall,
  LockupMetadataViewModelAvatar,
};
