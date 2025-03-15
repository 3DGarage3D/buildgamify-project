
import { useState, useRef } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";
import { 
  FileSpreadsheet, 
  Upload, 
  Search, 
  DollarSign, 
  List, 
  Filter,
  AlertCircle,
  Loader2,
  Check
} from "lucide-react";

interface MaterialItem {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  origem?: string;
  categoria?: string;
}

const Budget = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnidade, setSelectedUnidade] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const unidades = Array.from(new Set(materials.map(item => item.unidade))).sort();
  
  const filterSchema = z.object({
    search: z.string().optional(),
    unidade: z.string().optional(),
  });

  const filterForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: "",
      unidade: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
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
          
          setMaterials(normalizedData);
          setFilteredMaterials(normalizedData);
          setIsLoading(false);
          
          toast({
            title: "Planilha carregada com sucesso",
            description: `${normalizedData.length} itens importados.`,
            variant: "default",
          });
        } catch (err) {
          console.error("Erro ao processar a planilha:", err);
          setError("Erro ao processar a planilha. Verifique o formato e tente novamente.");
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError("Erro ao ler o arquivo. Tente novamente.");
        setIsLoading(false);
      };
      
      reader.readAsBinaryString(file);
    }
  };

  // Função para determinar a categoria com base na descrição
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, selectedUnidade);
  };
  
  const handleUnidadeChange = (value: string) => {
    setSelectedUnidade(value === "all" ? undefined : value);
    applyFilters(searchTerm, value === "all" ? undefined : value);
  };
  
  const applyFilters = (search: string, unidade?: string) => {
    let filtered = [...materials];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.descricao.toLowerCase().includes(searchLower) ||
          item.codigo.toLowerCase().includes(searchLower)
      );
    }
    
    if (unidade && unidade !== "all") {
      filtered = filtered.filter(item => item.unidade === unidade);
    }
    
    setFilteredMaterials(filtered);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orçamento</h1>
        <p className="text-muted-foreground">
          Carregue planilhas de insumos, visualize e gerencie orçamentos de projetos.
        </p>
      </div>
      
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Insumos</span>
          </TabsTrigger>
          <TabsTrigger value="budgets" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Orçamentos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="space-y-4 pt-4">
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
              
              {materials.length > 0 && !error && !isLoading && (
                <div className="mt-4 rounded-md bg-primary/10 p-4 text-primary flex items-start">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{materials.length} itens carregados com sucesso</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {materials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Lista de Insumos
                </CardTitle>
                <CardDescription>
                  Visualize e filtre os insumos disponíveis para orçamentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 mb-6 md:grid-cols-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por descrição ou código..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  
                  <Select
                    value={selectedUnidade || "all"}
                    onValueChange={handleUnidadeChange}
                  >
                    <SelectTrigger className="w-full flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as unidades</SelectItem>
                      {unidades.map(un => (
                        <SelectItem key={un} value={un}>{un}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
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
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Exibindo {filteredMaterials.length} de {materials.length} itens</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="budgets" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Orçamentos de Projetos
              </CardTitle>
              <CardDescription>
                Crie e gerencie orçamentos de projetos utilizando insumos importados.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum orçamento criado</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Primeiro importe uma planilha de insumos na aba "Insumos", depois volte aqui para criar seu orçamento.
              </p>
              <Button variant="outline" disabled={materials.length === 0}>
                Criar Novo Orçamento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;
