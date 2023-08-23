import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import { useGetTotalContributions } from '@/hooks/useGetTotalContributions';

export function HeroSectionAmount() {
  const { data: exchangeRateData } = useGetExchangeRate();
  const { data: totalContributionData } = useGetTotalContributions();

  console.log({ exchangeRateData, totalContributionData });

  return (
    <h1 className="heading-5">
      {'$' +
        (
          12400 +
          (totalContributionData?.contributionInEth || 0) *
            (exchangeRateData?.ethereum.usd || 0)
        ).toLocaleString('en-US', {
          maximumFractionDigits: 0,
        })}
    </h1>
  );
}
