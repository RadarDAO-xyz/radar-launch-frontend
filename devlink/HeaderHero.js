import React from "react";
import * as _Builtin from "./_Builtin";
import { VisionOfTheWeekProject } from "./VisionOfTheWeekProject";

export function HeaderHero({
  as: _Component = _Builtin.Section,
  visionOfTheWeekSlot,
}) {
  return (
    <_Component className="header-featured" tag="section">
      <_Builtin.Block className="floating-down-arrow" tag="div">
        <_Builtin.Paragraph className="body-text larger">
          {"see curated projects ↓"}
          <br />
        </_Builtin.Paragraph>
      </_Builtin.Block>
      <_Builtin.Block className="featured-project-tabs" tag="div">
        <_Builtin.Block className="about-div home" tag="div">
          <_Builtin.Heading className="heading-5" tag="h1">
            {"SUPPORT IDEAS AND BUILDERS OF FUTURES YOU BELIEVE IN"}
          </_Builtin.Heading>
          <_Builtin.Block className="_10px-div" tag="div" />
          <_Builtin.Paragraph className="body-text larger">
            {
              "RADAR Launch is a crowdraising platform for visionary builders and early adopters acclerating better futures."
            }
            <_Builtin.Link
              button={false}
              options={{
                href: "#",
                target: "_blank",
              }}
            >
              <_Builtin.Span className="underline">{""}</_Builtin.Span>
            </_Builtin.Link>
            <br />
          </_Builtin.Paragraph>
          <_Builtin.Block className="div-block-99" tag="div">
            <_Builtin.Heading className="heading-5" tag="h1">
              {"$18,391"}
            </_Builtin.Heading>
            <_Builtin.Paragraph className="body-text larger">
              {"total funding pool to build a better future"}
              <_Builtin.Span className="arrow-diagonal">{""}</_Builtin.Span>
              <br />
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className="visionoftheweek" tag="div">
          {visionOfTheWeekSlot ?? (
            <>
              <VisionOfTheWeekProject />
              <_Builtin.Block className="div-block-101" tag="div">
                <_Builtin.Paragraph className="curator-text">
                  {"august curated by"}
                  <br />
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className="logo"
                  loading="lazy"
                  width={56}
                  height="auto"
                  src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
                />
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
