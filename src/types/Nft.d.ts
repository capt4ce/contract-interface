declare interface NftInterface {
  owner_of: string,
  amount: string,
  block_number_minted: string,
  contract_type: string,
  last_metadata_sync: string,
  last_token_uri_sync: string,
  metadata: string | null,
  name: string,
  symbol: string,
  synced_at: string,
  token_address: string,
  token_hash: string,
  token_id: string,
  token_uri: string,
}

declare interface NftOwnershipInterface {
  ownerAddress: string,
  ownerName: string,
  nftCount: number,
  nftPercentage: number;
  nfts: NftInterface[];
}

