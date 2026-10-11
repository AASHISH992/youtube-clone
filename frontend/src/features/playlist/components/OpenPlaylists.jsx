import {
  PageContainer,
  PageHeaderViewModel,
  PageHeaderRenderer,
  PageHeaderViewModelHost,
  PageHeaderViewModelHeadlineInfo,
  TabContent,
  SectionListHost,
  SectionListContents,
  ContentPreviewImageViewModel,
  Button,
  MetaData,
  TouchFeedback,
  ContentMetadataViewModelMetadataRow,
  AvatarShapeAvatarSizeExtraSmall,
  AttributedStringWhiteSpacePreWrap,
  ContentMetadataViewModel,
} from "../../../shared/components/index.js";
import { AttributedStringHost } from "./PlaylistDialogBox.jsx";
import { MobileTopbarHeader } from "../../../shared/layouts/index.js";
import { Videos } from "../../video/components/index.js";

import { Pencil, Trash } from "lucide-react";
import history from "../../../assets/siente_dance.jpeg";
import avatar from "../../../assets/images2.jpg";

export default function OpenPlaylists({ children }) {
  const videosList = [
    {
      id: "v1",
      thumbnail: history,
      title: "15 Books That Helped Make Me My First Million",
      channel: "Channel Name Channel Name",
      views: "10",
      uploadedDate: "10 years ago",
    },
  ];

  return (
    <PageContainer className="h-screen">
      <MobileTopbarHeader className="fixed w-full top-0">
        {children}
      </MobileTopbarHeader>

      <PageHeaderRenderer>
        <PageHeaderViewModelHost>
          <PageHeaderViewModel>
            <ContentPreviewImageViewModel>
              {history}
            </ContentPreviewImageViewModel>
            <PageHeaderViewModelHeadlineInfo>
              <h1>
                <AttributedStringHost className="text-2xl font-bold">
                  {children}
                </AttributedStringHost>
              </h1>

              <ContentMetadataViewModel>
                <ContentMetadataViewModelMetadataRow>
                  <AvatarShapeAvatarSizeExtraSmall>
                    <img src={avatar} alt="avatar" />
                  </AvatarShapeAvatarSizeExtraSmall>
                  <AttributedStringHost>NAME</AttributedStringHost>
                </ContentMetadataViewModelMetadataRow>

                <ContentMetadataViewModelMetadataRow className="h-4">
                  <AttributedStringWhiteSpacePreWrap>
                    <MetaData
                      items={["Playlist", "Private", "10 videos", "4 views"]}
                    />
                  </AttributedStringWhiteSpacePreWrap>
                </ContentMetadataViewModelMetadataRow>
              </ContentMetadataViewModel>
            </PageHeaderViewModelHeadlineInfo>

            <PageHeaderViewModelHeadlineInfo className="w-full flex justify-end">
              <Button
                type="submit"
                bgColor="bg-[#ffffff1A]"
                textColor="text-black"
              >
                <TouchFeedback>
                  <Pencil />
                </TouchFeedback>
              </Button>
              <Button
                type="submit"
                bgColor="bg-[#ffffff1A]"
                textColor="text-black"
              >
                <TouchFeedback>
                  <Trash />
                </TouchFeedback>
              </Button>
            </PageHeaderViewModelHeadlineInfo>
          </PageHeaderViewModel>
        </PageHeaderViewModelHost>
      </PageHeaderRenderer>

      {/* <BottomSheet/> */}
      {/* Videos Container */}
      <TabContent>
        <SectionListHost>
          <SectionListContents>
              <Videos videos={videosList} />
          </SectionListContents>
        </SectionListHost>
      </TabContent>
    </PageContainer>
  );
}
