import MerkleTree from 'merkletreejs';
import { utils } from 'ethers';

const merkleTreeOptions = {
  hashLeaves: true,
  sortPairs: true,
};

export const stringToHex = (str: string) => {
  return utils.toUtf8Bytes(str);
};

export const getMerkleTree = (hexLeaves: string[]) => {
  return new MerkleTree(hexLeaves, utils.keccak256, merkleTreeOptions);
};

export const getMerkleRoot = (tree: any) => {
  return tree.getHexRoot();
};

export const getMerkleProof = (tree: any, leaf: string) => {
  const hashedAddress = utils.keccak256(leaf);
  return tree.getHexProof(hashedAddress);
};

export const validateMerkleProof = (
  root: string,
  leaf: string,
  proof: string[]
) => {
  return MerkleTree.verify(
    proof,
    utils.keccak256(leaf),
    root,
    utils.keccak256,
    merkleTreeOptions
  );
};

// example
// let {getMerkleTree, getMerkleRoot, getMerkleProof, validateMerkleProof} = require('./scripts/utils/merkleTree.js')
// a = ['0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e9', '0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e8', '0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e7', '0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e6']
// b= getMerkleTree(a)
// c = getMerkleRoot(b)
// d = getMerkleProof(b, a[0])
// validateMerkleProof(c, a[0], d)
// => true
