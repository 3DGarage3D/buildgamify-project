import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SinapiComposition, SinapiCompositionItem } from "@/types/budget";
import { Skeleton } from "@/components/ui/skeleton";

interface SinapiComparisonTableProps {
  refreshTrigger?: number;
}

export default function SinapiComparisonTable({ refreshTrigger }: SinapiComparisonTableProps) {
  const [compositions, setCompositions] = useState<SinapiComposition[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompositions();
  }, [refreshTrigger]);

  const loadCompositions = async () => {
    setLoading(true);
    try {
      const { data: compsData, error: compsError } = await supabase
        .from("sinapi_compositions")
        .select("*")
        .order("created_at", { ascending: false });

      if (compsError) throw compsError;

      const compositionsWithItems: SinapiComposition[] = [];

      for (const comp of compsData || []) {
        const { data: itemsData, error: itemsError } = await supabase
          .from("sinapi_composition_items")
          .select("*")
          .eq("composition_id", comp.id)
          .order("category");

        if (itemsError) throw itemsError;

        compositionsWithItems.push({
          id: comp.id,
          code: comp.code,
          name: comp.name,
          unit: comp.unit,
          totalValue: parseFloat(String(comp.total_value || "0")),
          bdiPercentage: comp.bdi_percentage ? parseFloat(String(comp.bdi_percentage)) : undefined,
          createdBy: comp.created_by || "",
          createdAt: new Date(comp.created_at),
          updatedAt: new Date(comp.updated_at),
          items: (itemsData || []).map(item => ({
            id: item.id,
            compositionId: item.composition_id,
            itemCode: item.item_code,
            description: item.description,
            source: item.source || "SINAPI",
            category: item.category,
            unit: item.unit,
            coefficient: parseFloat(String(item.coefficient || "0")),
            unitPrice: parseFloat(String(item.unit_price || "0")),
            totalPrice: parseFloat(String(item.total_price || "0")),
            createdAt: new Date(item.created_at),
          })),
        });
      }

      setCompositions(compositionsWithItems);
    } catch (error) {
      console.error("Erro ao carregar composições:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toUpperCase()) {
      case 'SINAPI':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'SP OBRAS':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      case 'PRÓPRIA':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    if (category.includes('Material')) return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200';
    if (category.includes('Mão de Obra')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200';
    if (category.includes('Equipamento')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
    if (category.includes('Serviço')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Composições Importadas</CardTitle>
          <CardDescription>Carregando composições...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compositions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Composições Importadas</CardTitle>
          <CardDescription>Nenhuma composição encontrada</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            Importe uma planilha de composições SINAPI para começar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Composições Importadas</CardTitle>
        <CardDescription>{compositions.length} composição(ões) disponível(is)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">BDI</TableHead>
              <TableHead className="text-right">Itens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compositions.map(comp => (
              <>
                <TableRow key={comp.id} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleRow(comp.id)}>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      {expandedRows.has(comp.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-mono font-medium">{comp.code}</TableCell>
                  <TableCell className="max-w-md truncate">{comp.name}</TableCell>
                  <TableCell>{comp.unit}</TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ {comp.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    {comp.bdiPercentage ? `${comp.bdiPercentage}%` : "-"}
                  </TableCell>
                  <TableCell className="text-right">{comp.items.length}</TableCell>
                </TableRow>
                
                {expandedRows.has(comp.id) && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/30 p-0">
                      <div className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Código Item</TableHead>
                              <TableHead>Descrição</TableHead>
                              <TableHead>Fonte</TableHead>
                              <TableHead>Categoria</TableHead>
                              <TableHead>Unidade</TableHead>
                              <TableHead className="text-right">Coef.</TableHead>
                              <TableHead className="text-right">Preço Unit.</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {comp.items.map(item => (
                              <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs">{item.itemCode}</TableCell>
                                <TableCell className="max-w-xs truncate text-sm">{item.description}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={getSourceBadgeColor(item.source)}>
                                    {item.source}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                                    {item.category}
                                  </Badge>
                                </TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell className="text-right">{item.coefficient.toFixed(4)}</TableCell>
                                <TableCell className="text-right">
                                  R$ {item.unitPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  R$ {item.totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
