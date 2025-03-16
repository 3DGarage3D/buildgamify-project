
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FileSpreadsheet, Upload, Loader2, Check, AlertCircle, Download, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import { MaterialItem } from "@/types/budget";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

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
    
    // Categorias para concreto pré-moldado
    if (description.includes("CONCRETO") || description.includes("CIMENTO")) return "Concreto";
    if (description.includes("AÇO") || description.includes("VERGALHÃO") || description.includes("ARMAÇÃO")) return "Aço";
    if (description.includes("FORMA") || description.includes("MOLDE")) return "Formas";
    if (description.includes("DESMOLDANTE") || description.includes("ÓLEO")) return "Desmoldantes";
    if (description.includes("ESPAÇADOR")) return "Espaçadores";
    if (description.includes("INSERTO") || description.includes("CONECTOR")) return "Insertos";
    if (description.includes("ISOPOR") || description.includes("EPS") || description.includes("ISOLANTE")) return "Isolantes";
    if (description.includes("ANCORAGEM") || description.includes("IÇAMENTO")) return "Ancoragem";
    
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
            title: "Planilha SINAPI carregada com sucesso",
            description: `${normalizedData.length} itens importados.`,
            variant: "default",
          });
        } catch (err) {
          console.error("Erro ao processar a planilha:", err);
          setError("Erro ao processar a planilha. Verifique se está no formato SINAPI e tente novamente.");
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

  const downloadSampleFile = () => {
    // Este é apenas um placeholder para download de arquivo exemplo
    toast({
      title: "Baixando arquivo exemplo",
      description: "Baixando planilha modelo SINAPI...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Importar Planilha SINAPI
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground ml-1 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>O Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil (SINAPI) fornece preços de insumos e composições para a construção civil.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Carregue uma planilha no formato SINAPI com dados de insumos para análise e orçamentos de painéis de concreto armado.
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

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={triggerFileInput}
            className="flex-grow"
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
                Carregar Planilha SINAPI
              </>
            )}
          </Button>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="gap-1">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Como usar</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Como importar dados SINAPI</DrawerTitle>
                <DrawerDescription>
                  Guia rápido para importação de planilhas de preços e insumos
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">1. Obtenha os dados SINAPI</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Acesse o site oficial da Caixa Econômica Federal e baixe a planilha de preços de insumos do SINAPI para o seu estado.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm">2. Prepare a planilha</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Certifique-se que a planilha contenha, no mínimo, as colunas: Código, Descrição, Unidade e Preço Unitário.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm">3. Importe para o sistema</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Clique em "Carregar Planilha SINAPI" e selecione o arquivo Excel (.xlsx ou .xls) preparado.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm">4. Categorização automática</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      O sistema categorizará automaticamente os insumos relevantes para produção de painéis de concreto armado.
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-3 mt-4 rounded-md">
                  <h4 className="font-medium mb-2">Insumos relevantes para painéis</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Concreto usinado (diversos fck)</li>
                    <li>• Aço (vergalhões CA-50 e CA-60)</li>
                    <li>• Formas (metálicas e madeira)</li>
                    <li>• Desmoldantes</li>
                    <li>• Espaçadores plásticos</li>
                    <li>• Insertos metálicos</li>
                    <li>• Materiais para içamento</li>
                  </ul>
                </div>
              </div>
              <DrawerFooter className="flex-row justify-between">
                <Button variant="outline" onClick={downloadSampleFile}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar planilha exemplo
                </Button>
                <DrawerClose asChild>
                  <Button>Entendi</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-destructive/15 p-4 text-destructive flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-md bg-primary/10 p-4 text-primary flex items-start">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>Planilha SINAPI importada com sucesso</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-muted-foreground text-center max-w-md">
          Utilize planilhas SINAPI para obter os preços médios de insumos de construção civil baseados em pesquisas de mercado realizadas pelo IBGE.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ImportForm;
