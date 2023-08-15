export default function isTestnet() {
  // return false; // uncomment this line to use mainnet
  return process.env.NODE_ENV !== "production";
}
