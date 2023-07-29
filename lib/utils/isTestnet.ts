export default function isTestnet() {
  // return true; // uncomment this line to use mainnet
  return process.env.NODE_ENV !== "production";
}
