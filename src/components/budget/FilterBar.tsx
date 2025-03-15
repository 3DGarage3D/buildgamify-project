
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  searchTerm: string;
  selectedUnidade: string | undefined;
  unidades: string[];
  onSearch: (value: string) => void;
  onUnidadeChange: (value: string) => void;
}

const FilterBar = ({
  searchTerm,
  selectedUnidade,
  unidades,
  onSearch,
  onUnidadeChange,
}: FilterBarProps) => {
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por descrição ou código..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Select
        value={selectedUnidade || "all"}
        onValueChange={onUnidadeChange}
      >
        <SelectTrigger className="w-full flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filtrar por unidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as unidades</SelectItem>
          {unidades.map((un) => (
            <SelectItem key={un} value={un}>
              {un}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
