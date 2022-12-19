import React from "react";
import { Chain, DEFI_LLAMA_LIST } from "@/constants";
import { useEffect, useState, Fragment } from "react";
import ReactSelect from "react-select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";

interface ProtocolSelectorParams {
  filter?: string[];
  chain?: Chain;
}

type Protocol = {
  label: string;
  value: string;
  logoURI: string;
};

const ProtocolSelector = ({
  chain = "ethereum",
  filter,
}: ProtocolSelectorParams) => {
  const [protocolOptions, setProtocolOptions] = useState<Array<Protocol>>();
  const [selected, setSelected] = useState<Protocol>();

  useEffect(() => {
    (async () => {
      const response = await fetch(DEFI_LLAMA_LIST);
      const data = await response.json();
      const options = data
        .filter(
          (t: {
            chains: string[];
            name: string;
            address: string;
            logo: string;
          }) =>
            t.chains.includes(
              (chain as string).charAt(0).toUpperCase() +
                (chain as string).slice(1)
            ) &&
            (!filter || filter.includes(t.address))
        )
        .map(
          (t: {
            chains: string[];
            name: string;
            address: string;
            logo: string;
          }) => ({
            label: t.name,
            value: t.address,
            logoURI: t.logo,
          })
        );

      setProtocolOptions(options);
      setSelected(options[0]);
    })();
  }, [chain, filter]);

  const onChange = (protocol: Protocol) => {
    setSelected(protocol);
  };
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-xl border-none bg-slate-100 py-2 pl-3 pt-2 pb-2 pr-10 text-left shadow-sm focus:border-none focus:outline-none  sm:text-sm">
              <span className="flex items-center">
                <img
                  src={selected?.logoURI}
                  alt=""
                  className="h-8 w-8 flex-shrink-0 rounded-full"
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
                {protocolOptions?.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-slate-900 bg-slate-100"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-3"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={option.logoURI}
                            alt=""
                            className="h-7 w-7 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-slate-100" : "text-slate-900",
                              "absolute inset-y-0 right-0 flex items-center pr-1"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default ProtocolSelector;
