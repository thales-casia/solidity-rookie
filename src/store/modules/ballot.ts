import { IProposal, IVoter } from './../../type/ballot';
import { address } from './../../utils/contract/owner';
import BALLOT from "@/utils/contract/ballot";
import { useProvider } from "@/utils/provider";
import { ethers } from "ethers";
import { defineStore } from 'pinia';

const { KEY, provider } = useProvider()
/**
 * 模型平台页面
 */
const useBallot = defineStore({
  id: 'ballot',
  state: () => ({
    chairperson: <string|null>null,
    voters: <IVoter[]>([]),
    proposals: <IProposal[]>([]),
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
    /**
     * 是否有权限
     */
    isChair():boolean {
      if(this.address && this.chairperson ){
        return (this.address.toLowerCase() == this.chairperson.toLowerCase());
      }else
        return false;
    }
  },
  actions: {
    /**
     * 赋予投票权限
     */
    giveRightToVote(address:string) {
      const contract = new ethers.Contract(BALLOT.address, BALLOT.abi, provider.getSigner());
      contract.giveRightToVote(address).then((res:any) => {
        console.log(res);
      });
    },
    delegate(address:string) {
      const contract = new ethers.Contract(BALLOT.address, BALLOT.abi, provider.getSigner());
      contract.delegate(address).then((res:any) => {
        console.log(res);
      });
    },
    /**
     * 投票
     * @param index 索引
     */
    vote(index:number) {
      const contract = new ethers.Contract(BALLOT.address, BALLOT.abi, provider.getSigner());
      contract.vote(index).then((res:any) => {
        console.log(res);
      });
    },
    /**
     * 投票结果
     */
    winningProposal() {
      const contract = new ethers.Contract(BALLOT.address, BALLOT.abi, provider.getSigner());
      contract.winningProposal().then((res:any) => {
        console.log(res);
      });
    },
    /**
     * 通过提议名称
     */
    winnerName() {
      const contract = new ethers.Contract(BALLOT.address, BALLOT.abi, provider.getSigner());
      contract.winnerName().then((res:any) => {
        console.log(res)
      });
    }
  }
});
export default useBallot;