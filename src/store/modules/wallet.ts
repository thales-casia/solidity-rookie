import { abi, address } from "@/utils/contract/owner";
import { useProvider } from "@/utils/provider";
import { ethers } from "ethers";
import { defineStore } from 'pinia';

const { KEY, provider } = useProvider()
/**
 * 模型平台页面
 */
const useWallet = defineStore({
  id: 'wallet',
  state: () => ({
    owner: <string|null>null,
    address: <string|null>null
  }),
  getters: {
    /**
     * 展位介绍
     */
    account():any {
      if(!this.address) {
        this.address = window.localStorage.getItem(KEY);
        
      }
      return this.address;
    },
    isOwner():boolean {
      if(this.address && this.owner ){
        return (this.address.toLowerCase() == this.owner.toLowerCase());
      }else
        return false;
    }
  },
  actions: {
    /**
     * 链接
     */
    connect() {
      provider?.send("eth_requestAccounts", []).then(res => {
        this.address = res[0];
        window.localStorage.setItem(KEY, res[0]);
        this.getOwner();
      }).catch(err => {
        console.log(err);
      });
    },
    disconnect() {
      this.address = '';
      window.localStorage.removeItem(KEY);
    },
    getAddress() {
      provider.getSigner().getAddress().then(res => {
        if(this.address != res) {
          this.address = res;
          window.localStorage.setItem(KEY, res);
        }
      });
    },
    getOwner() {
      const contract = new ethers.Contract(address, abi, provider.getSigner());
      contract.getOwner().then((res:any) => {
        this.owner = res;
      });
    },
    changeOwner(p:string) {
      const contract = new ethers.Contract(address, abi, provider.getSigner());
      contract.changeOwner(p)
    }
  }
});
export default useWallet;