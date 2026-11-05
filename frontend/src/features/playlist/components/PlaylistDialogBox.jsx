import { Globe, Check } from "lucide-react";
import {
  WebScrimHost,
  BottomSheetLayout,
  BottomSheetLayoutDragLine,
  ListItemViewModelLayoutWrapper,
  ListItemViewModelContainer,
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
} from "../../../shared/components/BottomSheetLayout.jsx";

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
  BottomSheetLayoutDragLine,
  ListItemViewModelLayoutWrapper,
  ListItemViewModelContainer,
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
