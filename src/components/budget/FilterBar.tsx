
import React from "react";
import { Search, Filter, SlidersHorizontal, Package, Database, Tag } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="search"
            placeholder="Buscar por descrição ou código..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute right-2.5 top-2.5 text-xs text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">⌘K</kbd>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pressione ⌘K para busca rápida</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
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

        {categorias.length > 0 && onCategoriaChange && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-between w-full">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Categorias</span>
                  </div>
                  {selectedCategorias.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategorias.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
          </div>
        )}

        {onStockFilterChange && (
          <div>
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
          </div>
        )}

        <div>
          <Button variant="outline" className="w-full flex items-center" onClick={() => {
            onSearch("");
            if (onCategoriaChange) onCategoriaChange([]);
            onUnidadeChange("all");
            if (onStockFilterChange) onStockFilterChange("all");
          }}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span>Limpar Filtros</span>
          </Button>
        </div>
      </div>
      
      {selectedCategorias.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategorias.map(categoria => (
            <Badge key={categoria} variant="secondary" className="flex items-center gap-1">
              {categoria}
              <button className="ml-1" onClick={() => {
                if (onCategoriaChange) {
                  onCategoriaChange(selectedCategorias.filter(c => c !== categoria));
                }
              }}>
                &times;
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
