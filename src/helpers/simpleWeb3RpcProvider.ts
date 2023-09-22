import { StaticJsonRpcProvider } from '@ethersproject/providers';

const RPC_URL = process.env.REACT_APP_RPC_URL;

export const simpleWeb3RpcProvider = new StaticJsonRpcProvider(RPC_URL);

export default null;
