
import React, { useState, useEffect, useRef } from "react";
import { Search, Zap, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MaterialItem } from "@/types/budget";

interface MaterialSearchBoxProps {
  materials: MaterialItem[];
  onSelectMaterial: (material: MaterialItem) => void;
  className?: string;
  placeholder?: string;
}

const MaterialSearchBox = ({
  materials,
  onSelectMaterial,
  className,
  placeholder = "Buscar material por código ou descrição..."
}: MaterialSearchBoxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut to focus the search box
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder={placeholder}
              className="pl-8 pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpen(true)}
            />
            <kbd className="pointer-events-none absolute right-3 top-2.5 flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px] md:w-[500px]" align="start">
          <Command>
            <CommandInput 
              placeholder="Digite código ou descrição do material..."
              value={search}
              onValueChange={setSearch}
              autoFocus
            />
            <CommandList>
              <CommandEmpty>Nenhum material encontrado.</CommandEmpty>
              <CommandGroup heading="Materiais">
                {materials
                  .filter(item => 
                    item.codigo.toLowerCase().includes(search.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 10) // Limit results for performance
                  .map(item => (
                    <CommandItem
                      key={item.id}
                      value={`${item.codigo}-${item.descricao}`}
                      onSelect={() => {
                        onSelectMaterial(item);
                        setOpen(false);
                        setSearch("");
                      }}
                      className="flex flex-col items-start py-3"
                    >
                      <div className="flex justify-between w-full">
                        <span className="font-medium">{item.codigo}</span>
                        <Badge variant="outline" className="ml-2">
                          {item.unidade}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {item.descricao}
                      </span>
                      <div className="flex justify-between w-full mt-1">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>{item.categoria || "Geral"}</span>
                        </Badge>
                        <span className="font-bold text-sm">
                          R$ {item.preco.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </div>
                    </CommandItem>
                  ))
                }
              </CommandGroup>
            </CommandList>
            <div className="p-2 border-t">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {search ? 
                    `${materials.filter(item => 
                      item.codigo.toLowerCase().includes(search.toLowerCase()) ||
                      item.descricao.toLowerCase().includes(search.toLowerCase())
                    ).length} itens encontrados` : 
                    `${materials.length} itens disponíveis`
                  }
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Pressione ⌘K para buscar</span>
                </div>
              </div>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MaterialSearchBox;
