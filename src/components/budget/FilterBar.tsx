
import React from "react";
import { Search, Filter, SlidersHorizontal, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  searchTerm: string;
  selectedUnidade: string | undefined;
  unidades: string[];
  selectedCategorias?: string[];
  categorias?: string[];
  onSearch: (value: string) => void;
  onUnidadeChange: (value: string) => void;
  onCategoriaChange?: (value: string[]) => void;
  stockFilter?: 'all' | 'in-stock' | 'low-stock';
  onStockFilterChange?: (value: 'all' | 'in-stock' | 'low-stock') => void;
}

const FilterBar = ({
  searchTerm,
  selectedUnidade,
  unidades,
  selectedCategorias = [],
  categorias = [],
  onSearch,
  onUnidadeChange,
  onCategoriaChange,
  stockFilter = 'all',
  onStockFilterChange,
}: FilterBarProps) => {
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">
      <div className="relative md:col-span-2">
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

      {categorias.length > 0 && onCategoriaChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex justify-between w-full">
              <div className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Categorias</span>
              </div>
              {selectedCategorias.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategorias.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {categorias.map((categoria) => (
              <DropdownMenuCheckboxItem
                key={categoria}
                checked={selectedCategorias.includes(categoria)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onCategoriaChange([...selectedCategorias, categoria]);
                  } else {
                    onCategoriaChange(
                      selectedCategorias.filter((c) => c !== categoria)
                    );
                  }
                }}
              >
                {categoria}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {onStockFilterChange && (
        <Select
          value={stockFilter}
          onValueChange={(value: 'all' | 'in-stock' | 'low-stock') => 
            onStockFilterChange(value)
          }
        >
          <SelectTrigger className="w-full flex items-center">
            <Package className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status do estoque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os itens</SelectItem>
            <SelectItem value="in-stock">Em estoque</SelectItem>
            <SelectItem value="low-stock">Estoque baixo</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FilterBar;
