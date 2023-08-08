import { useGetExchangeRate } from "@/hooks/useGetExchangeRate";
import { convertWeiToUsdOrEth } from "@/lib/convertWeiToUsdOrEth";

interface Props {
  data?: readonly {
    status: number;
    fee: bigint;
    balance: bigint;
    owner: `0x${string}`;
    id: string;
  }[];
  exchangeRateData?: ReturnType<typeof useGetExchangeRate>["data"];
}

export function HeroSectionAmount({ data, exchangeRateData }: Props) {
  return (
    <h1 className="heading-5">
      {"$" +
        (
          12400 +
          (data && exchangeRateData?.rates?.ETH
            ? +convertWeiToUsdOrEth(
                data.reduce((acc, edition) => acc + edition.balance, 0n),
                exchangeRateData.rates.ETH
              )
            : 0)
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}
    </h1>
  );
}
