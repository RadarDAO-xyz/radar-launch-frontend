import React from "react";
import * as _Builtin from "./_Builtin";

export function FundingPoolProjectHeader({
  as: _Component = _Builtin.Section,
}) {
  return (
    <_Component className="project-page-header" tag="section">
      <_Builtin.Row className="columns-28" tag="div">
        <_Builtin.Column className="column-86" tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Paragraph className="project-page-subtitle left">
              {"A More Play-Full Future"}
            </_Builtin.Paragraph>
            <_Builtin.Heading className="heading-trending-launch-page" tag="h1">
              {"What if NPCs were autonomous beings?"}
            </_Builtin.Heading>
            <_Builtin.Block className="_20px-div" tag="div" />
            <_Builtin.Paragraph>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum."
              }
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Link
              className="button margin-bottom-10"
              button={true}
              options={{
                href: "#",
              }}
            >
              {"READTHEBRIEF"}
            </_Builtin.Link>
            <_Builtin.Link
              className="subbutton _100"
              button={true}
              options={{
                href: "#",
              }}
            >
              {"SEEUPCOMINGEVENTSFORTHISBRIEF"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column className="column-80" tag="div">
          <_Builtin.Block className="div-block-99 no-line" tag="div">
            <_Builtin.Heading className="heading-5" tag="h1">
              {"$10,000"}
            </_Builtin.Heading>
            <_Builtin.Paragraph className="body-text larger">
              {"pool to build"}
              <_Builtin.Span className="arrow-diagonal">{""}</_Builtin.Span>
              <br />
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Paragraph className="small-text">
            {"Supported by:"}
          </_Builtin.Paragraph>
          <_Builtin.Row className="columns-27" tag="div">
            <_Builtin.Column tag="div">
              <_Builtin.Image
                className="image-26"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2c10486350c0fc2ad6f65_1200px-Ad_Council_2018_SVG.svg.png"
              />
            </_Builtin.Column>
            <_Builtin.Column tag="div">
              <_Builtin.Paragraph>
                {"OPGames"}
                <br />
                {"$5000"}
              </_Builtin.Paragraph>
            </_Builtin.Column>
          </_Builtin.Row>
          <_Builtin.Row className="columns-27" tag="div">
            <_Builtin.Column tag="div">
              <_Builtin.Image
                className="image-27"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2b9ce5b9d6dd4d41a01dc_uk-government-crown-crest-logo-9FDF513DBC-seeklogo.com.png"
              />
            </_Builtin.Column>
            <_Builtin.Column tag="div">
              <_Builtin.Paragraph>
                {"Future Primative"}
                <br />
                {"$3000"}
              </_Builtin.Paragraph>
            </_Builtin.Column>
          </_Builtin.Row>
          <_Builtin.Row className="columns-27 bottom" tag="div">
            <_Builtin.Column tag="div">
              <_Builtin.Image
                className="image-28"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2b9c6636eec16b79e21af_complex-logo-vector.png"
              />
            </_Builtin.Column>
            <_Builtin.Column tag="div">
              <_Builtin.Paragraph>
                {"NEAR"}
                <br />
                {"$2000"}
              </_Builtin.Paragraph>
            </_Builtin.Column>
          </_Builtin.Row>
        </_Builtin.Column>
      </_Builtin.Row>
      <_Builtin.Block className="funding-pool-image" tag="div" />
    </_Component>
  );
}
