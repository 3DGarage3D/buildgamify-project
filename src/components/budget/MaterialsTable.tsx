
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle } from "lucide-react";
import { MaterialItem } from "@/types/budget";
import { cn } from "@/lib/utils";

interface MaterialsTableProps {
  materials: MaterialItem[];
  filteredMaterials: MaterialItem[];
}

const MaterialsTable = ({ materials, filteredMaterials }: MaterialsTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Código</TableHead>
            <TableHead className="w-[35%]">Descrição</TableHead>
            <TableHead className="w-[8%]">Unidade</TableHead>
            <TableHead className="w-[12%]">Origem</TableHead>
            <TableHead className="w-[12%]">Categoria</TableHead>
            <TableHead className="w-[8%]">Estoque</TableHead>
            <TableHead className="text-right w-[15%]">Preço (R$)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((item) => {
              const stockStatus = item.stock && item.threshold 
                ? (item.stock < item.threshold ? "low" : "normal")
                : "unknown";
              
              return (
                <TableRow 
                  key={item.id}
                  className={cn(
                    stockStatus === "low" && "bg-amber-50/30 dark:bg-amber-950/5"
                  )}
                >
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.unidade}</TableCell>
                  <TableCell>{item.origem || "Nacional"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10">
                      {item.categoria || "Geral"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.stock !== undefined ? (
                      <div className="flex items-center gap-1">
                        <span>{item.stock}</span>
                        {stockStatus === "low" && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/D</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.preco.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Package className="h-8 w-8 mb-2" />
                  <p>Nenhum resultado encontrado.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialsTable;
