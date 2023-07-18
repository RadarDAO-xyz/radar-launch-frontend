import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { VisionOfTheWeekProject } from "./VisionOfTheWeekProject";

const _interactionsData = JSON.parse(
  '{"events":{"e-205":{"id":"e-205","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-206"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686294611086}},"actionLists":{"a-25":{"id":"a-25","title":"bobbing arrow","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"id":"83d83352-6dbe-73aa-1e60-c455d63f5a5a"},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":2000,"target":{"id":"83d83352-6dbe-73aa-1e60-c455d63f5a5a"},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":2000,"target":{"id":"83d83352-6dbe-73aa-1e60-c455d63f5a5a"},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1686294634185}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function HeaderFeaturedDiv({
  as: _Component = _Builtin.Section,
  visionOfTheWeekSlot,
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <_Component className="header-featured" tag="section">
      <_Builtin.Block className="featured-project-tabs" tag="div">
        <_Builtin.Row className="columns-2" tag="div">
          <_Builtin.Column className="column-8" tag="div">
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
            <_Builtin.Block
              className="floating-down-arrow"
              data-w-id="83d83352-6dbe-73aa-1e60-c455d63f5a5a"
              tag="div"
            >
              <_Builtin.Paragraph className="body-text larger">
                {"see curated projects ↓"}
                <br />
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column className="column-11" tag="div">
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
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
