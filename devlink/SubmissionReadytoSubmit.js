import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubmissionReadytoSubmit.module.css";

export function SubmissionReadytoSubmit({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "submit")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "header-div", "no-buffer", "full")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading", "submit", "left")}
          tag="h1"
        >
          {"Ready to submit"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {"Remind yourself of what happens next"}
          <br />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project", "top")}
        tag="div"
      >
        <_Builtin.Row tag="div">
          <_Builtin.Column
            className={_utils.cx(_styles, "submit-column")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "form-subheading")}
              tag="h1"
              id="About"
            >
              <_Builtin.Strong>{"Project Review"}</_Builtin.Strong>
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "Proposals will be reviewed by selected members of the RADARCommunity. Expect to receive a decision within 48 hours. You can re-apply if unsuccessful however we will not be able to answer bespoke feedback for why briefs were not successful. "
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-75")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "brief-subheading", "left")}
                tag="div"
              >
                {"Your proposal will be accepted if:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "_20px-div")}
                tag="div"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list-2")}
                tag="ul"
                unstyled={false}
              >
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They answer a brief or have been inspired by a more play-full future"
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They've shown that their funding will help them build towards a more play-full future"
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They've shown they have the skills to execute on their vision and that they have an advantage"
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They're building something that people want to be part of"
                    }
                  </_Builtin.Paragraph>
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "brief-subheading", "left")}
                tag="div"
              >
                {"Your proposal will be denied if:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "_20px-div")}
                tag="div"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list-2")}
                tag="ul"
                unstyled={false}
              >
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They're not answering the brief and just shilling an already existing project"
                    }
                  </_Builtin.Paragraph>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "small-text")}
                  >
                    {
                      "They're selling a purely speculative asset with no utility"
                    }
                  </_Builtin.Paragraph>
                </_Builtin.ListItem>
              </_Builtin.List>
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
