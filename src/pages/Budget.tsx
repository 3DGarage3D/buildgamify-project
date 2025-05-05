
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, List, FileSpreadsheet, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MaterialItem, Budget } from "@/types/budget";
import { Button } from "@/components/ui/button";

// Budget Components
import ImportForm from "@/components/budget/ImportForm";
import MaterialsTable from "@/components/budget/MaterialsTable";
import FilterBar from "@/components/budget/FilterBar";
import BudgetVisualizer from "@/components/budget/BudgetVisualizer";
import NewBudgetDialog from "@/components/budget/NewBudgetDialog";
import MaterialSearchBox from "@/components/budget/MaterialSearchBox";

const BudgetPage = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnidade, setSelectedUnidade] = useState<string | undefined>();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [activeBudget, setActiveBudget] = useState<Budget | null>(null);
  const { toast } = useToast();
  
  const unidades = Array.from(new Set(materials.map(item => item.unidade))).sort();
  const categorias = Array.from(new Set(materials.map(item => item.categoria || "Geral"))).sort();
  
  const handleImport = (importedMaterials: MaterialItem[]) => {
    setMaterials(importedMaterials);
    setFilteredMaterials(importedMaterials);
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
  
  const handleCreateBudget = (name: string, description: string, client: string) => {
    const newBudget: Budget = {
      id: `budget-${Date.now()}`,
      name,
      description,
      client,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [],
      totalCost: 0
    };
    
    setBudgets([...budgets, newBudget]);
    setActiveBudget(newBudget);
    
    toast({
      title: "Orçamento criado",
      description: `O orçamento "${name}" foi criado com sucesso.`,
    });
  };

  const handleBackToBudgetList = () => {
    setActiveBudget(null);
  };

  // Save to localStorage when budgets change
  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem('projectBudgets', JSON.stringify(budgets));
    }
  }, [budgets]);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedBudgets = localStorage.getItem('projectBudgets');
    if (savedBudgets) {
      try {
        const parsed = JSON.parse(savedBudgets);
        setBudgets(parsed.map((budget: any) => ({
          ...budget,
          createdAt: new Date(budget.createdAt),
          updatedAt: new Date(budget.updatedAt)
        })));
      } catch (e) {
        console.error('Failed to parse saved budgets', e);
      }
    }
  }, []);
  
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
          <ImportForm onImport={handleImport} />
          
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
                <FilterBar 
                  searchTerm={searchTerm}
                  selectedUnidade={selectedUnidade}
                  unidades={unidades}
                  categorias={categorias}
                  onSearch={handleSearch}
                  onUnidadeChange={handleUnidadeChange}
                />
                
                <MaterialsTable 
                  materials={materials}
                  filteredMaterials={filteredMaterials}
                />
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Exibindo {filteredMaterials.length} de {materials.length} itens</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="budgets" className="py-4">
          {activeBudget ? (
            <>
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToBudgetList}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar para lista</span>
                </Button>
              </div>
              <BudgetVisualizer 
                materials={materials}
                projectName={activeBudget.name}
              />
            </>
          ) : (
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
                <NewBudgetDialog 
                  materials={materials}
                  onCreateBudget={handleCreateBudget}
                  disabled={materials.length === 0}
                />
              </CardContent>
            </Card>
          )}
          
          {budgets.length > 0 && !activeBudget && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Orçamentos Existentes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgets.map(budget => (
                  <Card key={budget.id} className="cursor-pointer hover:border-primary" onClick={() => setActiveBudget(budget)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{budget.name}</CardTitle>
                      {budget.client && (
                        <CardDescription>Cliente: {budget.client}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-2">
                        Criado em {budget.createdAt.toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{budget.items.length} itens</span>
                        <span className="font-medium">
                          R$ {budget.totalCost.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPage;
