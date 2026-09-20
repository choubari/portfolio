"use client";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { TbSelector } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/types";

interface SelectMenuProps {
  dropdownList: Dropdown[];
  selected: Dropdown;
  setSelected: Dispatch<SetStateAction<Dropdown>>;
}

export default function SelectMenu({
  dropdownList,
  selected,
  setSelected,
}: SelectMenuProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full cursor-default rounded-sm border border-[var(--rule)] bg-[var(--surface)] py-3 pl-3 pr-10 text-left text-[var(--ink)] focus:border-[var(--action)] focus:outline-none focus:ring-1 focus:ring-[var(--action)]">
              <span className="block truncate">{selected.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <TbSelector
                  className="h-5 w-5 text-[var(--faint)]"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm border border-[var(--rule)] bg-[var(--surface)] py-1 text-base shadow-[0_6px_20px_rgba(25,25,25,0.10)] focus:outline-none sm:text-sm">
                {dropdownList.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      cn(
                        active
                          ? "bg-[var(--action)] text-white"
                          : "text-[var(--ink)]",
                        "cursor-default select-none relative py-2 pl-8 pr-4"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item.label}
                        </span>

                        {selected ? (
                          <span
                            className={cn(
                              active
                                ? "text-white"
                                : "text-[var(--action)]",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
