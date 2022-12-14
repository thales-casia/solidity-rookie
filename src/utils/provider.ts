import { ethers } from "ethers";

const KEY = 'LAST_ACTIVE_ACCOUNT';
let provider:any;

export function useProvider() {
  if(!provider) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return {KEY, provider: provider as ethers.providers.Web3Provider}
}