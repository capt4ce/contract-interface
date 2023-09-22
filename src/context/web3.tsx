import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import { providers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

interface Web3ContextInterface {
  provider: any;
  address: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const Web3Context = React.createContext<Web3ContextInterface>({
  provider: null,
  address: '',
  connectWallet: () => {},
  disconnectWallet: () => {},
});

const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3Modal, setWeb3Modal] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: 'mainnet',
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect();

    addListeners(provider);

    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    setProvider(provider);
    setAddress(userAddress);
  }, [web3Modal]);

  async function disconnectWallet() {
    const provider = await web3Modal.connect();
    if (provider.close) {
      await provider.close();
    }

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavior.
    await web3Modal.clearCachedProvider();
    localStorage.removeItem('walletconnect');

    setAddress('');
    setProvider(null);
  }

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal, connectWallet]);

  async function addListeners(web3ModalProvider: any) {
    web3ModalProvider.on('accountsChanged', (accounts: string[]) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on('chainChanged', (chainId: number) => {
      window.location.reload();
    });
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        address,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3 = (): Web3ContextInterface => {
  const context = React.useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { Web3Provider, useWeb3 };
