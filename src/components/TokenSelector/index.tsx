import {
  Chain,
  ChainId,
  ChainOptions,
  UNISWAP_LIST,
  _1INCH_LIST,
} from "@/constants";
import Image from "next/image";
import { FC, useEffect, useMemo, useState } from "react";
import ReactSelect from "react-select";
import React from "react";
import useTokenStore from "@/store/tokens";

interface TokenSelectorParams {
  filter?: string[];
  chain?: Chain;
  value?: { label: string; value: string };
  onChange?: (e: any) => void;
  inputOnChange?: (e: any) => void;
  inputValue?: string;
}

type Token = {
  "label": string,
  "value": string,
};

const TokenSelector = ({
  filter,
  chain = "ethereum",
  onChange,
  value,
  inputValue,
  inputOnChange,
}: TokenSelectorParams) => {
  const [tokenOptions, setTokenOptions] = useState<Array<Token>>();

  const chainIdMap = useTokenStore((state) => state.chainIdMap);

  useEffect(() => {
      const chainId:number = ChainId[chain as keyof typeof ChainId];
      const data = chainIdMap[chainId]?.filter((t: any) =>
          (!filter || t.address in filter)
      );
      const options = data?.map((t: any) => ({
        label: t.symbol,
        value: t.address,
      }));
      setTokenOptions(options);
  }, [chain, filter]);

  return (
    <div className="flex">
      {inputOnChange ? (
        <input
          className="inline-block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          type="number"
          value={inputValue}
          onChange={inputOnChange}
          required
        />
      ) : (
        ""
      )}
      <ReactSelect
        options={tokenOptions}
        value={value}
        onChange={onChange}
      ></ReactSelect>
    </div>
  );
};

export default TokenSelector;
