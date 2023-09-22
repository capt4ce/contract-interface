export const NETWORK_RINKEBY: NetworkConfigInterface = {
  name: 'rinkeby',
  chainId: '0x4',
  rpc: '',
};

export const NETWORK_KOVAN: NetworkConfigInterface = {
  name: 'kovan',
  chainId: '0x2a',
  rpc: 'https://speedy-nodes-nyc.moralis.io/dda5f5ddc1f38f3993cf0492/eth/kovan',
};

export const NETWORK_OPTIMISM_TESTNET: NetworkConfigInterface = {
  name: 'optimism_testnet',
  chainId: '0x45',
  rpc: 'https://opt-kovan.g.alchemy.com/v2/D-1NYyE8EKxj88d8gmb_l2Sv29TVVE9M',
};

export const NETWORK_MUMBAI: NetworkConfigInterface = {
  name: 'mumbai',
  chainId: '0x1F41',
  rpc: 'https://polygon-mumbai.g.alchemy.com/v2/Z-BgeWYN1BzmEjymRy1DaQtlEa6QeEgB',
};

export const NETWORK_GOERLI: NetworkConfigInterface = {
  name: 'goerli',
  chainId: '0x5',
  rpc: 'https://eth-goerli.g.alchemy.com/v2/vHjg4N-ayJpweA0TtSo8kDUUnmbou1Tq',
};

export const SUPPORTED_NETWORKS: Record<string, NetworkConfigInterface> = {
  rinkeby: NETWORK_RINKEBY,
  kovan: NETWORK_KOVAN,
  optimism_testnet: NETWORK_OPTIMISM_TESTNET,
  mumbai: NETWORK_MUMBAI,
};
