import { EditionStatus } from '@/types/web3';

export function convertOnChainStatusName(status: EditionStatus) {
  switch (status) {
    case EditionStatus.NOT_CREATED:
      return 'Not Created';
    case EditionStatus.CREATED:
      return 'Created';
    case EditionStatus.LAUNCHED:
      return 'Launched';
    case EditionStatus.STOPPED:
      return 'Stopped';
  }
}
