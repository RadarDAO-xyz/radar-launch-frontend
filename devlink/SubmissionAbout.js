import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SubmissionAbout.module.css";
import { useFormContext } from "react-hook-form";

export function SubmissionAbout({ as: _Component = _Builtin.Block }) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <_Component className={_utils.cx(_styles, "about-your-vision")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "header-div")} tag="div">
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading", "submit", "left")}
          tag="h1"
        >
          {"The Vision"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {"Make it easy for people to learn about your vision"}
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
              {"Title"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque pellentesque orci, in blandit nisi finibus pellentesque. Nam nec suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-54")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "project-name")}
              tag="div"
            >
              <_Builtin.FormBlockLabel
                className={_utils.cx(_styles, "body-text")}
                htmlFor="Project-Name"
              >
                {"Whats the name of your project?"}
              </_Builtin.FormBlockLabel>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field")}
                autoFocus={false}
                maxLength={256}
                name="Project-Name-3"
                data-name="Project Name 3"
                type="text"
                disabled={false}
                required={false}
                id="title"
                {...register(`title`)}
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "_30px-div")}
                tag="div"
              />
              <_Builtin.FormBlockLabel
                className={_utils.cx(_styles, "body-text")}
                htmlFor="Project-Name"
              >
                {"Describe your idea in a sentence"}
              </_Builtin.FormBlockLabel>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "small-text", "submit-page")}
                tag="div"
              >
                {"This will be featured on homepage alongside your video"}
                <br />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field")}
                autoFocus={false}
                maxLength={256}
                name="Byline"
                data-name="Byline"
                type="text"
                disabled={false}
                required={false}
                id="description"
                {...register(`description`)}
              />
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
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
              {"Summary"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque pellentesque orci, in blandit nisi finibus pellentesque."
              }
              <br />
              <br />
              {
                "Nam nec suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-55")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "project-name")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "video-url")}
                tag="div"
              >
                <_Builtin.FormBlockLabel
                  className={_utils.cx(_styles, "body-text")}
                  htmlFor="name"
                >
                  {
                    "Please share a video introducing your vision for a better future"
                  }
                </_Builtin.FormBlockLabel>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.FormTextInput
                  className={_utils.cx(_styles, "input-field", "video-url")}
                  autoFocus={false}
                  maxLength={256}
                  name="video-url-2"
                  data-name="Video Url 2"
                  type="text"
                  disabled={false}
                  required={false}
                  id="video_url"
                  {...register(`video_url`)}
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "small-text", "submit-page")}
                  tag="div"
                >
                  {
                    "This should be a maximum of 3 minutes; this must be a URL, you can use vimeo or youtube"
                  }
                  <br />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_30px-div")}
                  tag="div"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "tldr")} tag="div">
              <_Builtin.FormBlockLabel
                className={_utils.cx(_styles, "body-text")}
                htmlFor="Project-TLDR"
              >
                {"Project TLDR"}
              </_Builtin.FormBlockLabel>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
              <_Builtin.FormTextarea
                className={_utils.cx(_styles, "simple")}
                name="Project-TLDR-2"
                maxLength={5000}
                data-name="Project TLDR 2"
                placeholder=" "
                required={false}
                autoFocus={false}
                id="tldr"
                {...register(`tldr`)}
              />
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project", "top", "unlocked")}
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
              {"Video Image"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "This thumbnail is taken from the first slide of your uploaded video."
              }
              <br />
              <br />
              {
                "This will appear for collectors in their wallet and on their profile"
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-71")}
            tag="div"
          >
            <_Builtin.Image
              width="auto"
              height="auto"
              loading="lazy"
              id="video_image"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64afc1226f3cb0d160f037d3_Asset%202%402x-8.png"
            />
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "project",
          "top",
          "no-line",
          "no-buffer",
          "full"
        )}
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
              {"Inspiration"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque pellentesque orci, in blandit nisi finibus pellentesque."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-66")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "project-name")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "inspiration")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "body-text")}
                  tag="div"
                >
                  {"Select a brief you are answering:"}
                  <br />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "small-text")}
                  tag="div"
                >
                  {
                    "Chose 'other' if you've been inspired by A More Play-Full Future outside of the briefs"
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.FormSelect
                  className={_utils.cx(_styles, "input-field", "brief")}
                  name="Brief-Selection-2"
                  data-name="Brief Selection 2"
                  required={false}
                  multiple={false}
                  id="brief"
                  {...register(`brief`)}
                  options={[
                    {
                      t: "Select a brief",
                      v: "",
                    },
                    {
                      t: "The Enchantress",
                      v: "The Enchantress",
                    },
                    {
                      t: "The Healer",
                      v: "The Healer",
                    },
                    {
                      t: "The Mediator",
                      v: "The Mediator",
                    },
                    {
                      t: "The Teacher",
                      v: "The Teacher",
                    },
                    {
                      t: "The Artist",
                      v: "The Artist",
                    },
                    {
                      t: "Other",
                      v: "Other",
                    },
                  ]}
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_30px-div")}
                  tag="div"
                />
                <_Builtin.FormBlockLabel
                  className={_utils.cx(_styles, "body-text")}
                  htmlFor="Brief-Selection"
                >
                  {"What was the inspiration for this idea?"}
                </_Builtin.FormBlockLabel>
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.FormTextarea
                  className={_utils.cx(_styles, "simple")}
                  name="inspiration-2"
                  maxLength={5000}
                  data-name="Inspiration 2"
                  required={false}
                  autoFocus={false}
                  id="inspiration-2"
                  {...register(`inspiration`)}
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
