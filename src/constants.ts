import { BigNumber } from "ethers";
import { z } from "zod";

export const CUSTODIAN_IDS = {
  fireblocks: 0,
};

/*//////////////////////////////////////////////////////////////
                          CHAIN OPTIONS
//////////////////////////////////////////////////////////////*/

export type Chain = "ethereum" | "goerli";
// Available options for chain on the API
export const ChainOptions = z.enum(["ethereum", "goerli"]);

export enum ChainId {
  ethereum = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  kovan = 42,
  xdai = 100,
  polygon = 137,
  mumbai = 80001,
  avalanche = 43114,
  fuji = 43113, // avalanche test network
  arbitrum = 42161,
  fantom = 250,
  optimism = 10,
  harmony = 1666600000,
}

/*//////////////////////////////////////////////////////////////
                            TOKEN IDS
//////////////////////////////////////////////////////////////*/
export const ETH = "ETH";
export const USDC = "USDC";
export const DAI = "DAI";

/*//////////////////////////////////////////////////////////////
                          STAKING CONSTANTS
//////////////////////////////////////////////////////////////*/

export const LIDO = "LIDO";
export const ROCKETPOOL = "ROCKETPOOL";
/*//////////////////////////////////////////////////////////////
                          SWAP CONSTANTS
//////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////////////////
                            LEND CONSTANTS
  //////////////////////////////////////////////////////////////*/

export const AAVE = "AAVE";
export const COMPOUND = "COMPOUND";

/*//////////////////////////////////////////////////////////////
                                  AUTH0
//////////////////////////////////////////////////////////////*/
export const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL ?? "";
export const AUTH0_MANAGEMENT_API_TOKEN =
  process.env.AUTH0_MANAGEMENT_API_TOKEN ?? "";

/*//////////////////////////////////////////////////////////////
                                  METADATA
//////////////////////////////////////////////////////////////*/

export const UNISWAP_LIST: string =
  "https://gateway.ipfs.io/ipns/tokens.uniswap.org";
export const _1INCH_LIST: string =
  "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link";
export const DEFI_LLAMA_LIST: string = "https://api.llama.fi/protocols";

export const DEFAULT_TOKEN_IMAGE =
  "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png";

/*//////////////////////////////////////////////////////////////
                                  OTHER
//////////////////////////////////////////////////////////////*/

export const GAS_LIMITS = {
  "uniswap-v3": {
    swap: "200000",
  },
  "aave-v2": {
    borrow: "300000",
    deposit: "300000",
    repay: "300000",
    withdraw: "300000",
  },
  lido: {
    stake: "200000",
  },
  erc20: {
    approve: "100000",
  },
};

export const DEFAULT_MAX_FEE_PER_GAS = "20000000000";
export const DEFAULT_MAX_PRIORITY_FEE_PER_GAS = "2000000000";

/*//////////////////////////////////////////////////////////////
                                  DEBUG
//////////////////////////////////////////////////////////////*/
export const WHITELISTED_DOMAINS_TO_ORG: Record<string, number> = {
  "opde.fi": 5,
};

export const OMIT_SUBMIT_TRANSACTION =
  process.env.OMIT_SUBMIT_TRANSACTION ?? "0";
