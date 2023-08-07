import React from "react";
import * as _Builtin from "./_Builtin";
import { getCountdown } from "@/lib/utils";
import HoverVideoPlayer from "react-hover-video-player";
import { useGetProject } from "@/hooks/useGetProject";
import { generateHoverVideoLink } from "@/lib/generateHoverVideoLink";

export function VisionOfTheWeekProject({ projectId }) {
  const { data } = useGetProject(projectId);
  return (
    <_Builtin.Block className="featured-project-wrapper" tag="div">
      <_Builtin.Paragraph className="mobile-subtitle">
        {"Featured Project"}
      </_Builtin.Paragraph>
      <_Builtin.Block
        className="floating-weekly-featured full !bg-gray-600/30"
        tag="div"
      >
        {"✨ DROP OF THE WEEK ✨"}
      </_Builtin.Block>
      <_Builtin.Block className="project-image" tag="div">
        <HoverVideoPlayer
          focused
          loop
          videoSrc={
            data?.video_url
              ? generateHoverVideoLink(data.video_url)
              : "/RL1.mp4"
          }
          className="!hidden md:!inline-block"
        />
      </_Builtin.Block>
      <_Builtin.Block className="feature-project-div" tag="div">
        <_Builtin.Block className="_20px-div" tag="div" />
        <_Builtin.Link
          className="link-block-3"
          button={false}
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="div-block-97" tag="div">
            <_Builtin.Paragraph className="featured-project-title font-bolded text-2xl leading-7">
              {data?.title || "FUTURES DROP #1"}
            </_Builtin.Paragraph>
            <_Builtin.Block className="arrow-diagonal" tag="div">
              {"↗"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        {/* <_Builtin.Block className="featured-project-bio" tag="div">
          <_Builtin.Paragraph className="project-byline">
            {"byline"}
          </_Builtin.Paragraph>
        </_Builtin.Block> */}
        {data?.description && (
          <p className="text-xs text-gray-700">{data.description}</p>
        )}
        <_Builtin.Block className="_10px-div" tag="div" />
        <_Builtin.Block
          className="collect-wrapper main flex justify-center bottom-1 md:bottom-[5%] pt-3"
          tag="div"
        >
          <_Builtin.Block className="text-xs text-gray-400" tag="div">
            {getCountdown(new Date("2023-08-03T23:00:00+02:00"))} until drop
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Builtin.Block>
  );
}
