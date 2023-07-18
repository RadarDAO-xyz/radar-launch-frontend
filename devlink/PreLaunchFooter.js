import React from "react";
import * as _Builtin from "./_Builtin";

export function PreLaunchFooter({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="footer" tag="section">
      <_Builtin.Block tag="div">
        <_Builtin.Block className="logo-wrapper" tag="div">
          <_Builtin.Image
            className="image-5"
            loading="lazy"
            width={114}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64620019197d0843980b2c90_Asset%205%402x-8.png"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="div-block-107" tag="div">
        <_Builtin.Block className="div-block-108" tag="div">
          <_Builtin.Paragraph className="body-text white">
            {"RADAR Launch is a crowdraising platform for future makers."}
            <br />
            <br />
            {
              'RADARLaunch is part of the RADAR ecosystem; accelerating better futures in multiplayer mode. Read our "Multiplayer Futures" lite paper here.'
            }
          </_Builtin.Paragraph>
        </_Builtin.Block>
        <_Builtin.List className="footer-list" tag="ul" unstyled={false}>
          <_Builtin.ListItem className="footer-list-item right">
            <_Builtin.Link
              className="black-link"
              button={false}
              options={{
                href: "#",
              }}
            >
              {"Apply to join the community"}
            </_Builtin.Link>
            <_Builtin.HtmlEmbed
              className="arrow-embed"
              value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.13%208.5L6.87296%204.24291L5.87067%205.24379L9.129%208.5L5.87067%2011.7555L6.87225%2012.7571L11.13%208.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className="footer-list-item right">
            <_Builtin.Link
              className="black-link"
              button={false}
              options={{
                href: "#",
              }}
            >
              {"Work with RADAR"}
            </_Builtin.Link>
            <_Builtin.HtmlEmbed
              className="arrow-embed"
              value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.13%208.5L6.87296%204.24291L5.87067%205.24379L9.129%208.5L5.87067%2011.7555L6.87225%2012.7571L11.13%208.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className="footer-list-item right">
            <_Builtin.Link
              className="black-link"
              button={false}
              options={{
                href: "#",
              }}
            >
              {"Sponsor a brief"}
            </_Builtin.Link>
            <_Builtin.HtmlEmbed
              className="arrow-embed"
              value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.13%208.5L6.87296%204.24291L5.87067%205.24379L9.129%208.5L5.87067%2011.7555L6.87225%2012.7571L11.13%208.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.ListItem>
        </_Builtin.List>
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="div-block-16" tag="div">
        <_Builtin.Paragraph className="body-text white">
          {"© 2023 RADARCommunity Labs. All rights reserved"}
        </_Builtin.Paragraph>
        <_Builtin.Paragraph className="body-text white">
          {"Terms of Service"}
        </_Builtin.Paragraph>
      </_Builtin.Block>
    </_Component>
  );
}
