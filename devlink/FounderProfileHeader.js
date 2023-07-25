import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FounderProfileHeader.module.css";

export function FounderProfileHeader({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "founder-header", "_100")}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "founder-bio-stack")}
        tag="div"
      >
        <_Builtin.Row
          className={_utils.cx(_styles, "founder-columns")}
          tag="div"
        >
          <_Builtin.Column
            className={_utils.cx(_styles, "founde-bio-column")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "founder-bio-div")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "heading")}
                tag="h1"
                id="founder-name"
              >
                {"Founder Name"}
              </_Builtin.Heading>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_20px-div")}
              tag="div"
            />
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "body-text")}
              id="founder-bio"
            >
              {
                "Imani Hassan is a visionary entrepreneur and creative force dedicated to driving positive change in the world. With a passion for innovation and a deep commitment to social and environmental sustainability, Imani has established herself as a leader in the emerging digital art and culture space. Her expertise in crowdfunding, community building, and sustainability has enabled her to launch successful platforms and initiatives."
              }
            </_Builtin.Paragraph>
            <_Builtin.Block
              className={_utils.cx(_styles, "_30px-div", "mobile")}
              tag="div"
            />
            <_Builtin.Link
              className={_utils.cx(_styles, "button", "_30")}
              button={true}
              options={{
                href: "#",
              }}
            >
              {"Socials"}
            </_Builtin.Link>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "founder-image-column")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "founder-image", "large")}
              loading="lazy"
              width="auto"
              height="auto"
              id="founder-profile"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645f08315a0001a9b5c9c81c_Screenshot%202023-05-13%20at%2010.45.59.png"
            />
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
