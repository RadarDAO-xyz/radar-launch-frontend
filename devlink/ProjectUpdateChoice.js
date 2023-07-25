import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ProjectUpdateChoice.module.css";

export function ProjectUpdateChoice({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "projectupdatechoice", "left")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "title")} tag="div">
        {"Share an update with your supporters"}
        <_Builtin.Span className={_utils.cx(_styles, "mint-open-closed")}>
          {""}
        </_Builtin.Span>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "_20px-div")} tag="div" />
      <_Builtin.Paragraph className={_utils.cx(_styles, "small-text")}>
        {
          "It's important to update your supporters so they can get the latest access, share about your vision and be ready to support your next fundraise. Use the text edit below and click submit, updates are made onchain and cannot be edited. This update goes on your main project page. "
        }
      </_Builtin.Paragraph>
      <_Builtin.FormWrapper className={_utils.cx(_styles, "form-block-2")}>
        <_Builtin.FormForm
          name="email-form-2"
          data-name="Email Form 2"
          action="/"
          method="post"
          id="update-form"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "_20px-div")}
            tag="div"
          />
          <_Builtin.FormSelect
            className={_utils.cx(_styles, "selection-project-to-update-on")}
            name="project-selection-2"
            data-name="Project Selection 2"
            required={false}
            multiple={false}
            id="project-selection-2"
            options={[
              {
                t: "Select a vision to update",
                v: "",
              },
              {
                t: "First choice",
                v: "First",
              },
              {
                t: "Second choice",
                v: "Second",
              },
              {
                t: "Third choice",
                v: "Third",
              },
            ]}
          />
          <_Builtin.FormTextarea
            className={_utils.cx(_styles, "simple")}
            name="field"
            maxLength={5000}
            data-name="Field"
            required={false}
            autoFocus={false}
            id="update-field"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "_20px-div")}
            tag="div"
          />
          <_Builtin.FormButton
            className={_utils.cx(_styles, "button")}
            type="submit"
            value="Share"
            data-wait="Please wait..."
            id="share-update-button"
          />
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage>
          <_Builtin.Block tag="div">
            {"Thank you! Your submission has been received!"}
          </_Builtin.Block>
        </_Builtin.FormSuccessMessage>
        <_Builtin.FormErrorMessage>
          <_Builtin.Block tag="div">
            {"Oops! Something went wrong while submitting the form."}
          </_Builtin.Block>
        </_Builtin.FormErrorMessage>
      </_Builtin.FormWrapper>
    </_Component>
  );
}
