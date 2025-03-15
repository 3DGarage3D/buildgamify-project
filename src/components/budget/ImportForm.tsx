
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileSpreadsheet, Upload, Loader2, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import { MaterialItem } from "@/types/budget";

interface ImportFormProps {
  onImport: (materials: MaterialItem[]) => void;
}

const ImportForm = ({ onImport }: ImportFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const determineCategory = (description: string): string => {
    description = description.toUpperCase();
    
    if (description.includes("ABRAÇADEIRA")) return "Abraçadeiras";
    if (description.includes("CABO") || description.includes("FIO")) return "Cabos e Fios";
    if (description.includes("PARAFUSO") || description.includes("PORCA") || description.includes("ARRUELA")) return "Fixadores";
    if (description.includes("ELETRODUTO") || description.includes("CONDULETE")) return "Eletrodutos";
    if (description.includes("TERMINAL") || description.includes("CONECTOR")) return "Conectores";
    if (description.includes("DISJUNTOR") || description.includes("FUSÍVEL")) return "Proteção";
    
    return "Outros";
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(false);
    
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Converte a planilha para JSON
          const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { header: "A" });
          
          // Remove a primeira linha (cabeçalhos)
          const dataWithoutHeaders = jsonData.slice(1);
          
          // Normaliza os dados baseados na estrutura específica da planilha
          const normalizedData: MaterialItem[] = dataWithoutHeaders.map((row, index) => {
            return {
              id: `item-${index}`,
              codigo: row.A?.toString() || "",
              descricao: row.B?.toString() || "",
              unidade: row.C?.toString() || "",
              origem: row.D?.toString() || "",
              preco: typeof row.E === 'number' ? row.E : parseFloat(row.E?.toString().replace(',', '.') || "0"),
              categoria: determineCategory(row.B?.toString() || "")
            };
          }).filter(item => item.codigo && item.descricao); // Remove linhas vazias
          
          onImport(normalizedData);
          setIsLoading(false);
          setSuccess(true);
          
          toast({
            title: "Planilha carregada com sucesso",
            description: `${normalizedData.length} itens importados.`,
            variant: "default",
          });
        } catch (err) {
          console.error("Erro ao processar a planilha:", err);
          setError("Erro ao processar a planilha. Verifique o formato e tente novamente.");
          setIsLoading(false);
          setSuccess(false);
        }
      };
      
      reader.onerror = () => {
        setError("Erro ao ler o arquivo. Tente novamente.");
        setIsLoading(false);
        setSuccess(false);
      };
      
      reader.readAsBinaryString(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Importar Planilha de Insumos
        </CardTitle>
        <CardDescription>
          Carregue uma planilha Excel com dados de insumos para análise e orçamentos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
        />

        <Button
          onClick={triggerFileInput}
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Carregar Planilha
            </>
          )}
        </Button>

        {error && (
          <div className="mt-4 rounded-md bg-destructive/15 p-4 text-destructive flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-md bg-primary/10 p-4 text-primary flex items-start">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>Planilha importada com sucesso</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImportForm;
