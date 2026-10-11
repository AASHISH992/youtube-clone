function DescriptionPreviewViewModel({ children }) {
  return <div>{children}</div>;
}

function DescriptionPreviewViewModelHost({ children }) {
  return <div> {children}</div>;
}

function DescriptionPreviewViewModelDescription({ children }) {
  <div>{children}</div>;
}

function DescriptionPreviewViewModelIsOverlayVisible({ children }) {
  return <div>{children}</div>;
}

function ContentPreviewImageViewModel({ children }) {
  return <img src={children} alt="content preview" className="rounded-lg" />;
}

export {
  DescriptionPreviewViewModel,
  DescriptionPreviewViewModelHost,
  DescriptionPreviewViewModelDescription,
  DescriptionPreviewViewModelIsOverlayVisible,
  ContentPreviewImageViewModel,
};
