import {
  Chain,
  DEFAULT_MAX_FEE_PER_GAS,
  DEFAULT_MAX_PRIORITY_FEE_PER_GAS,
} from "@/constants";
import { ActionsSchemas } from "@/server/trpc/router/batch/actions";
import { ethers, PayableOverrides } from "ethers";
import create from "zustand";

type State = {
  actions: ActionsSchemas[];
  wallet: string;
  chain: Chain;
  overrides: PayableOverrides;
};

type BundleUpdates = {
  addAction: (action: ActionsSchemas) => void;
  removeAction: (index: number) => void;
  removeAllActions: () => void;
  replaceAction: (index: number) => (action: ActionsSchemas) => void;
  setWallet: (wallet: string) => void;
  setChain: (chain: Chain) => void;
  setOverrides: (overrides: PayableOverrides) => void;
};

const useStore = create<State & BundleUpdates>((set) => ({
  // bundle config
  actions: [],
  wallet: "",
  overrides: {
    maxFeePerGas: DEFAULT_MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: DEFAULT_MAX_PRIORITY_FEE_PER_GAS,
    gasLimit: "0",
  },
  chain: "ethereum",
  setWallet: (wallet: string) => {
    set((state) => ({ ...state, wallet }));
  },
  setChain: (chain: Chain) => {
    set((state) => ({ ...state, chain }));
  },
  setOverrides: (overrides: PayableOverrides) => {
    set((state) => ({ ...state, overrides }));
  },
  addAction: (action: ActionsSchemas) => {
    set((state) => ({ ...state, actions: [...state.actions, action] }));
  },
  removeAction: (index) =>
    set((state) => ({
      ...state,
      actions: [
        ...state.actions.slice(0, index),
        ...state.actions.slice(index + 1),
      ],
    })),
  removeAllActions: () => set({ actions: [] }),
  replaceAction: (index) => (newState) => {
    set((state) => ({
      ...state,
      actions: [
        ...state.actions.slice(0, index),
        newState,
        ...state.actions.slice(index + 1),
      ],
    }));
  },
}));

export const useBundle = useStore;
