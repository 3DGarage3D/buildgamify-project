import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import { SinapiComposition, SinapiCompositionItem } from "@/types/budget";

interface SinapiComparisonImportProps {
  onImport: () => void;
}

export default function SinapiComparisonImport({ onImport }: SinapiComparisonImportProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCompositionData = (rows: any[]): { compositions: Omit<SinapiComposition, 'id' | 'createdAt' | 'updatedAt' | 'items'>[], items: Record<string, Omit<SinapiCompositionItem, 'id' | 'compositionId' | 'createdAt'>[]> } => {
    const compositions: Omit<SinapiComposition, 'id' | 'createdAt' | 'updatedAt' | 'items'>[] = [];
    const items: Record<string, Omit<SinapiCompositionItem, 'id' | 'compositionId' | 'createdAt'>[]> = {};
    
    let currentComposition: Omit<SinapiComposition, 'id' | 'createdAt' | 'updatedAt' | 'items'> | null = null;
    let currentCompositionCode = '';
    let currentCategory = '';

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      // Detectar início de nova composição (formato: "FNDE XX DESCRIÇÃO")
      if (row[0] && typeof row[0] === 'string' && row[0].startsWith('FNDE')) {
        if (currentComposition) {
          compositions.push(currentComposition);
        }

        // Extrair código e nome da composição
        const fullText = row[0];
        const match = fullText.match(/^(FNDE\s+\d+)\s+(.+)/);
        
        if (match) {
          currentCompositionCode = match[1];
          const name = match[2];
          
          // Buscar unidade na próxima linha
          let unit = 'UN';
          if (i + 1 < rows.length && rows[i + 1][0] === 'Unidade:') {
            unit = rows[i + 1][1] || 'UN';
          }

          currentComposition = {
            code: currentCompositionCode,
            name: name,
            unit: unit,
            totalValue: 0,
            bdiPercentage: undefined,
            createdBy: '',
          };

          items[currentCompositionCode] = [];
        }
      }
      
      // Detectar categoria (Material, Mão de Obra, etc)
      if (row[0] && typeof row[0] === 'string' && 
          (row[0].includes('Material') || 
           row[0].includes('Mão de Obra') || 
           row[0].includes('Equipamento') || 
           row[0].includes('Serviço'))) {
        currentCategory = row[0];
      }
      
      // Detectar linha de item (tem código SINAPI numérico)
      if (currentComposition && row[0] && !isNaN(row[0])) {
        const itemCode = String(row[0]);
        const description = row[1] || '';
        const source = row[2] || 'SINAPI';
        const unit = row[3] || 'UN';
        const coefficient = parseFloat(row[4]) || 0;
        const unitPrice = parseFloat(row[5]) || 0;
        const totalPrice = parseFloat(row[6]) || 0;

        const item: Omit<SinapiCompositionItem, 'id' | 'compositionId' | 'createdAt'> = {
          itemCode,
          description,
          source,
          category: currentCategory,
          unit,
          coefficient,
          unitPrice,
          totalPrice,
        };

        items[currentCompositionCode].push(item);
        
        // Acumular valor total da composição
        currentComposition.totalValue += totalPrice;
      }
      
      // Detectar linha de BDI
      if (row[0] && typeof row[0] === 'string' && row[0].includes('BDI')) {
        const bdiMatch = row[0].match(/(\d+\.?\d*)\s*%/);
        if (bdiMatch && currentComposition) {
          currentComposition.bdiPercentage = parseFloat(bdiMatch[1]);
        }
      }
    }

    // Adicionar última composição
    if (currentComposition) {
      compositions.push(currentComposition);
    }

    return { compositions, items };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const { compositions, items } = parseCompositionData(jsonData as any[]);

      if (compositions.length === 0) {
        throw new Error("Nenhuma composição encontrada na planilha");
      }

      // Obter usuário atual
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Inserir composições no banco
      for (const comp of compositions) {
        const { data: insertedComp, error: compError } = await supabase
          .from("sinapi_compositions")
          .insert({
            code: comp.code,
            name: comp.name,
            unit: comp.unit,
            total_value: comp.totalValue,
            bdi_percentage: comp.bdiPercentage,
            created_by: user.id,
          })
          .select()
          .single();

        if (compError) throw compError;

        // Inserir itens da composição
        const compositionItems = items[comp.code].map(item => ({
          composition_id: insertedComp.id,
          item_code: item.itemCode,
          description: item.description,
          source: item.source,
          category: item.category,
          unit: item.unit,
          coefficient: item.coefficient,
          unit_price: item.unitPrice,
          total_price: item.totalPrice,
        }));

        const { error: itemsError } = await supabase
          .from("sinapi_composition_items")
          .insert(compositionItems);

        if (itemsError) throw itemsError;
      }

      setSuccess(true);
      toast({
        title: "Importação concluída!",
        description: `${compositions.length} composição(ões) importada(s) com sucesso.`,
      });
      
      onImport();
    } catch (err: any) {
      console.error("Erro ao importar:", err);
      setError(err.message || "Erro ao processar arquivo");
      toast({
        title: "Erro na importação",
        description: err.message || "Não foi possível processar o arquivo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Importar Composições SINAPI
        </CardTitle>
        <CardDescription>
          Carregue planilhas de composições FNDE/SINAPI para análise e comparação de valores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <Button
          onClick={triggerFileInput}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Carregar Planilha de Composições
            </>
          )}
        </Button>

        {error && (
          <div className="flex items-start gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/20 rounded-md">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Composições importadas com sucesso!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        A planilha deve conter composições no formato FNDE com código, descrição, itens e valores.
      </CardFooter>
    </Card>
  );
}
