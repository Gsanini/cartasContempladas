"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface OptionsInterface {
  label: string;
  value: string | number | boolean | null;
}

interface Props {
  options: OptionsInterface[];
  value: string | number | boolean | null;
  setValue: (value: string | number | boolean | null) => void;
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  placeholderClassName?: string;
}

export default function SelectWithSearch({
  options,
  setValue,
  value,
  title,
  disabled = false,
  placeholder = "Selecione uma opção...",
  className = "",
  placeholderClassName = "text-gray-400 text-[12px]",
}: Props) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  const findSelectedOption = (
    searchValue: string | number | boolean | null
  ) => {
    return options.find((option) => {
      if (searchValue === null || searchValue === undefined) {
        return option.value === null || option.value === undefined;
      }

      if (typeof searchValue === "boolean") {
        return option.value === searchValue;
      }

      return String(option.value) === String(searchValue);
    });
  };

  const selectedOption = findSelectedOption(value);

  return (
    <div>
      {title && <Label htmlFor={id}>{title}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            id={id}
            variant='select'
            role='combobox'
            aria-expanded={open}
            className={cn("overflow-hidden w-full min-w-0", className)}
            icon={
              <ChevronDownIcon
                size={13}
                className='text-gray-400 shrink-0'
                aria-hidden='true'
              />
            }
          >
            <span
              className={cn(
                "truncate text-left min-w-0 overflow-hidden text-ellipsis whitespace-nowrap flex-1",
                !selectedOption && placeholderClassName
              )}
              title={selectedOption?.label || placeholder}
            >
              {selectedOption?.label || placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-[var(--radix-popper-anchor-width)] p-0'
          align='start'
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          <Command className='bg-transparent text-dark-green'>
            <CommandInput placeholder='Pesquisar...' className='text-[12px]' />
            <CommandList
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={`${option.value}-${index}`}
                    value={`${option.value} ${option.label}`}
                    onSelect={() => {
                      setValue(option.value);
                      setOpen(false);
                    }}
                    className='text-[12px]'
                  >
                    {option.label}
                    {selectedOption?.value === option.value && (
                      <CheckIcon
                        size={16}
                        className='ml-auto text-dark-green/80'
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
