import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FounderProfileUpdateForm.module.css";

export function FounderProfileUpdateForm({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "edit-founder-bio-div")}
      tag="div"
    >
      <_Builtin.FormWrapper
        className={_utils.cx(_styles, "edit-founder-bio-form")}
      >
        <_Builtin.FormForm
          name="email-form-3"
          data-name="Email Form 3"
          action="/"
          method="post"
          id="update-user-form"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "name-and-picture-div")}
            tag="div"
          >
            <_Builtin.FormFileUploadWrapper
              className={_utils.cx(_styles, "file-upload-2")}
            >
              <_Builtin.FormFileUploadDefault
                className={_utils.cx(_styles, "default-state-2")}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "body-text", "left")}
                  tag="div"
                >
                  {"Profile Image "}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.FormFileUploadInput
                  name="file-2"
                  data-name="File 2"
                  aria-hidden="true"
                  multiple={false}
                  type="file"
                  tabIndex="-1"
                  required={false}
                  id="file-2"
                />
                <_Builtin.FormFileUploadLabel
                  className={_utils.cx(_styles, "button-4")}
                  role="button"
                  tabIndex="0"
                  htmlFor="file-2"
                >
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "icon-4")}
                    widget={{
                      type: "icon",
                      icon: "file-upload-icon",
                    }}
                  />
                </_Builtin.FormFileUploadLabel>
              </_Builtin.FormFileUploadDefault>
              <_Builtin.FormFileUploadUploading tabIndex="-1">
                <_Builtin.FormFileUploadUploadingBtn>
                  <_Builtin.FormFileUploadUploadingIcon
                    widget={{
                      type: "icon",
                    }}
                  />
                  <_Builtin.FormFileUploadText>
                    {"Uploading..."}
                  </_Builtin.FormFileUploadText>
                </_Builtin.FormFileUploadUploadingBtn>
              </_Builtin.FormFileUploadUploading>
              <_Builtin.FormFileUploadSuccess tabIndex="-1">
                <_Builtin.FormFileUploadFile>
                  <_Builtin.FormFileUploadFileName />
                  <_Builtin.FormFileUploadRemoveLink
                    aria-label="Remove file"
                    role="button"
                    tabIndex="0"
                  >
                    <_Builtin.Icon
                      widget={{
                        type: "icon",
                        icon: "file-upload-remove",
                      }}
                    />
                  </_Builtin.FormFileUploadRemoveLink>
                </_Builtin.FormFileUploadFile>
              </_Builtin.FormFileUploadSuccess>
              <_Builtin.FormFileUploadError tabIndex="-1">
                <_Builtin.FormFileUploadErrorMsg
                  errors={{
                    SIZE_ERROR: "Upload failed. Max size for files is 10 MB.",
                    TYPE_ERROR: "Upload failed. Invalid file type.",
                    GENERIC_ERROR:
                      "Upload failed. Something went wrong. Please retry.",
                  }}
                />
              </_Builtin.FormFileUploadError>
            </_Builtin.FormFileUploadWrapper>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-94")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "body-text", "left")}
                tag="div"
              >
                {"Your name"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field")}
                autoFocus={false}
                maxLength={256}
                name="Name"
                data-name="Name"
                type="text"
                disabled={false}
                required={true}
                id="username"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "social-div")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "body-text", "left")}
                tag="div"
              >
                {"Where people can find you"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field")}
                autoFocus={false}
                maxLength={256}
                name="Name-2"
                data-name="Name 2"
                type="text"
                disabled={false}
                required={true}
                id="socials"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "bio-div")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "body-text", "left")}
              tag="div"
            >
              {"About yourself"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.FormTextarea
              className={_utils.cx(_styles, "simple")}
              name="Admin-bio"
              maxLength={5000}
              data-name="Admin bio"
              required={false}
              autoFocus={false}
              id="bio"
            />
          </_Builtin.Block>
          <_Builtin.FormButton
            className={_utils.cx(_styles, "button")}
            type="submit"
            value="Update your bio"
            data-wait="Please wait..."
            id="submit"
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
