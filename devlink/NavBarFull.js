import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavBarFull.module.css";

export function NavBarFull({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className={_utils.cx(_styles, "navbar-logo-center")} tag="div">
      <_Builtin.NavbarWrapper
        className={_utils.cx(
          _styles,
          "navbar-logo-center-container",
          "shadow-three"
        )}
        tag="div"
        config={{
          animation: "default",
          collapse: "medium",
          docHeight: false,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "navbar-wrapper-three")}
          tag="div"
        >
          <_Builtin.NavbarMenu
            className={_utils.cx(_styles, "nav-menu-wrapper-three")}
            tag="nav"
            role="navigation"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "nav-menu-three")}
              tag="div"
            >
              <_Builtin.List
                className={_utils.cx(_styles, "nav-menu-block")}
                tag="ul"
                unstyled={true}
              >
                <_Builtin.ListItem>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-link-2")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Visions"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-link-2")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Briefs"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.DropdownWrapper
                    className={_utils.cx(_styles, "nav-dropdown")}
                    tag="div"
                    delay={0}
                    hover={false}
                  >
                    <_Builtin.DropdownToggle
                      className={_utils.cx(_styles, "nav-dropdown-toggle")}
                      tag="div"
                    >
                      <_Builtin.Icon
                        className={_utils.cx(_styles, "nav-dropdown-icon")}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-5")}
                        tag="div"
                      >
                        {"About"}
                      </_Builtin.Block>
                    </_Builtin.DropdownToggle>
                    <_Builtin.DropdownList
                      className={_utils.cx(
                        _styles,
                        "nav-dropdown-list",
                        "shadow-three",
                        "mobile-shadow-hide"
                      )}
                      tag="nav"
                    >
                      <_Builtin.DropdownLink
                        className={_utils.cx(_styles, "nav-dropdown-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Resource Link 1"}
                      </_Builtin.DropdownLink>
                      <_Builtin.DropdownLink
                        className={_utils.cx(_styles, "nav-dropdown-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Resource Link 2"}
                      </_Builtin.DropdownLink>
                      <_Builtin.DropdownLink
                        className={_utils.cx(_styles, "nav-dropdown-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Resource Link 3"}
                      </_Builtin.DropdownLink>
                    </_Builtin.DropdownList>
                  </_Builtin.DropdownWrapper>
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-link-2")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"read"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-link-2")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"FAQs"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-5")}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "button", "wallet")}
                  button={true}
                  options={{
                    href: "#",
                  }}
                >
                  {"MINTS"}
                </_Builtin.Link>
                <_Builtin.Block
                  className={_utils.cx(_styles, "walletlogin")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "profile-picture")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-4")}
                    tag="div"
                  >
                    {"Login / User Name "}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.List
                  className={_utils.cx(_styles, "nav-menu-block")}
                  tag="ul"
                  unstyled={true}
                >
                  <_Builtin.ListItem
                    className={_utils.cx(_styles, "radar-logo")}
                  />
                  <_Builtin.ListItem
                    className={_utils.cx(_styles, "mobile-margin-top-10")}
                  >
                    <_Builtin.Link
                      className={_utils.cx(_styles, "button", "submit")}
                      button={true}
                      options={{
                        href: "#",
                      }}
                    >
                      {"SUBMIT"}
                    </_Builtin.Link>
                  </_Builtin.ListItem>
                </_Builtin.List>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.NavbarMenu>
          <_Builtin.NavbarButton
            className={_utils.cx(_styles, "menu-button")}
            tag="div"
          >
            <_Builtin.Icon
              widget={{
                type: "icon",
                icon: "nav-menu",
              }}
            />
          </_Builtin.NavbarButton>
        </_Builtin.Block>
      </_Builtin.NavbarWrapper>
    </_Component>
  );
}
