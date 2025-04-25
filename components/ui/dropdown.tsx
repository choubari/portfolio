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
            <Listbox.Button className="relative w-full bg-[#17191d] border border-gray-800 rounded-md pl-3 pr-10 py-3 text-left text-white cursor-default focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]">
              <span className="block truncate">{selected.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <TbSelector
                  className="h-5 w-5 text-gray-400"
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-[#17191d] border border-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {dropdownList.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      cn(
                        active
                          ? "bg-[var(--color-accent)] text-black"
                          : "text-white",
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
                                ? "text-black"
                                : "text-[var(--color-accent)]",
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
