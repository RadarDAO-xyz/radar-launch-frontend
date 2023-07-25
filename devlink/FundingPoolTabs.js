import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FundingPoolTabs.module.css";

export function FundingPoolTabs({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "funding-pool-header")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "funding-pool-title")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "feature-heading", "center")}
          tag="h1"
        >
          {"Funding the future"}
        </_Builtin.Heading>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "_20px-div")} tag="div" />
      <_Builtin.TabsWrapper
        current="Tab 2"
        easing="ease"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "tabs-menu-11")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-button")}
            data-w-tab="Tab 1"
          >
            <_Builtin.Block tag="div">{"Why Funding pools"}</_Builtin.Block>
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-button")}
            data-w-tab="Tab 2"
          >
            <_Builtin.Block tag="div">{"Getting funded"}</_Builtin.Block>
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-button")}
            data-w-tab="Tab 3"
          >
            <_Builtin.Block tag="div">{"Creating a pool"}</_Builtin.Block>
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tabs-content-8")}
          tag="div"
        >
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 1">
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "To accelerate the better futures we believe in, we’re collaborating with visionary partners: investors, individuals, blockchains, and brands who have deep conviction in an opportunity space that’s inherently linked to one of our futures."
              }
              <br />
              <br />
              {
                "Together, we’ll set bespoke briefs with dedicated funding pools to inspire and attract builders to build in answer to the briefs and distribute the funds via RADARLaunch."
              }
              <br />
              <br />
              {
                "Unlike traditional hackathons where only a few projects receive prizes, on Launch 100% of the funding pool will be dispersed among participating builders — with funders able to support as many projects as they’d like until the funding pool is closed."
              }
            </_Builtin.Paragraph>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-pane-tab-2-8")}
            tag="div"
            data-w-tab="Tab 2"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "pricing-grid")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "pricing-card-three")}
                id={_utils.cx(
                  _styles,
                  "w-node-_49230e1b-43ad-541c-866d-cdfa85fdae69-85fdae53"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "body-text", "center")}
                >
                  {"Be inspired by a brief"}
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-29")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "pricing-card-three")}
                id={_utils.cx(
                  _styles,
                  "w-node-_49230e1b-43ad-541c-866d-cdfa85fdae6d-85fdae53"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "body-text", "center")}
                >
                  {"Submit your vision"}
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-29")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "pricing-card-three")}
                id={_utils.cx(
                  _styles,
                  "w-node-_49230e1b-43ad-541c-866d-cdfa85fdae71-85fdae53"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "body-text", "center")}
                >
                  {"Launch on the platform"}
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-29")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "pricing-card-three")}
                id={_utils.cx(
                  _styles,
                  "w-node-_49230e1b-43ad-541c-866d-cdfa85fdae75-85fdae53"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "body-text", "center")}
                >
                  {"Get funded from the pool and public"}
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-29")}
                  width="auto"
                  height="auto"
                  loading="lazy"
                  src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_20px-div")}
              tag="div"
            />
            <_Builtin.Link
              className={_utils.cx(_styles, "link-block-6")}
              button={false}
              options={{
                href: "https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4",
                target: "_blank",
              }}
            >
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "body-text", "center")}
              >
                {"Learn more about pools "}
                <_Builtin.Span className={_utils.cx(_styles, "arrow-diagonal")}>
                  {"↗"}
                </_Builtin.Span>
              </_Builtin.Paragraph>
            </_Builtin.Link>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 3">
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "If you’re a visionary builder, investor, individual, blockchain, or brand with deep conviction in an opportunity space you’ve identified and want to influence the energy that’s bubbling up around it,"
              }
              <_Builtin.Link
                className={_utils.cx(_styles, "underline")}
                button={false}
                options={{
                  href: "#",
                }}
              >
                {" reach out to us."}
              </_Builtin.Link>
              <br />
              <br />
              {
                "In this partnership you bring technical expertise and innovation, we bring deep cultural insight by researching the past, present, and future. It’s this combo that makes the partnership magic, and results in ideas that are poised for adoption."
              }
              <br />
              <br />
              <_Builtin.Link
                className={_utils.cx(_styles, "underline")}
                button={false}
                options={{
                  href: "#",
                  target: "_blank",
                }}
              >
                {"Read some examples of our community inspired briefs"}
              </_Builtin.Link>
            </_Builtin.Paragraph>
            <_Builtin.Block
              className={_utils.cx(_styles, "_20px-div")}
              tag="div"
            />
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
      </_Builtin.TabsWrapper>
    </_Component>
  );
}
