import React from "react";
import * as _Builtin from "./_Builtin";

export function PreLaunchNav({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="navbar-logo-center" tag="div">
      <_Builtin.NavbarWrapper
        className="navbar-logo-center-container shadow-three"
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
        <_Builtin.Block className="logo-wrapper" tag="div">
          <_Builtin.Link
            className="link-block"
            button={false}
            options={{
              href: "#",
            }}
          >
            <_Builtin.Image
              className="image-9"
              loading="lazy"
              width={161}
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645ddcb1ed7bc34887f6efc9_Asset%204%402x-8.png"
            />
          </_Builtin.Link>
        </_Builtin.Block>
        <_Builtin.Block className="navbar-wrapper-three" tag="div">
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
                <_Builtin.ListItem className="list-item-5">
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
                        {"Inspiration"}
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
                        }}
                      >
                        {"Creative Briefs"}
                      </_Builtin.DropdownLink>
                      <_Builtin.DropdownLink
                        className="nav-dropdown-link"
                        options={{
                          href: "#",
                        }}
                      >
                        {"Report"}
                      </_Builtin.DropdownLink>
                    </_Builtin.DropdownList>
                  </_Builtin.DropdownWrapper>
                </_Builtin.ListItem>
                <_Builtin.ListItem className="list-item-5">
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
                <_Builtin.ListItem className="list-item-5">
                  <_Builtin.Link
                    className="nav-link-2"
                    button={false}
                    options={{
                      href: "https://lu.ma/radarlaunch",
                      target: "_blank",
                    }}
                  >
                    {"EVENTS"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
                <_Builtin.ListItem className="list-item-5">
                  <_Builtin.Link
                    className="nav-link-2"
                    button={false}
                    options={{
                      href: "https://discord.gg/vTwJ9cAgxg",
                      target: "_blank",
                    }}
                  >
                    {"Community"}
                  </_Builtin.Link>
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Link
                className="button"
                button={true}
                options={{
                  href: "https://airtable.com/appGvDqIhUSP0caqo/shrvi09PTUP5mTSHN",
                }}
              >
                {"Tell us your vision"}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.NavbarMenu>
          <_Builtin.NavbarButton className="menu-button" tag="div">
            <_Builtin.Icon
              className="icon"
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
