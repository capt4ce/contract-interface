declare interface GameClaimRewardNftData {
  id: number;
  attributes: {
    rewardMin: number;
    rewardMax: number;
    level: number;
    image: string;
    isSynced: bool;
    initialOwnerAddress: string;
    isMinted: bool;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}