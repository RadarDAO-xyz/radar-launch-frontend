import React from "react";
import * as _Builtin from "./_Builtin";

export function FundingPoolTeaser({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="funding-pool-block" tag="div">
      <_Builtin.Block className="what-if-block-image-header" tag="div" />
      <_Builtin.Paragraph className="what-if-title">
        {"What if NPCs were autonomous beings?"}
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
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Row className="columns-21" tag="div">
        <_Builtin.Column className="funding-pool-lockup" tag="div">
          <_Builtin.Paragraph className="small-text">
            {"Remaining Funding pool"}
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
          <_Builtin.Block className="_5px-div" tag="div" />
          <_Builtin.Paragraph className="funding-pool-numbers">
            <_Builtin.Span className="small">{"$"}</_Builtin.Span>
            {"7, 324"}
          </_Builtin.Paragraph>
        </_Builtin.Column>
        <_Builtin.Column className="funding-pool-lockup" tag="div">
          <_Builtin.Paragraph className="small-text">
            {"Projects Submitted "}
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
          <_Builtin.Block className="_5px-div" tag="div" />
          <_Builtin.Paragraph className="funding-pool-numbers">
            {"172"}
          </_Builtin.Paragraph>
        </_Builtin.Column>
      </_Builtin.Row>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="funding-pool-block-button-lockup" tag="div">
        <_Builtin.Link
          className="button-5 _100"
          button={true}
          options={{
            href: "#",
          }}
        >
          {"SEEPOOL"}
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Image
        className="sponsor-image _50 floating"
        loading="lazy"
        width={94}
        height="auto"
        src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64b6a86d9f0d6a0981e16e44_62051e643514d22dbaca1d3b_Apple%20Icon.png"
      />
    </_Component>
  );
}
