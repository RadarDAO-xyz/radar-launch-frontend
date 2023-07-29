import { GOERLI_CONTRACT_ID, MAINNET_CONTRACT_ID } from "@/constants/paper";
import isTestnet from "@/lib/utils/isTestnet";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  checkoutLinkIntentUrl: string;
  transactionId: string;
  estimatedPrice: { value: string; currency: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>
) {
  if (req.method !== "POST") {
    return res.status(404).send("Not found");
  }
  try {
    const { fee, address } = req.body;
    console.log("hello", { fee, address });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.PAPER_API_KEY,
      },
      body: JSON.stringify({
        contractId: isTestnet() ? GOERLI_CONTRACT_ID : MAINNET_CONTRACT_ID,
        title: "RADAR Editions - Create Project",
        // description: "Describe your project *with Markdown!*",
        // imageUrl: "https://unsplash.it/240/240",
        // successCallbackUrl: "string",
        // cancelCallbackUrl: "string",
        // walletAddress: "string",
        // email: "string",
        sendEmailOnCreation: true,
        quantity: 1,
        metadata: {},
        mintMethod: {
          name: "createEdition",
          args: { owner: address || "$WALLET", fee },
          payment: { currency: "ETH", value: "0" },
        },
        // contractArgs: "string",
        feeBearer: "BUYER",
        sendEmailOnTransferSucceeded: true,
      }),
    };
    return res
      .status(200)
      .send(
        await fetch(
          "https://withpaper.com/api/2022-08-12/checkout-link-intent",
          options
        ).then((response) => response.json())
      );
  } catch (e) {
    console.log(e);
    return res.status(400).send("Error has occured");
  }
}
