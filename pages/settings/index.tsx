import { Placeholder } from '@/components/common/Placeholder';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';

export default function SettingsPage() {
  const { isLoggedIn } = useAuth();
  const { wallets } = useWallets();
  const { connectWallet, unlinkWallet, createWallet, exportWallet } =
    usePrivy();
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();

  if (!isLoggedIn) {
    return (
      <Placeholder>
        <h1>Please Login</h1>
      </Placeholder>
    );
  }

  return (
    <section className="mx-auto my-24 max-w-screen-lg">
      <h1 className="text-3xl">Settings Page</h1>
      <h2 className="mb-2 mt-4 font-base text-xl">All connected wallets</h2>
      <div className="grid grid-cols-1 gap-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="grid min-w-full grid-cols-7 items-center justify-between gap-2 rounded-lg border p-4"
          >
            <p className="col-span-3">{wallet.address}</p>
            <p className="col-span-1">{wallet.connectorType}</p>
            <p className="col-span-1">{wallet.chainId}</p>
            <div className="col-span-2 flex justify-end space-x-3">
              <Button
                onClick={() => {
                  const connectedWallet = wallets.find(
                    (w) => w.address === wallet.address,
                  );
                  if (!connectedWallet) {
                    connectWallet();
                  } else {
                    setActiveWallet(connectedWallet);
                  }
                }}
                disabled={wallet.address === activeWallet?.address}
              >
                Make Active
              </Button>
              <Button disabled onClick={() => wallet.fund()}>
                Fund
              </Button>
              <Button
                onClick={() => unlinkWallet(wallet.address)}
                disabled={wallet.connectorType === 'embedded'}
              >
                {wallet.connectorType === 'embedded'
                  ? 'Cannot be unlinked'
                  : 'Unlink'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-3">
        <Button
          onClick={() => createWallet()}
          disabled={
            wallets.filter((wallet) => wallet.connectorType === 'embedded')
              .length === 1
          }
        >
          Create Embedded Wallet
        </Button>
        <Button
          onClick={() => exportWallet()}
          disabled={
            wallets.filter((wallet) => wallet.connectorType === 'embedded')
              .length !== 1
          }
        >
          Export Embedded Wallet
        </Button>
      </div>
    </section>
  );
}
