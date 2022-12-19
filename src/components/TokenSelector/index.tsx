import {
  Chain,
  ChainId,
  ChainOptions,
  UNISWAP_LIST,
  _1INCH_LIST,
} from "@/constants";
import Image from "next/image";
import { FC, useEffect, useMemo, useState, Fragment } from "react";
import ReactSelect from "react-select";
import React from "react";
import useTokenStore from "@/store/tokens";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";

interface TokenSelectorParams {
  filter?: string[];
  chain?: Chain;
  value?: { label: string; value: string };
  onChange?: (e: any) => void;
  inputOnChange?: (e: any) => void;
  inputValue?: string;
}

type Token = {
  label: string;
  value: string;
  logoURI: string;
};

const TokenSelector = ({
  filter,
  chain = "ethereum",
  // onChange,
  value,
  inputValue,
  inputOnChange,
}: TokenSelectorParams) => {
  const [tokenOptions, setTokenOptions] = useState<Array<Token>>();
  const [selected, setSelected] = useState<Token>();

  const chainIdMap = useTokenStore((state) => state.chainIdMap);

  useEffect(() => {
    const chainId: number = ChainId[chain as keyof typeof ChainId];
    const data = chainIdMap[chainId]?.filter(
      (t: any) => !filter || t.address in filter
    );
    const options = data?.map((t: any) => ({
      label: t.symbol,
      value: t.address,
      logoURI: t.logoURI,
    }));

    setTokenOptions(options);
    setSelected(options[0]);
  }, [chain, filter]);
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  const onChange = (token: Token) => {
    setSelected(token);
  };
  return (
    <div className=" flex items-center border border-solid border-slate-300 rounded-2xl">
      {/* input value box */}
      <input
        type="number"
        className="
        form-control
        w-32
        block
        px-3
        py-1.5
        text-base
        font-normal
        text-slate-900
        bg-white bg-clip-padding
        border-none
        rounded-2xl
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
        id="inputstack"
        placeholder="0.0"
        value={inputValue}
        onChange={inputOnChange}
        required
      />
      {/* currency list option  */}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1 mb-1 mr-1">
              {/* {JSON.stringify(selected)} */}
              <Listbox.Button className="relative w-full cursor-default rounded-2xl border-none bg-slate-100 py-2 pt-1 pb-1 pl-2 pr-10 text-left shadow-sm focus:border-none focus:outline-none  sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={selected?.logoURI}
                    alt=""
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate">{selected?.label}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-slate-900"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {tokenOptions?.map((option, index) => {
                    return (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-slate-900 bg-slate-100"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-4"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={option?.logoURI}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {option?.label}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-slate-100" : "text-slate-900",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {/* {inputOnChange ? (
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
      ></ReactSelect> */}
    </div>
  );
};

export default TokenSelector;
