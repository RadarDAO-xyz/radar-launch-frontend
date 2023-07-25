import React from "react";
import * as _Builtin from "./_Builtin";
import { AdminNav } from "./AdminNav";
import { ProjectUpdateChoice } from "./ProjectUpdateChoice";
import * as _utils from "./utils";
import _styles from "./ProjectUpdateWrapper.module.css";

export function ProjectUpdateWrapper({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "admin-wrapper")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "admin-nav-bar")} tag="div">
        <AdminNav />
      </_Builtin.Block>
      <_Builtin.Row className={_utils.cx(_styles, "columns-5")} tag="div">
        <_Builtin.Column className={_utils.cx(_styles, "column-16")} tag="div">
          <ProjectUpdateChoice />
        </_Builtin.Column>
        <_Builtin.Column className={_utils.cx(_styles, "column-25")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "projectupdatechoice")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fs_accordion-2_component-2")}
              tag="div"
              fs-accordion-element="group"
              fs-accordion-initial="none"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "fs_accordion-2_embed-2")}
                value="%3C!--%20%5BFinsweet%20Attributes%5D%20Accordion%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-accordion%401%2Faccordion.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fs_accordion-2_item")}
                tag="div"
                fs-accordion-element="accordion"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fs_accordion-2_header-2")}
                  tag="div"
                  tabIndex="0"
                  role="button"
                  aria-controls="accordion-2-content-1"
                  aria-expanded="false"
                  fs-accordion-element="trigger"
                  id="accordion-2-header-1"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fs_accordion-2_label-2")}
                    tag="div"
                    id="project-updates-title"
                  >
                    {"Previous updates for [insert vision]"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fs_accordion-2_arrow-wrapper-2",
                      "is-active-accordion"
                    )}
                    tag="div"
                    fs-accordion-element="arrow"
                  >
                    <_Builtin.Icon
                      className={_utils.cx(_styles, "fs_accordion-2_icon-2")}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fs_accordion-2_content-2")}
                  tag="div"
                  aria-labelledby="accordion-2-header-1"
                  fs-accordion-element="content"
                  id="accordion-2-content-1"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fs_accordion-2_body-2")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "project-update-wrapper")}
                      tag="div"
                      id="project-updates-wrapper"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "update-div-2")}
                        tag="div"
                      >
                        <_Builtin.Paragraph
                          className={_utils.cx(_styles, "project-updates-text")}
                        >
                          {
                            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere"'
                          }
                        </_Builtin.Paragraph>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "editions-page-small-text"
                          )}
                        >
                          {"11.02.23"}
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "update-div-2")}
                        tag="div"
                      >
                        <_Builtin.Paragraph
                          className={_utils.cx(_styles, "project-updates-text")}
                        >
                          {
                            '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere"'
                          }
                        </_Builtin.Paragraph>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "editions-page-small-text"
                          )}
                        >
                          {"03.01.23"}
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fs_accordion-2_item")}
                id={_utils.cx(
                  _styles,
                  "w-node-a6438812-d6ec-b4ca-f505-8c7dc175e283-c175e252"
                )}
                tag="div"
                fs-accordion-element="accordion"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fs_accordion-2_header-2")}
                  tag="div"
                  tabIndex="0"
                  role="button"
                  aria-controls="accordion-2-content-1"
                  aria-expanded="false"
                  fs-accordion-element="trigger"
                  id="accordion-2-header-1"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fs_accordion-2_label-2")}
                    tag="div"
                    id="project-milestones-title"
                  >
                    {"Milestones for [insert vision]"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fs_accordion-2_arrow-wrapper-2",
                      "is-active-accordion"
                    )}
                    tag="div"
                    fs-accordion-element="arrow"
                  >
                    <_Builtin.Icon
                      className={_utils.cx(_styles, "fs_accordion-2_icon-2")}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fs_accordion-2_content-2")}
                  tag="div"
                  aria-labelledby="accordion-2-header-1"
                  fs-accordion-element="content"
                  id="accordion-2-content-1"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fs_accordion-2_body-2")}
                    tag="div"
                    id="project-milestones-wrapper"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "funding-milestone-admin-page"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-40")}
                        tag="div"
                      >
                        {"$1000"}
                      </_Builtin.Block>
                      <_Builtin.RichText tag="div">
                        <_Builtin.List tag="ul" unstyled={false}>
                          <_Builtin.ListItem>
                            {"Funding milestones examples 1"}
                          </_Builtin.ListItem>
                          <_Builtin.ListItem>
                            {"Funding milestones also examples"}
                          </_Builtin.ListItem>
                        </_Builtin.List>
                      </_Builtin.RichText>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "funding-milestone-admin-page"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-40")}
                        tag="div"
                      >
                        {"$5000"}
                      </_Builtin.Block>
                      <_Builtin.RichText tag="div">
                        <_Builtin.List tag="ul" unstyled={false}>
                          <_Builtin.ListItem>
                            {"Funding milestones examples 1"}
                          </_Builtin.ListItem>
                          <_Builtin.ListItem>
                            {"Funding milestones also examples"}
                          </_Builtin.ListItem>
                        </_Builtin.List>
                      </_Builtin.RichText>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "funding-milestone-admin-page"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-40")}
                        tag="div"
                      >
                        {"$10000"}
                      </_Builtin.Block>
                      <_Builtin.RichText tag="div">
                        <_Builtin.List tag="ul" unstyled={false}>
                          <_Builtin.ListItem>
                            {"Funding milestones examples 1"}
                          </_Builtin.ListItem>
                          <_Builtin.ListItem>
                            {"Funding milestones also examples"}
                          </_Builtin.ListItem>
                        </_Builtin.List>
                      </_Builtin.RichText>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Column>
      </_Builtin.Row>
    </_Component>
  );
}
