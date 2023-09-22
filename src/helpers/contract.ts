import type { Signer } from '@ethersproject/abstract-signer';
import type { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import erc20Abi from '../../public/abis/erc20.json';
import { simpleWeb3RpcProvider } from './simpleWeb3RpcProvider';

// Types
import { NFT_CONTRACT, VOTING_CONTRACT } from '../constants/app';
import { ethers } from 'ethers';

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?
    signer?.constructor.name === 'StaticJsonRpcProvider' ?
      signer :
      new ethers.providers.Web3Provider((signer) as any)?.getSigner?.() :
    simpleWeb3RpcProvider;
  const contract = new Contract(address, abi, signerOrProvider);
  return contract;
};
