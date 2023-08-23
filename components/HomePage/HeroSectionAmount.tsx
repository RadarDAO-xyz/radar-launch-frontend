import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import { useGetTotalContributions } from '@/hooks/useGetTotalContributions';

export function HeroSectionAmount() {
  const { data: exchangeRateData } = useGetExchangeRate();
  const { data: totalContributionData } = useGetTotalContributions();

  return (
    <p className="heading-5 text-3xl text-[2rem]">
      {'$' +
        (
          12400 +
          (totalContributionData?.contributionInEth || 0) *
            (exchangeRateData?.ethereum.usd || 0)
        ).toLocaleString('en-US', {
          maximumFractionDigits: 0,
        })}
    </p>
  );
}
