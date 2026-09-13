import React, { useState, useRef, useEffect } from "react";
import { Globe, LockKeyhole, ChevronDown, Check } from "lucide-react";
import {
  Container,
  PanelHeaderViewModelTitleWrapper,
  ListItemViewModelLayoutWrapper,
  ListItemViewModelContainer,
  ButtonOrAnchor,
  ListItemViewModelImageContainer,
  ListItemViewModelLayoutContainer,
  WebScrimHost,
  BottomSheetLayout,
  BottomSheetLayoutDragLine,
  ListItemViewModelTitleWrapper,
  ListItemViewModelTitle,
  ListItemViewModelSubtitle,
  ListItemViewModelSubtitleContainer,
  ButtonOrAnchorHost,
} from "./index.js";
function CustomSelect() {
  return (
    <Container className="border border-gray-300 active:bg-blue-500/24 rounded-lg px-3 py-2">
      <div className="w-full flex items-start">
        <div className="flex h-full flex-col w-full items-start">
          <div className="w-full h-full flex items-start ">
            <span className="text-xs py-1 h-full text-gray-600">
              Visibility
            </span>
          </div>
          <div className="w-full items-start flex">
            <span className="">Private</span>
          </div>
        </div>
        <div className="my-3">
          <ChevronDown className="" />
        </div>
      </div>
    </Container>
  );
}

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

export { CustomSelect, BottomSheet };
