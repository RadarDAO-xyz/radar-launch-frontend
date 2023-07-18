import React from "react";
import * as _Builtin from "./_Builtin";
import { FundingPoolTeaser } from "./FundingPoolTeaser";

export function FundingPoolsHome({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="funding-pool-menu-section" tag="section">
      <_Builtin.Block className="funding-pool-title" tag="div">
        <_Builtin.Heading className="feature-heading" tag="h1">
          {"See A more playful Future funding pools"}
        </_Builtin.Heading>
        <_Builtin.Paragraph className="body-text larger">
          {
            "Funding pools are set by visionary partners asking big questions and inspiring builders to build the future. "
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
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="funding-pool-wrapper" tag="div">
        <FundingPoolTeaser />
        <_Builtin.Block className="funding-pool-block" tag="div">
          <_Builtin.Block className="what-if-block-image-header" tag="div" />
          <_Builtin.Paragraph className="what-if-title">
            {"What if you funded a pool to inspire builders?"}
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
                {"LOADING"}
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
                {"LOADING"}
              </_Builtin.Paragraph>
            </_Builtin.Column>
          </_Builtin.Row>
          <_Builtin.Block className="_20px-div" tag="div" />
          <_Builtin.Link
            className="button"
            button={true}
            options={{
              href: "#",
            }}
          >
            {"FUND A BRIEF"}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
