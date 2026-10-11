import React from "react";
import { Globe, LockKeyhole } from "lucide-react";
import {
  WebScrimHost,
  BottomSheetLayout,
  BottomSheetLayoutDragLine,
  ListItemViewModelLayoutWrapper,
  ListItemViewModelContainer,
  ListItemViewModelLayoutContainer,
  ListItemViewModelImageContainer,
  ButtonOrAnchor,
  ButtonOrAnchorHost,
  ListItemViewModelTitleWrapper,
  ListItemViewModelTitle,
  ListItemViewModelSubtitle,
  ListItemViewModelSubtitleContainer,
  PanelHeaderViewModelTitleWrapper,
} from "./BottomSheetLayout.jsx";

const VISIBILITY_OPTIONS = [
  {
    id: "public",
    title: "Public",
    subtitle: "Anyone can search for and view",
    icon: Globe,
  },
  {
    id: "private",
    title: "Private",
    subtitle: "Only you can view",
    icon: LockKeyhole,
  },
];

function BottomSheet() {
  return (
    <WebScrimHost>
      <BottomSheetLayout>
        <BottomSheetLayoutDragLine></BottomSheetLayoutDragLine>

        <PanelHeaderViewModelTitleWrapper>
          Visibility
        </PanelHeaderViewModelTitleWrapper>

        <ListItemViewModelLayoutWrapper>
          {VISIBILITY_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <ListItemViewModelContainer key={option.id}>
                <ButtonOrAnchor>
                  <ListItemViewModelLayoutContainer>
                    <ListItemViewModelImageContainer>
                      <Icon />
                    </ListItemViewModelImageContainer>

                    <ButtonOrAnchorHost>
                      <ListItemViewModelTitleWrapper>
                        <ListItemViewModelTitle>
                          {option.title}
                        </ListItemViewModelTitle>
                      </ListItemViewModelTitleWrapper>

                      <ListItemViewModelSubtitleContainer>
                        <ListItemViewModelSubtitle>
                          {option.subtitle}
                        </ListItemViewModelSubtitle>
                      </ListItemViewModelSubtitleContainer>
                    </ButtonOrAnchorHost>
                  </ListItemViewModelLayoutContainer>
                </ButtonOrAnchor>
              </ListItemViewModelContainer>
            );
          })}
        </ListItemViewModelLayoutWrapper>
      </BottomSheetLayout>
    </WebScrimHost>
  );
}

export { BottomSheet, VISIBILITY_OPTIONS };
export default BottomSheet;
