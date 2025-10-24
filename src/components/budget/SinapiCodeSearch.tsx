import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ItemSearchResult {
  id: string;
  itemCode: string;
  description: string;
  source: string;
  category: string;
  unit: string;
  unitPrice: number;
  compositionCode: string;
  compositionName: string;
  createdAt: Date;
}

export default function SinapiCodeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ItemSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      searchItems();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const searchItems = async () => {
    setLoading(true);
    try {
      const { data: itemsData, error } = await supabase
        .from("sinapi_composition_items")
        .select("*, composition:sinapi_compositions(*)")
        .or(`item_code.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(50);

      if (error) throw error;

      const mappedResults: ItemSearchResult[] = (itemsData || []).map((item: any) => ({
        id: item.id,
        itemCode: item.item_code,
        description: item.description,
        source: item.source || "SINAPI",
        category: item.category,
        unit: item.unit,
        unitPrice: parseFloat(item.unit_price || "0"),
        compositionCode: item.composition?.code || "",
        compositionName: item.composition?.name || "",
        createdAt: new Date(item.created_at),
      }));

      setResults(mappedResults);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
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

  // Calcular estatísticas de preço para o mesmo código
  const getCodeStats = (code: string) => {
    const codeResults = results.filter(r => r.itemCode === code);
    if (codeResults.length === 0) return null;
    
    const prices = codeResults.map(r => r.unitPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variation = max > 0 ? ((max - min) / min) * 100 : 0;
    
    return { min, max, avg, variation, count: prices.length };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Buscar Código SINAPI
        </CardTitle>
        <CardDescription>
          Pesquise por código ou descrição de insumo para ver histórico de preços
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Digite código ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground text-center py-8">Buscando...</p>
        )}

        {!loading && searchTerm.length >= 3 && results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum resultado encontrado
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {results.length} resultado(s) encontrado(s)
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead className="text-right">Preço Unit.</TableHead>
                  <TableHead>Composição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const stats = getCodeStats(result.itemCode);
                  const hasVariation = stats && stats.count > 1;
                  const isMinPrice = stats && result.unitPrice === stats.min;
                  const isMaxPrice = stats && result.unitPrice === stats.max;
                  
                  return (
                    <TableRow 
                      key={result.id}
                      className={
                        hasVariation && isMinPrice ? "bg-green-50 dark:bg-green-950/20" :
                        hasVariation && isMaxPrice ? "bg-red-50 dark:bg-red-950/20" : ""
                      }
                    >
                      <TableCell className="font-mono text-xs">{result.itemCode}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm">{result.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSourceBadgeColor(result.source)}>
                          {result.source}
                        </Badge>
                      </TableCell>
                      <TableCell>{result.unit}</TableCell>
                      <TableCell className="text-right font-medium">
                        <div className="flex flex-col items-end gap-1">
                          <span>R$ {result.unitPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                          {stats && stats.count > 1 && (
                            <span className="text-xs text-muted-foreground">
                              {stats.count} ocorrências • Var: {stats.variation.toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs text-muted-foreground">{result.compositionCode}</span>
                          <span className="text-xs truncate max-w-[200px]">{result.compositionName}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
