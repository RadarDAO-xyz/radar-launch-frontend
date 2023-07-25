import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubmissionSupport.module.css";

export function SubmissionSupport({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "support")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "header-div")} tag="div">
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading", "submit", "left")}
          tag="h1"
        >
          {"Support"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {"What support are you looking for?"}
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
              {"Collaborators"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {"Do you want to find collaborators on your project?"}
              <br />
              <br />
              {
                "This will appear in your project description for people to apply to help you build, leave blank if you are not looking for collaborators"
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-68")}
            tag="div"
          >
            <_Builtin.FormBlockLabel
              className={_utils.cx(_styles, "body-text")}
              htmlFor="field"
            >
              {"List the collaborators you're looking for"}
            </_Builtin.FormBlockLabel>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.FormTextarea
              className={_utils.cx(_styles, "bullet")}
              name="collaborators-2"
              maxLength={5000}
              data-name="Collaborators 2"
              required={false}
              autoFocus={false}
              id="collaborators-2"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {"Leave blank if you don't need any collaborators"}
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
