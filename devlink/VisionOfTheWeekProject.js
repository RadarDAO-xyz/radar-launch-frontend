import React from "react";
import * as _Builtin from "./_Builtin";

export function VisionOfTheWeekProject({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="featured-project-wrapper bg-transparent" tag="div">
      <_Builtin.Paragraph className="mobile-subtitle">
        {"Featured Project"}
      </_Builtin.Paragraph>
      <_Builtin.Block className="floating-weekly-featured full" tag="div">
        {"✨ DROP OF THE WEEK ✨"}
      </_Builtin.Block>
      <_Builtin.Block className="project-image" tag="div">
        <_Builtin.HtmlEmbed
          className="video-html cursor-default"
          value="%3Cdiv%20class%3D%22wrapper%22%3E%0A%09%3Cdiv%20class%3D%22youtube%22%20data-embed%3D%22FFvIb1gQYa8%22%3E%0A%09%09%3Cdiv%20class%3D%22play-button%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%3Cstyle%3E%0A%0Ahtml%20%7B%0A%09background-color%3A%20%23f3f3f3%3B%0A%7D%0A.wrapper%20%7B%0A%09max-width%3A%20100%25%3B%0A%09margin%3A%200px%3B%0A%09padding%3A%200px%3B%0A%7D%0A%0A.youtube%20%7B%0A%09background-color%3A%20%23000%3B%0A%09position%3A%20relative%3B%0A%09padding-top%3A%2056.25%25%3B%0A%09overflow%3A%20hidden%3B%0A%09cursor%3A%20pointer%3B%0A%7D%0A.youtube%20img%20%7B%0A%09width%3A%20100%25%3B%0A%09top%3A%20-16.82%25%3B%0A%09left%3A%200%3B%0A%09opacity%3A%200.7%3B%0A%7D%0A.youtube%20.play-button%20%7B%0A%09width%3A%2090px%3B%0A%09height%3A%2060px%3B%0A%09background-color%3A%20%23333%3B%0A%09box-shadow%3A%200%200%2030px%20rgba(%200%2C0%2C0%2C0.6%20)%3B%0A%09z-index%3A%201%3B%0A%09opacity%3A%200.8%3B%0A%09border-radius%3A%206px%3B%0A%7D%0A.youtube%20.play-button%3Abefore%20%7B%0A%09content%3A%20%22%22%3B%0A%09border-style%3A%20solid%3B%0A%09border-width%3A%2015px%200%2015px%2026.0px%3B%0A%09border-color%3A%20transparent%20transparent%20transparent%20%23fff%3B%0A%7D%0A.youtube%20img%2C%0A.youtube%20.play-button%20%7B%0A%09cursor%3A%20pointer%3B%0A%7D%0A.youtube%20img%2C%0A.youtube%20iframe%2C%0A.youtube%20.play-button%2C%0A.youtube%20.play-button%3Abefore%20%7B%0A%09position%3A%20absolute%3B%0A%7D%0A.youtube%20.play-button%2C%0A.youtube%20.play-button%3Abefore%20%7B%0A%09top%3A%2050%25%3B%0A%09left%3A%2050%25%3B%0A%09transform%3A%20translate3d(%20-50%25%2C%20-50%25%2C%200%20)%3B%0A%7D%0A.youtube%20iframe%20%7B%0A%09height%3A%20100%25%3B%0A%09width%3A%20100%25%3B%0A%09top%3A%200%3B%0A%09left%3A%200%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className="feature-project-div" tag="div">
        <_Builtin.Block className="_20px-div" tag="div" />
        <_Builtin.Link
          className="link-block-3"
          button={false}
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className="div-block-97" tag="div">
            <_Builtin.Paragraph className="featured-project-title font-bolded text-2xl text-gray-400">
              {"FUTURES DROP #1"}
            </_Builtin.Paragraph>
            <_Builtin.Block className="arrow-diagonal" tag="div">
              {"↗"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
        {/* <_Builtin.Block className="featured-project-bio" tag="div">
          <_Builtin.Paragraph className="project-byline">
            {"byline"}
          </_Builtin.Paragraph>
        </_Builtin.Block> */}
        <_Builtin.Block className="_10px-div" tag="div" />
        <_Builtin.Block className="collect-wrapper main flex justify-between" tag="div">
          <_Builtin.Block className="small-text text-gray-400" tag="div">
            {"0000 • supporters"}
          </_Builtin.Block>
          <_Builtin.Block className="text-xs text-gray-400" tag="div">
            {"00d 00h 00m"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
