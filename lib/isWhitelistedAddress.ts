export function isWhitelistedAddress(address?: string) {
  return (
    address !== undefined &&
    process.env.WHITELISTED_ADDRESSES !== undefined &&
    process.env.WHITELISTED_ADDRESSES.split(',')
      .map((address) => address.toUpperCase())
      .includes(address.toUpperCase())
  );
}
