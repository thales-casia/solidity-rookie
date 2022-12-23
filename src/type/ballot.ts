import { Bytes } from "ethers";

/**
 * 投票人
 */
export interface IVoter {
  weight:number; // 权重
  voted:boolean;  // 是否投票
  delegate:Bytes; // 投票人address
  vote:number;   // 投票索引
}

/**
 * 每个提议的投票信息
 */
export interface IProposal {
  name:Bytes;   // 名称
  voteCount:number; // 总投票
}