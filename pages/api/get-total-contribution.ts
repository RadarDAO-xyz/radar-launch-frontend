import { chains } from '@/components/Providers/Web3Provider';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
import abi from '@/abi/RadarEditions.sol/RadarEditions.json';
import { formatEther } from '@/lib/utils';
import cache from 'memory-cache';

interface Response {
  contributionInEth: number;
}

const provider = new ethers.AlchemyProvider(
  chains[0].id,
  process.env.ALCHEMY_API_KEY,
);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

interface OwnerBalance {
  ownerAddress: string;
  tokenBalances: {
    tokenId: string; // in hex
    balance: number;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { message: string }>,
) {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Not found' });
  }
  if (cache.get('total-contribution') !== null) {
    console.log('cache hit');
    return res
      .status(200)
      .json({ contributionInEth: cache.get('total-contribution') });
  }
  console.log('cache miss');
  try {
    const response = await fetch(
      `https://opt-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getOwnersForCollection?contractAddress=${CONTRACT_ADDRESS}&withTokenBalances=true`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (!response.ok) {
      console.error(response);
      throw new Error('Error fetching alchemy data');
    }
    const result = (await response.json()) as {
      ownerAddresses: OwnerBalance[];
    };
    const editionIdToBalance = result.ownerAddresses.reduce<
      Record<string, number>
    >((acc, curr) => {
      curr.tokenBalances.forEach((tokenBalance) => {
        if (tokenBalance.tokenId in acc) {
          acc[tokenBalance.tokenId] += tokenBalance.balance;
        } else {
          acc[tokenBalance.tokenId] = tokenBalance.balance;
        }
      });
      return acc;
    }, {});

    const editions = (await contract.getEditions()) as [
      bigint,
      bigint,
      bigint,
      string,
      string,
    ][];
    const editionIdToFees = editions.reduce<Record<number, bigint>>(
      (acc, curr, index) => {
        acc[index] = curr[1];
        return acc;
      },
      {},
    );

    const protocolFee = (await contract.protocolFee()) as bigint;

    let finalBalance = 0;
    for (const token in editionIdToBalance) {
      const tokenId = parseInt(token);
      finalBalance +=
        editionIdToBalance[token] *
        +formatEther(editionIdToFees[tokenId] + protocolFee);
    }
    // cache every 5 mins
    cache.put('total-contribution', finalBalance, 5 * 60 * 1000);
    return res.status(200).json({ contributionInEth: finalBalance });
  } catch (e) {
    console.log(e);
  }
  return res.status(400).json({ message: 'Error has occured' });
}
