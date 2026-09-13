import {
  PageContainer,
  PageHeaderViewModel,
  PageHeaderRenderer,
  PageHeaderViewModelHost,
  PageHeaderViewModelHeadlineInfo,
  ContentPreviewImageViewModel,
  AllVideos,
  MobileTopbarHeader,
  Button,
  MetaData,
  TouchFeedback,
  ContentMetadataViewModelMetadataRow,
  AvatarShapeAvatarSizeExtraSmall,
  AttributedStringHost,
  AttributedSTringWhiteSpacePreWrap,
  ContentMetadataViewModel,
} from "../../index.js";

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

    {
      id: "v2",
      thumbnail: history,
      title: "15 Books That Helped Make Me My First Million",
      channel: "Channel Name",
      views: "10",
      uploadedDate: "6 years ago",
    },

    {
      id: "v3",
      thumbnail: history,
      title: "15 Books That Helped Make Me My First Million",
      channel: "Channel Name",
      views: "10",
      uploadedDate: "6 years ago",
    },

    {
      id: "v4",
      thumbnail: history,
      title: "15 Books That Helped Make Me My First Million",
      channel: "Channel Name",
      views: "10",
      uploadedDate: "6 years ago",
    },
    {
      id: "v5",
      thumbnail: history,
      title: "15 Books That Helped Make Me My First Million",
      channel: "Channel Name",
      views: "10",
      uploadedDate: "6 years ago",
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
                  <AttributedSTringWhiteSpacePreWrap>
                    <MetaData
                      items={["Playlist", "Private", "10 videos", "4 views"]}
                    />
                  </AttributedSTringWhiteSpacePreWrap>
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
      <div className="px-4 pb-18">
        <AllVideos videos={videosList} />
      </div>

    </PageContainer>
  );
}
