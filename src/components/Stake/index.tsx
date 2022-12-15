import React, { useState } from "react";
import ProtocolSelector from "@/components/ProtocolSelector";
import { useBundle } from "@/store";
import Close from "../Button/close";
import { LidoStake, ConvexStake, Venues, Actions } from "types/actions";
import TokenSelector from "../TokenSelector";

const Stake = () => {
  const selectedChain = useBundle((state) => state.chain);

  type StakeActions = LidoStake | ConvexStake;
  const StakeActions: string[] = [Actions.LidoStake, Actions.ConvexStake];

  const [bundleItem, replaceBundleItem] = useState<StakeActions>({
    action: "LidoStake",
    amount: "0",
    token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  });
  const onDelete = () => {};

  return (
    <div className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <Close onClick={onDelete}></Close>
      <h1 className="text-2xl dark:text-gray-300">{bundleItem.action}</h1>
      <div className="mt-4 flex">
        <TokenSelector
          chain={selectedChain}
          inputValue={bundleItem.amount}
          inputOnChange={(e) => {
            replaceBundleItem({
              ...bundleItem,
              amount: e.target.value,
            });
          }}
          onChange={(e) => {
            replaceBundleItem({
              ...bundleItem,
              token: e.value,
            });
          }}
        />
        <span className="pt-2 pr-2 dark:text-gray-200">On</span>
        <div className="w-48">
          <ProtocolSelector
            chain={selectedChain}
            filter={StakeActions.map(
              (action) => Venues[action as keyof typeof Venues]
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Stake;
