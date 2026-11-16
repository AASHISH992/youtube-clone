import { Dot } from "lucide-react";

function ContentMetadataViewModelMetadataRow({
  children,
  className = "h-8 mt-[2px]",
}) {
  return <div className={`flex items-center ${className}`}>{children}</div>;
}

function ContentMetadataViewModel({ children, className = "" }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

function LockupViewModelWrapper({ children }) {
  return (
    <div className="flex mb-2 flex-row justify-between items-start w-full">
      {children}
    </div>
  );
}

function LockupViewModel({ children }) {
  return <div className="flex h-23 flex-1"> {children} </div>;
}

function LockupViewModelMetadata({ children }) {
  return <div className="flex flex-row items-start justify-between w-full">{children}</div>;
}

function LockupMetadataViewModelHost({ children }) {}

function LockupMetadataViewModelTextContainer({ children }) {
  return <div className="ml-2 min-w-0 flex-1"> {children} </div>;
}

function LockupMetadataViewModelHeadingReset({ children }) {}

function LockupMetadataViewModelTitle({ children }) {}

function LockupMetadataViewModelMetadata({ children }) {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      {children}
    </div>
  );
}

function LockupMetadataViewModelMenuButton({ children }) {
  return <div>Hello</div>;
}

function ButtonShape({ children }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border p-2 border-gray-300">
      {children}
      </div>
    </div>
  );
}

{
  /* It provide href to the videos */
}
function LockupViewModelContentImage({ children }) {
  return (
    <div className="flex flex-none overflow-hidden rounded-lg pr-3">
      {children}
    </div>
  );
}

function AttributedStringWhiteSpacePreWrap({ children }) {
  return <span className="whitespace-pre-wrap">{children}</span>;
}

function MetaData({ items = [],textColor='text-gray-600', className = "text-xs" }) {
  return (
    <div className="flex items-center flex-nowrap whitespace-nowrap overflow-hidden truncate">
      {items.map((text, index) => (
        <div
          key={index}
          className="flex items-center flex-nowrap overflow-hidden"
        >
          <span className={` ${textColor} ${className} `}>{text}</span>
          {/* Render a dot after every item EXCEPT the last one */}
          {index < items.length - 1 && (
            <Dot size={9} className={`${textColor} flex-none`} />
          )}
        </div>
      ))}
    </div>
  );
}

export {
  MetaData,
  ContentMetadataViewModelMetadataRow,
  ContentMetadataViewModel,
  LockupViewModelWrapper,
  LockupViewModel,
  LockupViewModelMetadata,
  LockupMetadataViewModelHost,
  LockupMetadataViewModelTextContainer,
  LockupMetadataViewModelHeadingReset,
  LockupMetadataViewModelTitle,
  LockupMetadataViewModelMetadata,
  LockupMetadataViewModelMenuButton,
  ButtonShape,
  LockupViewModelContentImage,
  AttributedStringWhiteSpacePreWrap,
};
