import React from "react";
import * as _Builtin from "./_Builtin";

export function Banner({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="banner-ad" tag="div">
      <_Builtin.Paragraph className="small-text no-wrap">
        {
          "What if NPCs were autonomous? $10,000 Funding pool powered by OPGames & Friends. "
        }
        <_Builtin.Link
          className="underline"
          button={false}
          options={{
            href: "#",
          }}
        >
          {"Submit your vision now. "}
        </_Builtin.Link>
        <br />
      </_Builtin.Paragraph>
      <_Builtin.Row className="columns-29" tag="div">
        <_Builtin.Column tag="div">
          <_Builtin.Image
            className="logo"
            loading="lazy"
            width={45}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2b9c6636eec16b79e21af_complex-logo-vector.png"
          />
        </_Builtin.Column>
        <_Builtin.Column className="column-88" tag="div">
          <_Builtin.Image
            className="logo"
            loading="lazy"
            width={50}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2c10e6464cee35136c772_WGSN_logo_detail.png"
          />
        </_Builtin.Column>
        <_Builtin.Column className="column-87" tag="div">
          <_Builtin.Image
            className="logo"
            loading="lazy"
            width={25}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2c06943df3f8284d9eda6_209-2093518_lego-logo-black-and-white-lego-logos.png"
          />
        </_Builtin.Column>
      </_Builtin.Row>
    </_Component>
  );
}
