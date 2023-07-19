import React from "react";
import Wallet from "@/components/Wallet";
import * as _Builtin from "./_Builtin";

export function NavBar({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="navbar-logo-center" tag="div">
      <_Builtin.NavbarWrapper
        className="navbar-logo-center-container shadow-three"
        tag="div"
        config={{
          animation: "default",
          collapse: "medium",
          docHeight: true,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
      >
        <_Builtin.Block className="navbar-wrapper-three" tag="div">
          <_Builtin.Block className="logo-wrapper" tag="div">
            <_Builtin.Link
              button={false}
              options={{
                href: "/",
              }}
            >
              <_Builtin.Image
                className="image-4"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645ddcb1ed7bc34887f6efc9_Asset%204%402x-8.png"
              />
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.NavbarMenu
            className="nav-menu-wrapper-three"
            tag="nav"
            role="navigation"
          >
            <_Builtin.Block className="nav-menu-three" tag="div">
              <_Builtin.List
                className="nav-menu-block"
                tag="ul"
                unstyled={true}
              >
                <_Builtin.ListItem className="mobile-menu">
                  <_Builtin.Link
                    className="nav-link-2"
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"SEEFUNDINGPOOLS"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem className="mobile-menu">
                  <_Builtin.Link
                    className="nav-link-2"
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"HOWITWORKS"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem className="mobile-menu">
                  <_Builtin.DropdownWrapper
                    className="nav-dropdown"
                    tag="div"
                    delay={0}
                    hover={false}
                  >
                    <_Builtin.DropdownToggle
                      className="nav-dropdown-toggle"
                      tag="div"
                    >
                      <_Builtin.Icon
                        className="nav-dropdown-icon"
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                      <_Builtin.Block className="text-block-5" tag="div">
                        {"INSPIRATION"}
                      </_Builtin.Block>
                    </_Builtin.DropdownToggle>
                    <_Builtin.DropdownList
                      className="nav-dropdown-list shadow-three mobile-shadow-hide"
                      tag="nav"
                    >
                      <_Builtin.DropdownLink
                        className="nav-dropdown-link"
                        options={{
                          href: "#",
                          target: "_blank",
                        }}
                      >
                        {"About RADAR"}
                      </_Builtin.DropdownLink>
                      <_Builtin.DropdownLink
                        className="nav-dropdown-link"
                        options={{
                          href: "#",
                        }}
                      >
                        {"Read the report"}
                      </_Builtin.DropdownLink>
                    </_Builtin.DropdownList>
                  </_Builtin.DropdownWrapper>
                </_Builtin.ListItem>
                <_Builtin.ListItem className="mobile-menu">
                  <_Builtin.Link
                    className="nav-link-2"
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    {"FAQs"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Block className="div-block-35 space-x-2" tag="div">
                <_Builtin.Block className="admin-divider" tag="div">
                  <_Builtin.Block className="submit-subtitle-mobile" tag="div">
                    {"Admin"}
                  </_Builtin.Block>
                  <_Builtin.Block className="div-block-5" tag="div">
                    <_Builtin.Block className="voting" tag="div">
                      <_Builtin.Block className="small-text caps" tag="div">
                        {"0/3 votes "}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className="countdown"
                      tag="div"
                      id="countdown"
                    >
                      <_Builtin.Block
                        className="countdown-item"
                        tag="div"
                        id="hours"
                      >
                        00
                      </_Builtin.Block>
                      <_Builtin.Block className="time-text" tag="div">
                        {"h"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className="countdown-item"
                        tag="div"
                        id="minutes"
                      >
                        00
                      </_Builtin.Block>
                      <_Builtin.Block className="time-text" tag="div">
                        {"m"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className="countdown-item"
                        tag="div"
                        id="seconds"
                      >
                        00
                      </_Builtin.Block>
                      <_Builtin.Block className="time-text end" tag="div">
                        {"s"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Link
                      button={false}
                      options={{
                        href: "#",
                      }}
                    >
                      <Wallet />
                    </_Builtin.Link>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className="div-block-34" tag="div">
                  <_Builtin.Block className="submit-subtitle-mobile" tag="div">
                    {"Submit your vision"}
                  </_Builtin.Block>
                  <_Builtin.Link
                    className="button"
                    button={true}
                    options={{
                      href: "#",
                    }}
                  >
                    {"SUBMIT"}
                  </_Builtin.Link>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.NavbarMenu>
          <_Builtin.NavbarButton className="menu-button" tag="div">
            <_Builtin.Icon
              className="icon-2"
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
