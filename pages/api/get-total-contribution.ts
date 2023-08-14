import { chains } from "@/components/Web3Provider";
import { CONTRACT_ADDRESS } from "@/constants/address";
import { Alchemy, Network, fromHex } from "alchemy-sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import abi from "@/abi/RadarEditions.sol/RadarEditions.json";
import { formatEther } from "@/lib/utils";

interface Response {
  contributionInEth: number;
}

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.OPT_MAINNET,
};

const alchemy = new Alchemy(settings);

const provider = new ethers.AlchemyProvider(
  chains[0].id,
  process.env.ALCHEMY_API_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const result = await alchemy.nft.getOwnersForContract(CONTRACT_ADDRESS, {
      withTokenBalances: true,
    });
    const tokenBalances = result.owners.reduce<Record<string, number>>(
      (acc, curr) => {
        curr.tokenBalances.forEach((tokenBalance) => {
          if (tokenBalance.tokenId in acc) {
            acc[tokenBalance.tokenId] += tokenBalance.balance;
          } else {
            acc[tokenBalance.tokenId] = tokenBalance.balance;
          }
        });
        return acc;
      },
      {}
    );
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

    const editions = (await contract.getEditions()) as [
      bigint,
      bigint,
      bigint,
      string,
      string
    ][];
    const editionFees = editions.reduce<Record<number, bigint>>(
      (acc, curr, index) => {
        acc[index] = curr[1];
        return acc;
      },
      {}
    );

    const protocolFee = (await contract.protocolFee()) as bigint;

    let finalBalance = 0;
    for (const token in tokenBalances) {
      const tokenId = fromHex(token);
      finalBalance +=
        tokenBalances[token] * +formatEther(editionFees[tokenId] + protocolFee);
    }
    return res.status(200).json({ contributionInEth: finalBalance });
  } catch (e) {
    console.log(e);
  }
  return res.status(400).json({ message: "Error has occured" });
}
