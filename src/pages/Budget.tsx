
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
import { 
  FileSpreadsheet, 
  Upload, 
  Search, 
  DollarSign, 
  List, 
  Filter,
  AlertCircle,
  Loader2
} from "lucide-react";

interface MaterialItem {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  categoria: string;
  fornecedor?: string;
}

const Budget = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const categories = Array.from(new Set(materials.map(item => item.categoria))).sort();
  
  const filterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
  });

  const filterForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: "",
      category: "",
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
          const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);
          
          // Normalizar os dados para corresponder à nossa interface
          const normalizedData: MaterialItem[] = jsonData.map((row, index) => {
            // Mapear as propriedades da planilha para as propriedades da interface
            // Este mapeamento deve ser ajustado com base na estrutura real da planilha
            return {
              id: `item-${index}`,
              codigo: row.codigo || row.Codigo || row.CODIGO || String(index),
              descricao: row.descricao || row.Descricao || row.DESCRICAO || row.nome || row.Nome || row.NOME || "",
              unidade: row.unidade || row.Unidade || row.UNIDADE || "un",
              preco: parseFloat(row.preco || row.Preco || row.PRECO || row.valor || row.Valor || row.VALOR || 0),
              categoria: row.categoria || row.Categoria || row.CATEGORIA || "Geral",
              fornecedor: row.fornecedor || row.Fornecedor || row.FORNECEDOR || "",
            };
          });
          
          setMaterials(normalizedData);
          setFilteredMaterials(normalizedData);
          setIsLoading(false);
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, selectedCategory);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? undefined : value);
    applyFilters(searchTerm, value === "all" ? undefined : value);
  };
  
  const applyFilters = (search: string, category?: string) => {
    let filtered = [...materials];
    
    if (search) {
      filtered = filtered.filter(
        item => 
          item.descricao.toLowerCase().includes(search.toLowerCase()) ||
          item.codigo.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== "all") {
      filtered = filtered.filter(item => item.categoria === category);
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
              
              {materials.length > 0 && (
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>{materials.length} itens carregados</p>
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
                    value={selectedCategory || "all"}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead className="w-[40%]">Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead className="text-right">Preço (R$)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaterials.length > 0 ? (
                        filteredMaterials.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.codigo}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/10">
                                {item.categoria}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.unidade}</TableCell>
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
                          <TableCell colSpan={5} className="h-24 text-center">
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
