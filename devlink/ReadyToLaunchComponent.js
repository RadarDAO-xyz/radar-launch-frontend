import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ReadyToLaunchComponent.module.css";

export function ReadyToLaunchComponent({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section", "top-line")}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-3", "vertical")}
        tag="div"
      >
        <_Builtin.Heading className={_utils.cx(_styles, "heading-25")} tag="h2">
          {"Ready to launch?"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "pricing-grid")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "pricing-card-three")}
            id={_utils.cx(
              _styles,
              "w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1552f-98d1552a"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480802c0e353e906c43dd3a_Brief_single.png"
            />
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-26")}
              tag="h3"
            >
              {"Be inspired"}
            </_Builtin.Heading>
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "Receive inspiration and insight from the RADAR community and partners"
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pricing-card-three")}
            id={_utils.cx(
              _styles,
              "w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15535-98d1552a"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "pricing-image")}
              loading="lazy"
              width={100}
              height={100}
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/648087d8889d8922b98f1441_submit%20vision_2.png"
            />
            <_Builtin.Heading tag="h3">{"Share your vision"}</_Builtin.Heading>
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "Submit a video proposal (less than 3 mins) and set your milestones"
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pricing-card-three")}
            id={_utils.cx(
              _styles,
              "w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1553b-98d1552a"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64808ab90c4bfc697c1a478e_submission%20icons.png"
            />
            <_Builtin.Heading tag="h3">{"Receive validation"}</_Builtin.Heading>
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "Receive an approval decision within 48 hours from RADAR's curation crew"
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pricing-card-three")}
            id={_utils.cx(
              _styles,
              "w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15541-98d1552a"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480d007b8df65a9d406feeb_Artboard%201.png"
            />
            <_Builtin.Heading tag="h3">{"Get support"}</_Builtin.Heading>
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {
                "Share your project page to attract users, contributors, and funding onchain"
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pricing-card-three")}
            id={_utils.cx(
              _styles,
              "w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15547-98d1552a"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480dc87dff309c9a60279b0_Artboard%203.png"
            />
            <_Builtin.Heading tag="h3">{"Make the future"}</_Builtin.Heading>
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text", "center")}
            >
              {"Withdraw your crowdfunded ETH to achieve your first milestone"}
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
