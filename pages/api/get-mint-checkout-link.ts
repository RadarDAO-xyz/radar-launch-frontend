import { GOERLI_CONTRACT_ID, MAINNET_CONTRACT_ID } from "@/constants/paper";
import { formatEther } from "@/lib/utils";
import isTestnet from "@/lib/isTestnet";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  checkoutLinkIntentUrl: string;
  transactionId: string;
  estimatedPrice: { value: string; currency: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { message: string }>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const { editionId, value, quantity, title, imageUrl, projectId } = req.body;
    console.log({ editionId, value, quantity, title, imageUrl, projectId });
    if (editionId === undefined || !value || !quantity || !title || !imageUrl) {
      return res.status(400).json({ message: "Invalid editionId or value" });
    }
    const ethValue = formatEther(value).toString();
    console.log(ethValue);
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.PAPER_API_KEY,
      },
      body: JSON.stringify({
        contractId: isTestnet() ? GOERLI_CONTRACT_ID : MAINNET_CONTRACT_ID,
        title,
        imageUrl,
        // description: "Describe your project *with Markdown!*",
        successCallbackUrl: projectId
          ? `https://radarlaunch.app/project/${projectId}`
          : "https://radarlaunch.app",
        cancelCallbackUrl: "https://radarlaunch.app/project/create",
        sendEmailOnCreation: true,
        quantity,
        metadata: {},
        mintMethod: {
          name: "mintEdition",
          args: {
            editionId,
            buyer: "$WALLET",
            amount: "$QUANTITY",
            data: "0x0000000000000000000000000000000000000000000000000000000000000000",
          },
          payment: { currency: "ETH", value: `${ethValue} * $QUANTITY` },
        },
        // contractArgs: "string",
        feeBearer: "BUYER",
        sendEmailOnTransferSucceeded: true,
      }),
    };

    const response = await fetch(
      "https://withpaper.com/api/2022-08-12/checkout-link-intent",
      options
    ).then((response) => response.json());
    if (response.error) {
      throw response.error;
    }
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error has occured" });
  }
}
