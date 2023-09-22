import React from 'react';
import { Button, Dropdown } from 'flowbite-react';
import { useWeb3 } from '../context/web3';
import { textEllipsis } from '../helpers/string';

const Web3connect = () => {
  const { provider, connectWallet, disconnectWallet, address } = useWeb3();
  return provider ? (
    <Dropdown label={textEllipsis(address)}>
      <Dropdown.Item onClick={disconnectWallet}>Disconnect</Dropdown.Item>
    </Dropdown>
  ) : (
    <Button onClick={connectWallet}>Connect Wallet</Button>
  );
};
export default Web3connect;
