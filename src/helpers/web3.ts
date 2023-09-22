import { ethers } from 'ethers';
import { SUPPORTED_NETWORKS } from '../constants/networks';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

const rpcProviders: Record<string, any> = {};

export const getRpcProvider = (network: string) => {
    const networkConfig = SUPPORTED_NETWORKS[network];
    if (!networkConfig) throw Error('network not found');

    if (!rpcProviders[network]) {
        rpcProviders[network] = new StaticJsonRpcProvider(networkConfig.rpc);
    }

    return rpcProviders[network];
};

export const replaceIpfsGateway = (ipfsUri: string) => {
    return (ipfsUri || "")
        .replace('ipfs://', process.env.REACT_APP_IPFS_GATEWAY || '')
        .replace(
            'https://gateway.moralisipfs.com/ipfs/',
            process.env.REACT_APP_IPFS_GATEWAY || ''
        );
};

export const getFunctionSignature = (functionAbiStr: string) => {
    return ethers.utils
        .solidityKeccak256(['string'], [functionAbiStr])
        .slice(0, 10);
};