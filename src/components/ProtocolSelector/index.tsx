import React from "react";
import { Chain, DEFI_LLAMA_LIST } from "@/constants";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

interface ProtocolSelectorParams {
  filter?: string[];
  chain?: Chain;
}

const ProtocolSelector = ({
  chain = "ethereum",
  filter,
}: ProtocolSelectorParams) => {
  const [protocolOptions, setProtocolOptions] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(DEFI_LLAMA_LIST);
      const data = await response.json();
      const options = data
        .filter(
          (t: { chains: string[]; name: string; address: string }) =>
            t.chains.includes(
              (chain as string).charAt(0).toUpperCase() +
                (chain as string).slice(1)
            ) &&
            (!filter || filter.includes(t.address))
        )
        .map((t: { chains: string[]; name: string; address: string }) => ({
          label: t.name,
          value: t.address,
        }));
      setProtocolOptions(options);
    })();
  }, [chain, filter]);

  return <ReactSelect options={protocolOptions}></ReactSelect>;
};

export default ProtocolSelector;
