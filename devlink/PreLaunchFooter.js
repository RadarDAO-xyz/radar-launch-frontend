import React from "react";
import * as _Builtin from "./_Builtin";
import Link from "next/link";

export function PreLaunchFooter({ as: _Component = _Builtin.Section }) {
  return (
    <_Component className="footer" tag="section">
      <_Builtin.Block tag="div">
        <_Builtin.Block className="w-[100px]" tag="div">
          <_Builtin.Image
            className="image-5"
            loading="lazy"
            width={"auth"}
            height={"auto"}
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64620019197d0843980b2c90_Asset%205%402x-8.png"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="_20px-div" tag="div" />
      <_Builtin.Block className="div-block-107" tag="div">
        <_Builtin.Block className="div-block-108" tag="div">
          <_Builtin.Paragraph className="body-text white">
            {
              "RADAR Launch is a crowdraising platform for future makers and early adopters."
            }
            <br />
            <br />
            RADAR Launch is 100% owned and built by the{" "}
            <Link
              className="underline text-white hover:text-white/80 transition-colors"
              href="https://www.radardao.xyz/"
              target="_blank"
            >
              RADAR
            </Link>{" "}
            community.
            <br />
            <br />
            {'Read our "Multiplayer Futures" lite paper'}{" "}
            <Link
              href="https://www.radardao.xyz/multiplayer-futures"
              target="_blank"
              className="underline text-white hover:text-white/80 transition-colors"
            >
              here
            </Link>
            .
          </_Builtin.Paragraph>
        </_Builtin.Block>
        <_Builtin.List className="footer-list" tag="ul" unstyled={false}>
          <_Builtin.ListItem className="footer-list-item right">
            <Link className="black-link hover:underline" href="/project/create">
              {"Submit a project"}
            </Link>
            <_Builtin.HtmlEmbed
              className="arrow-embed"
              value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.13%208.5L6.87296%204.24291L5.87067%205.24379L9.129%208.5L5.87067%2011.7555L6.87225%2012.7571L11.13%208.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className="footer-list-item right">
            <Link
              className="black-link hover:underline"
              href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
              target="_blank"
            >
              {"Sponsor a brief"}
            </Link>
            <_Builtin.HtmlEmbed
              className="arrow-embed"
              value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.13%208.5L6.87296%204.24291L5.87067%205.24379L9.129%208.5L5.87067%2011.7555L6.87225%2012.7571L11.13%208.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className="footer-list-item right">
            <Link
              className="black-link hover:underline"
              href="https://airtable.com/appX7pDZw5NAGWoLc/shrFKUzeNpJoDU0x9"
              target="_blank"
            >
              {"Apply to join a community"}
            </Link>
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
          {"© 2023 RADAR Community Labs. All rights reserved"}
        </_Builtin.Paragraph>
        <Link
          className="body-text white text-right hover:underline"
          href="https://www.launch.radardao.xyz/terms-and-conditions"
          target="_blank"
        >
          {"Terms of Service"}
        </Link>
      </_Builtin.Block>
    </_Component>
  );
}
