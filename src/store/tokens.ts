import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChainId, _1INCH_LIST } from "@/constants";

type Version = {
  major: number;
  minor: number;
  patch: number;
};

type Token = {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

type Tokens = {
  name: string;
  timestamp: string;
  version: Version;
  keywords: Array<string>;
  tokens: Array<Token>;
  logoURI: string;
};

interface State {
  data: Tokens;
  chainIdMap: Record<number, Array<Token>>;
  addressMap: Record<string, Token>;
  getData: (() => Promise<void>) | (() => void);
}

const initialState = {
  name: "",
  timestamp: "",
  version: {
    major: 0,
    minor: 0,
    patch: 0,
  },
  keywords: [],
  tokens: [
    {
      address: "",
      chainId: 0,
      name: "",
      symbol: "",
      decimals: 0,
      logoURI: "",
    },
  ],
  logoURI: "",
};

const useTokenStore = create<State>()(
  devtools(
    persist((set) => ({
      data: initialState,
      chainIdMap: {},
      addressMap: {},
      getData: async () => {
        console.log("fetch tokens");
        const response = await fetch(_1INCH_LIST);
        const data = await response.json();
        const chanIdTemp: any = {};
        const addressTemp: any = {};
        data.tokens.forEach((item: Token) => {
          if (chanIdTemp[item.chainId]) {
            chanIdTemp[item.chainId].push(item);
          } else {
            chanIdTemp[item.chainId] = [];
          }

          // addressMap
          if (!addressTemp[item.address]) {
            addressTemp[item.address] = item;
          }
        });

        set({
          data: data,
          chainIdMap: chanIdTemp,
          addressMap: addressTemp,
        });
      },
    })),
    { name: "Token Store" }
  )
);

export default useTokenStore;
