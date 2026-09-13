import {Container, Button} from "../index.js";
import { Globe, Check } from "lucide-react";

function PanelHeaderViewModelTitleWrapper({ children, className }) {
  return (
    <div className="w-full h-12 px-4 py-2">
      <span className={`text-lg text-bold ${className}`}>{children}</span>
    </div>
  );
}

function ListItemViewModelLayoutWrapper({ children }) {
  return <div className=" border-t border-gray-300">{children}</div>;
}

function ListItemViewModelContainer({ children }) {
  return <ul className=" flex-0 flex-col w-full items-start">{children}</ul>;
}

function ButtonOrAnchor({ children }) {
  return (
    <li className="w-full">
      <Button
        type="submit"
        bgColor="bg-[#ffffff1A]"
        textColor="text-black"
        className="rounded-none py-1 px-3 antailiased w-full flex"
      >
        {children}
      </Button>
    </li>
  );
}

function BottomSheetLayoutHeaderWrapper({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

function AttributedStringHost({ children, className }) {
  return <span className={className}>{children}</span>;
}

function ListItemViewModelTitleWrapper({ children }) {
  return <div className="w-full items-start flex">{children}</div>;
}

function ListItemViewModelTitle({ children }) {
  return <span className="">{children}</span>;
}

function ListItemViewModelSubtitle({ children }) {
  return <span className="text-xs py-1 h-full text-gray-600">{children}</span>;
}

function ListItemViewModelSubtitleContainer({ children }) {
  return <div className="w-full h-full flex items-start ">{children}</div>;
}

function ButtonOrAnchorHost({ children }) {
  return (
    <div className="flex h-full flex-col w-full items-start">{children}</div>
  );
}

function WebScrimHost({ children, className }) {
  return (
    <Container
      className={`bg-black/50 fixed inset-0 w-screen z-40 ${className}`}
    >
      {children}
    </Container>
  );
}

function BottomSheetLayoutDragLine({ className }) {
  return (
    <div
      className={`mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300 ${className}`}
    ></div>
  );
}

function ListItemViewModelLayoutContainer({ children }) {
  return <div className="w-full flex items-start">{children}</div>;
}

function ListItemViewModelImageContainer({ children }) {
  return <div className="mx-2 my-3">{children}</div>;
}

function BottomSheetLayout({ children }) {
  return (
    <div className="absolute bottom-6 left-4 right-4 z-40 rounded-lg bg-white ">
      {children}
    </div>
  );
}

function PlaylistDialogBox() {
  return (
    <WebScrimHost>
      <BottomSheetLayout>
        <BottomSheetLayoutDragLine></BottomSheetLayoutDragLine>

        <PanelHeaderViewModelTitleWrapper>
          Visibility
        </PanelHeaderViewModelTitleWrapper>

        <ListItemViewModelLayoutWrapper>
          <ListItemViewModelContainer>
            <ButtonOrAnchor>
              <ListItemViewModelLayoutContainer>
                <ListItemViewModelImageContainer>
                  <Globe />
                </ListItemViewModelImageContainer>

                <ButtonOrAnchorHost>
                  <ListItemViewModelTitleWrapper>
                    <ListItemViewModelTitle>Public</ListItemViewModelTitle>
                  </ListItemViewModelTitleWrapper>

                  <ListItemViewModelSubtitleContainer>
                    <ListItemViewModelSubtitle>
                      Anyone can search for and view
                    </ListItemViewModelSubtitle>
                  </ListItemViewModelSubtitleContainer>
                </ButtonOrAnchorHost>

                <ListItemViewModelImageContainer>
                  <Check />
                </ListItemViewModelImageContainer>
              </ListItemViewModelLayoutContainer>
            </ButtonOrAnchor>
          </ListItemViewModelContainer>
        </ListItemViewModelLayoutWrapper>
      </BottomSheetLayout>
    </WebScrimHost>
  );
}

export {
  PlaylistDialogBox,
  WebScrimHost,
  BottomSheetLayout,
  ListItemViewModelLayoutWrapper,
  ListItemViewModelContainer,
  BottomSheetLayoutDragLine,
  ListItemViewModelLayoutContainer,
  ListItemViewModelImageContainer,
  ButtonOrAnchor,
  BottomSheetLayoutHeaderWrapper,
  AttributedStringHost,
  ListItemViewModelTitleWrapper,
  ListItemViewModelTitle,
  ListItemViewModelSubtitle,
  ListItemViewModelSubtitleContainer,
  ButtonOrAnchorHost,
  PanelHeaderViewModelTitleWrapper,
};
