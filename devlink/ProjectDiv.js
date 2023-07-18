import React from "react";
import * as _Builtin from "./_Builtin";
import { ProjectBlock } from "./ProjectBlock";

export function ProjectDiv({
  as: _Component = _Builtin.Section,
  allProjectsWrapperSlotWeek2,
  allprojectswrapperSlotweek1,
}) {
  return (
    <_Component className="all-projects-section" tag="section">
      <_Builtin.Block className="title-block" tag="div">
        <_Builtin.Heading className="heading-trending-launch-page" tag="h1">
          {"curated visions"}
        </_Builtin.Heading>
        <_Builtin.Block className="_10px-div" tag="div" />
        <_Builtin.Block className="div-block-103" tag="div">
          <_Builtin.Paragraph className="body-text left">
            {"every month we invite a guest curator to support 4 projects"}
            <br />
          </_Builtin.Paragraph>
          <_Builtin.Block className="subbutton no-share" tag="div">
            <_Builtin.Block className="small-text" tag="div">
              {"become a curator "}
              <_Builtin.Span className="arrow-diagonal">{"↗"}</_Builtin.Span>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="month-curated" tag="div">
        <_Builtin.Block className="allprojectsweeklywrapper" tag="div">
          {allProjectsWrapperSlotWeek2 ?? (
            <>
              <ProjectBlock />
              <ProjectBlock />
              <ProjectBlock />
              <ProjectBlock />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className="div-block-101 top" tag="div">
          <_Builtin.Paragraph className="curator-text">
            {"August curated by"}
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
      </_Builtin.Block>
      <_Builtin.Block className="_50px" tag="div" />
      <_Builtin.Block className="month-curated" tag="div">
        <_Builtin.Block className="allprojectsweeklywrapper" tag="div">
          {allprojectswrapperSlotweek1 ?? (
            <>
              <ProjectBlock />
              <ProjectBlock />
              <ProjectBlock />
              <ProjectBlock />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className="div-block-101 top" tag="div">
          <_Builtin.Paragraph className="curator-text">
            {"July curated by"}
            <br />
          </_Builtin.Paragraph>
          <_Builtin.Paragraph className="curator-name">
            {"gary sheng"}
            <br />
          </_Builtin.Paragraph>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
