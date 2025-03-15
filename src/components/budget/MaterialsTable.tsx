
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
import { MaterialItem } from "@/types/budget";

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
            <TableHead className="w-[40%]">Descrição</TableHead>
            <TableHead className="w-[10%]">Unidade</TableHead>
            <TableHead className="w-[15%]">Origem</TableHead>
            <TableHead className="w-[10%]">Categoria</TableHead>
            <TableHead className="text-right w-[15%]">Preço (R$)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.unidade}</TableCell>
                <TableCell>{item.origem}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10">
                    {item.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {item.preco.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialsTable;
