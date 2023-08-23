import { formatEther } from 'viem';

export function convertWeiToUsdOrEth(wei: bigint, exchangeRate?: number) {
  if (exchangeRate !== undefined) {
    return String(+formatEther(wei) * exchangeRate);
  }
  return formatEther(wei);
}
