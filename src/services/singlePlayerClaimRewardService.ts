import { request, gql } from 'graphql-request';

export const getWallet = async (walletAddress: string) => {
  const query = gql`
    query wallets($walletAddress: String){
        wallets(filters: {address: {eq: $walletAddress}}){
          data{
            id
            attributes{
              address
              totalBalance
              frozenBalance
            }
          }
        }
      }`;


  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, {
    walletAddress
  });
  return data?.wallets?.data || [];
};

export const getGameNfts = async (walletAddress: string) => {
  const query = gql`
    query nfts($walletAddress: String){
        nfts(filters: {initialOwnerAddress: {eq: $walletAddress}}, pagination: {pageSize: 1000}){
          data{
            id
            attributes{
              rewardMin
              rewardMax
              level
              image
              isSynced
              initialOwnerAddress
              isMinted
              createdAt
              updatedAt
              publishedAt
            }
          }
        }
      }`;


  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, {
    walletAddress
  });
  return data?.nfts?.data || [];
};

export const mintNft = async (walletAddress: string) => {
  const query = gql`
    mutation mintNft($walletAddress: String!){
      mintNft(walletAddress: $walletAddress){
        tokenId
        rewardMin
        rewardMax
        signature
      }
    }
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, { walletAddress });
  return data?.mintNft;
};

export const mintNftDone = async (tokenId: string) => {
  const query = gql`
    mutation mintNftDone($tokenId: String!){
      mintNftDone(tokenId: $tokenId)
    } 
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, { tokenId });
  return data?.mintNftDone;
};

export const claimReward = async (walletAddress: string, tokenId: string) => {
  const query = gql`
    mutation claimReward($walletAddress: String!, $tokenId: String!){
      claimReward(walletAddress: $walletAddress, tokenId: $tokenId)
    } 
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, {
    walletAddress,
    tokenId
  });
  return data?.claimReward;
};

export const evolveNft = async (walletAddress: string, tokenId: string) => {
  const query = gql`
    mutation evolveNft($walletAddress: String!, $tokenId: String!){
      evolveNft(walletAddress: $walletAddress, tokenId: $tokenId)
    }
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, {
    walletAddress,
    tokenId
  });
  return data?.evolveNft;
};

export const syncNft = async (walletAddress: string, tokenId: string) => {
  const query = gql`
   mutation syncNft($walletAddress: String!, $tokenId: String!){
      syncNft(walletAddress: $walletAddress, tokenId: $tokenId){
        tokenId,
        level
        rewardMin
        rewardMax
        signature
      }
    } 
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, {
    walletAddress,
    tokenId
  });
  return data?.syncNft;
};

export const syncNftDone = async (tokenId: string) => {
  const query = gql`
    mutation syncNftDone($tokenId: String!){
      syncNftDone(tokenId: $tokenId)
    }  
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, { tokenId });
  return data?.syncNftDone;
};

export const withdrawCoin = async (walletAddress: string) => {
  const query = gql`
    mutation withdrawCoin($walletAddress: String!){
      withdrawCoin(walletAddress: $walletAddress) {
        amount
        nonce
        signature
      }
    }   
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, { walletAddress });
  return data?.withdrawCoin;
};

export const withdrawCoinDone = async (walletAddress: string) => {
  const query = gql`
    mutation withdrawCoinDone($walletAddress: String!){
      withdrawCoinDone(walletAddress: $walletAddress)
    }  
  `;

  const data = await request(process.env.REACT_APP_CLAIM_REWARD_GAME_GRAPHQL_ENDPOINT || "", query, { walletAddress });
  return data?.withdrawCoinDone;
};