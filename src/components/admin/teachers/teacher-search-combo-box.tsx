import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface Guru {
  id: string;
  nama: string;
  nip: string;
  nuptk?: string;
}

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TeacherSearchComboboxProps {
  teachers: Guru[];
  selectedTeacherId: string | undefined;
  onSelect: (teacherId: string) => void;
}

export function TeacherSearchCombobox({
  teachers,
  selectedTeacherId,
  onSelect,
}: TeacherSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTeacherName = teachers.find(
    (teacher) => teacher.id === selectedTeacherId
  )?.nama;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between"
        >
          {selectedTeacherId ? selectedTeacherName : "Pilih Wali Kelas..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-[300px]">
        <Command>
          <CommandInput placeholder="Cari Guru..." />
          <CommandList>
            <CommandEmpty>Guru tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {teachers.map((teacher) => (
                <CommandItem
                  key={teacher.id}
                  value={`${teacher.nama} ${teacher.nuptk}`}
                  onSelect={() => {
                    onSelect(teacher.id);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTeacherId === teacher.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {teacher.nama} ({teacher.nuptk})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
