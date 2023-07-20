import React from "react";
import * as _Builtin from "./_Builtin";

export function Footer({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="footer" tag="section">
      <_Builtin.Block tag="div">
        <_Builtin.Block className="logo-wrapper" tag="div">
          <_Builtin.Image
            className="image-5"
            loading="lazy"
            width="auto"
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64620019197d0843980b2c90_Asset%205%402x-8.png"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Row tag="div">
        <_Builtin.Column className="column-28" tag="div">
          <_Builtin.Paragraph className="body-text white">
            {"RADAR "}
            <_Builtin.Span>{"Launch"}</_Builtin.Span>
            {
              " is a crowdraising platform for visionary builders building better futures."
            }
            <br />
            <br />
            {"Part of the RADAREcosystem accelerating better futures in "}
            <_Builtin.Link
              button={false}
              options={{
                href: "#",
              }}
            >
              <_Builtin.Span className="underline white">
                {"multiplayer mode."}
              </_Builtin.Span>
            </_Builtin.Link>
          </_Builtin.Paragraph>
        </_Builtin.Column>
        <_Builtin.Column className="column-36" tag="div">
          <_Builtin.List className="footer-list" tag="ul" unstyled={false}>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Read the FAQs"}
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Read the briefs"}
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Submit a proposal"}
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"How to collect a vision"}
              </_Builtin.Link>
            </_Builtin.ListItem>
          </_Builtin.List>
        </_Builtin.Column>
        <_Builtin.Column className="column-37" tag="div">
          <_Builtin.List className="footer-list" tag="ul" unstyled={false}>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Apply to RADAR"}
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Work with RADAR"}
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem className="footer-list-item">
              <_Builtin.Link
                className="black-link"
                button={false}
                options={{
                  href: "#",
                }}
              >
                {"Sponsor a brief for A More Play-Full Future"}
              </_Builtin.Link>
            </_Builtin.ListItem>
          </_Builtin.List>
        </_Builtin.Column>
      </_Builtin.Row>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="text-block-23" tag="div">
        {"A More Play-Full Future is partnered with:"}
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Row className="columns-12" tag="div">
        <_Builtin.Column className="column-42" tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column tag="div">
          <_Builtin.Block className="logo" tag="div">
            {"LOGO"}
          </_Builtin.Block>
        </_Builtin.Column>
      </_Builtin.Row>
      <_Builtin.Block className="div-block-16 justify-between" tag="div">
        <_Builtin.Paragraph className="body-text white">
          {"© 2023 RADARCommunity Labs. All rights reserved"}
        </_Builtin.Paragraph>
        <_Builtin.Paragraph className="body-text white text-right">
          {"Terms of Service"}
        </_Builtin.Paragraph>
      </_Builtin.Block>
    </_Component>
  );
}
