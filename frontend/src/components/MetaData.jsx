import { Dot } from "lucide-react";

function ContentMetadataViewModelMetadataRow({ children, className = "h-8" }) {
  return (
    <div className={`mt-[2px] flex items-center ${className}`}>{children}</div>
  );
}

function ContentMetadataViewModel({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

function AvatarShapeAvatarSizeExtraSmall({ children }) {
  return (
    <div className="w-6 h-6">
      <div className="flex items-center justify-center shrink-0 overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}

function LockupViewModelWrapper({ children }) {
  return <div className="mb-4"> {children} </div>;
}

function LockupViewModel({ children }) {}

function LockupViewModelMetadata({ children }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

function LockupMetadataViewModelHost({ children }) {}

function LockupMetadataViewModelTextContainer({ children }) {}

function LockupMetadataViewModelHeadingReset({ children }) {}

function LockupMetadataViewModelTitle({ children }) {}

function LockupMetadataViewModelMetadata({ children }) {}

function LockupMetadataViewModelMenuButton({ children }) {}

function ButtenViewModel({ chilren }) {}

function LockupViewModelContentImage({ children }) {}

function AttributedSTringWhiteSpacePreWrap({ children }) {
  return <span className="whitespace-pre-wrap">{children}</span>;
}

function MetaData({ items = [] }) {
  return (
    <div className="flex items-center">
      {items.map((text, index) => (
        <div key={index} className="flex items-center">
          <AttributedSTringWhiteSpacePreWrap>
            <p className="text-xs text-[#606060] ">{text}</p>
          </AttributedSTringWhiteSpacePreWrap>

          {/* Render a dot after every item EXCEPT the last one */}
          {index < items.length - 1 && (
            <Dot size={9} className="text-gray-600 flex-none" />
          )}
        </div>
      ))}
    </div>
  );
}

export {
  MetaData,
  ContentMetadataViewModelMetadataRow,
  AvatarShapeAvatarSizeExtraSmall,
  AttributedSTringWhiteSpacePreWrap,
  ContentMetadataViewModel,
};
