import { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import { ethers } from "ethers";
import { optimism, optimismGoerli } from "wagmi/chains";
import isTestnet from "../../../../lib/isTestnet";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import abi from "@/abi/RadarEditions.sol/RadarEditions.json";
import { getProject } from "@/lib/backend";
import { retrieveVideoThumbnail } from "../../../../../radar-launch/src/util/regex";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  if (req.method !== "GET") {
    return res.status(404).json({});
  }
  try {
    const { id: tokenId } = req.query;
    if (tokenId === undefined) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const provider = ethers.getDefaultProvider(
      isTestnet() ? optimismGoerli.id : optimism.id
    );
    const contract = new ethers.Contract(
      isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
      abi.abi,
      provider
    );
    const [, , , , id] = (await contract.editions(tokenId)) ?? [];

    const project = await getProject(id);
    if (project === undefined) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({
      name: project.title,
      image: retrieveVideoThumbnail(project.video_url),
      description: project.description,
      external_url: `https://radarlaunch.app/projects/${id}`,
    });
  } catch (e) {
    console.error(e);
  }

  return res.status(400).json({});
}
