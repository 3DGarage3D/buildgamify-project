
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Layers,
  Package,
  AlertTriangle,
  Plus,
  Search,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

// Mock data
const inventoryData = {
  // Painéis em estoque
  panels: [
    { id: "P001", type: "Parede Interna", size: "2.4m x 1.2m", quantity: 10, project: "Residencial Villa Moderna" },
    { id: "P002", type: "Parede Interna", size: "2.4m x 0.6m", quantity: 18, project: "Residencial Villa Moderna" },
    { id: "P003", type: "Parede Externa", size: "2.4m x 1.2m", quantity: 15, project: "Centro Empresarial Horizonte" },
    { id: "P004", type: "Fachada", size: "3.0m x 1.2m", quantity: 8, project: "Centro Empresarial Horizonte" },
    { id: "P005", type: "Divisória", size: "2.4m x 1.2m", quantity: 12, project: null }
  ],
  
  // Materiais em estoque
  materials: [
    { 
      id: "M001", 
      name: "Perfil Metálico", 
      category: "Estrutura", 
      quantity: 1250, 
      unit: "m", 
      threshold: 1000, 
      location: "Prateleira A-01"
    },
    { 
      id: "M002", 
      name: "Parafusos Autobrocantes", 
      category: "Fixação", 
      quantity: 8500, 
      unit: "un", 
      threshold: 5000, 
      location: "Prateleira B-03"
    },
    { 
      id: "M003", 
      name: "Placa Cimentícia 12mm", 
      category: "Revestimento", 
      quantity: 180, 
      unit: "m²", 
      threshold: 200, 
      location: "Prateleira C-02"
    },
    { 
      id: "M004", 
      name: "Placa de Gesso 12.5mm", 
      category: "Revestimento", 
      quantity: 320, 
      unit: "m²", 
      threshold: 250, 
      location: "Prateleira C-04"
    },
    { 
      id: "M005", 
      name: "Isolamento Lã de Rocha 50mm", 
      category: "Isolamento", 
      quantity: 210, 
      unit: "m²", 
      threshold: 180, 
      location: "Prateleira D-01"
    },
    { 
      id: "M006", 
      name: "Massa para Juntas", 
      category: "Acabamento", 
      quantity: 65, 
      unit: "kg", 
      threshold: 50, 
      location: "Prateleira E-02"
    },
    { 
      id: "M007", 
      name: "Fita para Juntas", 
      category: "Acabamento", 
      quantity: 450, 
      unit: "m", 
      threshold: 400, 
      location: "Prateleira E-03"
    },
    { 
      id: "M008", 
      name: "Selante PU", 
      category: "Acabamento", 
      quantity: 28, 
      unit: "un", 
      threshold: 30, 
      location: "Prateleira E-04"
    }
  ]
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  const filteredMaterials = inventoryData.materials
    .filter(material => 
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(material => !filterCategory || material.category === filterCategory);
  
  const filteredPanels = inventoryData.panels
    .filter(panel => 
      panel.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
      panel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (panel.project && panel.project.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
  const categories = Array.from(new Set(inventoryData.materials.map(m => m.category)));
  
  const getLowStockMaterials = () => {
    return inventoryData.materials.filter(m => m.quantity < m.threshold);
  };
  
  const lowStockMaterials = getLowStockMaterials();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Estoque
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento de painéis e materiais
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Atualizar</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Novo Item</span>
          </Button>
        </div>
      </div>
      
      {/* Alerta de estoque baixo */}
      {lowStockMaterials.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-700 dark:text-amber-500 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Materiais com Estoque Baixo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockMaterials.map((material) => (
                <div key={material.id} className="flex justify-between items-center p-2 border border-amber-200 rounded-md bg-white dark:bg-amber-950/20">
                  <div>
                    <div className="font-medium">{material.name}</div>
                    <div className="text-sm text-muted-foreground">{material.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{material.quantity} <span className="text-sm font-normal">{material.unit}</span></div>
                    <div className="text-xs text-amber-600">Mínimo: {material.threshold}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Abas de Estoque */}
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="materials" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>Materiais</span>
          </TabsTrigger>
          <TabsTrigger value="panels" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span>Painéis</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Barra de pesquisa */}
        <div className="my-4 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar por ID, nome ou categoria..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filterCategory && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilterCategory(null)}
              className="gap-1 whitespace-nowrap"
            >
              {filterCategory} <span className="ml-1">×</span>
            </Button>
          )}
        </div>
        
        {/* Tab de Materiais */}
        <TabsContent value="materials">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={filterCategory === category ? "default" : "outline"}
                onClick={() => setFilterCategory(category === filterCategory ? null : category)}
                className="justify-start"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 px-4 py-2 font-medium text-sm text-muted-foreground">
              <div className="col-span-2">Material</div>
              <div className="col-span-1 text-right">Estoque</div>
              <div className="col-span-1">Categoria</div>
              <div className="col-span-1">Localização</div>
              <div className="col-span-1">Status</div>
            </div>
            
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum material encontrado.
              </div>
            ) : (
              filteredMaterials.map((material) => {
                const percentage = (material.quantity / material.threshold) * 100;
                return (
                  <Card key={material.id} className="overflow-hidden hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-2">
                          <div className="font-medium">{material.name}</div>
                          <div className="text-sm text-muted-foreground">{material.id}</div>
                        </div>
                        <div className="col-span-1 text-right">
                          <div className="font-bold">{material.quantity} <span className="text-sm font-normal">{material.unit}</span></div>
                          <Progress value={percentage > 100 ? 100 : percentage} className="h-1.5 mt-1" />
                        </div>
                        <div className="col-span-1">
                          <Badge variant="outline" className="bg-secondary/50">
                            {material.category}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          {material.location}
                        </div>
                        <div className="col-span-1">
                          {material.quantity < material.threshold ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                              Estoque Baixo
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
                              Em estoque
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
        
        {/* Tab de Painéis */}
        <TabsContent value="panels">
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 px-4 py-2 font-medium text-sm text-muted-foreground">
              <div className="col-span-1">ID</div>
              <div className="col-span-1">Tipo</div>
              <div className="col-span-1">Dimensões</div>
              <div className="col-span-1">Quantidade</div>
              <div className="col-span-1">Projeto</div>
            </div>
            
            {filteredPanels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum painel encontrado.
              </div>
            ) : (
              filteredPanels.map((panel) => (
                <Card key={panel.id} className="overflow-hidden hover:border-primary/50 transition-all">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-5 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="font-medium">{panel.id}</div>
                      </div>
                      <div className="col-span-1">
                        {panel.type}
                      </div>
                      <div className="col-span-1">
                        {panel.size}
                      </div>
                      <div className="col-span-1">
                        {panel.quantity} un
                      </div>
                      <div className="col-span-1">
                        {panel.project ? (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400">
                            {panel.project}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Estoque Geral
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
