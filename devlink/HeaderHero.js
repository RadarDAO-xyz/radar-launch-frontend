import React from "react";
import * as _Builtin from "./_Builtin";
import { VisionOfTheWeekProject } from "./VisionOfTheWeekProject";
import { useAccount, useNetwork } from "wagmi";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import isTestnet from "@/lib/utils/isTestnet";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { chains } from "@/components/Web3Provider";
import Link from "next/link";

export function HeaderHero({
  as: _Component = _Builtin.Section,
  visionOfTheWeekSlot,
}) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useRadarEditionsGetEditions({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: "0x" + chains[0].id.toString(16),
  });

  return (
    <_Component className="header-featured z-20 bg-transparent" tag="section">
      <_Builtin.Block
        className="floating-down-arrow justify-between absolute right-[5%] hidden lg:flex"
        tag="div"
      >
        <_Builtin.Paragraph className="body-text larger">
          {"Curated projects dropping weekly ↓"}
          <br />
        </_Builtin.Paragraph>
        <Link href="https://www.culture3.xyz/" target="_blank" className="flex">
          <p className="curator-text">
            august curated by
            <br />
          </p>
          <img
            className="logo"
            loading="lazy"
            width={56}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
          />
          <div className="arrow-diagonal">{"↗"}</div>
        </Link>
      </_Builtin.Block>
      <_Builtin.Block className="featured-project-tabs  md:w-[80%] lg:w-[80%] space-x-4 lg:space-x-8" tag="div">
        <_Builtin.Block className="about-div home px-[5%]" tag="div">
          <_Builtin.Heading className="heading-5" tag="h1">
            {"SUPPORT IDEAS AND BUILDERS OF FUTURES YOU BELIEVE IN"}
          </_Builtin.Heading>
          <_Builtin.Block className="_10px-div" tag="div" />
          <_Builtin.Paragraph className="body-text larger">
            {
              "We believe the future is multiplayer and we need future makers, future adopters and future backers to accelerate adoption."}<br /><br /> {"Launch is where you can support future makers, unlock benefits as a patron and build reputation as an future adopter."
            }
            <_Builtin.Link
              button={false}
              options={{
                href: "#",
                target: "_blank",
              }}
            >
              <_Builtin.Span className="underline">{""}</_Builtin.Span>
            </_Builtin.Link>
            <br />
          </_Builtin.Paragraph>
          <_Builtin.Block className="div-block-99" tag="div">
            <_Builtin.Heading className="heading-5" tag="h1">
              {"$" +
                (
                  12400n +
                  (data
                    ? data.reduce((acc, edition) => acc + edition.balance, 0n)
                    : 0n)
                ).toLocaleString()}
            </_Builtin.Heading>
            <_Builtin.Paragraph className="body-text larger">
              {"already committed to build better futures"}
              <_Builtin.Span className="arrow-diagonal">{""}</_Builtin.Span>
              <br />
            </_Builtin.Paragraph>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className="visionoftheweek" tag="div">
          {visionOfTheWeekSlot ?? (
            <>
              <VisionOfTheWeekProject />
              <_Builtin.Block className="div-block-101" tag="div">
                <_Builtin.Paragraph className="curator-text">
                  {"august curated by"}
                  <br />
                </_Builtin.Paragraph>
                <_Builtin.Image
                  className="logo"
                  loading="lazy"
                  width={56}
                  height="auto"
                  src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
                />
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <div className="flex justify-center lg:hidden px-[5%] pt-6">
        <Link href="https://www.culture3.xyz/" target="_blank" className="flex">
          <p className="curator-text">
            august curated by
            <br />
          </p>
          <img
            className="logo"
            loading="lazy"
            width={56}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
          />
          <div className="arrow-diagonal">{"↗"}</div>
        </Link>
      </div>
    </_Component>
  );
}
