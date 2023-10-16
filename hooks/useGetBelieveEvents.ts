import { CONTRACT_ADDRESS } from '@/constants/address';
import { CacheKey } from '@/constants/react-query';
import { usePublicClient, useQuery } from 'wagmi';

const START_BLOCK_FOR_BELIEVE = 108947105n;

export function useGetBelieveEvents(
  _id: string,
  editionId?: number,
  isDisabled?: boolean,
) {
  const { getLogs } = usePublicClient();
  return useQuery(
    [CacheKey.BELIEVER_LOGS, editionId, _id],
    () => {
      return getLogs({
        address: CONTRACT_ADDRESS,
        args: {
          editionId: BigInt(editionId || 0),
        },
        event: {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'editionId',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'believer',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'tags',
              type: 'string',
            },
          ],
          name: 'EditionBelieved',
          type: 'event',
        },
        fromBlock: START_BLOCK_FOR_BELIEVE,
      });
    },
    {
      enabled:
        editionId !== undefined &&
        editionId > 0 &&
        _id !== undefined &&
        !isDisabled,
    },
  );
}
