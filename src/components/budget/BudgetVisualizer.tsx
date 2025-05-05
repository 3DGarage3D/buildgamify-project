
import React, { useState } from "react";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MaterialItem } from "@/types/budget";
import { 
  Badge
} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  Calculator,
  Save,
  Plus,
  Trash2,
  Edit3,
  FileDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Copy,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import MaterialSearchBox from "./MaterialSearchBox";

interface BudgetVisualizerProps {
  materials: MaterialItem[];
  projectName?: string;
}

const projectSchema = z.object({
  name: z.string().min(3, { message: "Nome do projeto deve ter pelo menos 3 caracteres" }),
  description: z.string().optional(),
  client: z.string().optional(),
});

const BudgetVisualizer = ({ materials, projectName = "Novo Projeto" }: BudgetVisualizerProps) => {
  const [selectedItems, setSelectedItems] = useState<MaterialItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeView, setActiveView] = useState<"visual" | "list">("visual");
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialItem[]>(materials.slice(0, 10));
  const [materialSearch, setMaterialSearch] = useState("");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: projectName,
      description: "",
      client: "",
    },
  });
  
  const totalCost = selectedItems.reduce((acc, item) => {
    const quantity = quantities[item.id] || 1;
    return acc + (item.preco * quantity);
  }, 0);
  
  const addItem = (item: MaterialItem) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
      setQuantities({ ...quantities, [item.id]: 1 });
      
      toast({
        title: "Item adicionado",
        description: `${item.descricao} adicionado ao orçamento.`,
      });
    } else {
      // If already added, increment quantity
      const currentQuantity = quantities[item.id] || 1;
      setQuantities({ ...quantities, [item.id]: currentQuantity + 1 });
      
      toast({
        title: "Quantidade atualizada",
        description: `Quantidade de ${item.descricao} aumentada para ${currentQuantity + 1}.`,
      });
    }
  };
  
  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
    
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
    
    toast({
      title: "Item removido",
      description: "Item removido do orçamento.",
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    setQuantities({ ...quantities, [id]: quantity });
  };
  
  const handleSave = () => {
    toast({
      title: "Orçamento salvo",
      description: "Seu orçamento foi salvo com sucesso.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Orçamento exportado",
      description: "Seu orçamento foi exportado com sucesso.",
    });
  };
  
  const handleDuplicate = () => {
    toast({
      title: "Orçamento duplicado",
      description: "Uma cópia do orçamento foi criada.",
    });
  };
  
  const clearItems = () => {
    setSelectedItems([]);
    setQuantities({});
    toast({
      title: "Orçamento limpo",
      description: "Todos os itens foram removidos do orçamento.",
    });
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSearchMaterials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setMaterialSearch(query);
    
    if (query) {
      const filtered = materials.filter(item => 
        item.descricao.toLowerCase().includes(query) || 
        item.codigo.toLowerCase().includes(query)
      ).slice(0, 10);
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials.slice(0, 10));
    }
  };
  
  // Dados para o gráfico de categorias
  const categoryData = Object.entries(
    selectedItems.reduce((acc, item) => {
      const category = item.categoria || "Outros";
      const quantity = quantities[item.id] || 1;
      const cost = item.preco * quantity;
      
      acc[category] = (acc[category] || 0) + cost;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));
  
  // Cores para o gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B'];

  // Item template for the visual mode
  const renderMaterialCard = (item: MaterialItem) => {
    const quantity = quantities[item.id] || 1;
    return (
      <div 
        key={item.id} 
        className="relative group rounded-md border p-4 hover:border-primary transition-all duration-200 hover:shadow-md"
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeItem(item.id)}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">{item.codigo}</div>
              <Badge variant="outline" className="bg-primary/10">
                {item.categoria || "Outros"}
              </Badge>
              <h4 className="text-sm font-medium mt-2 line-clamp-2">{item.descricao}</h4>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => updateQuantity(item.id, Math.max(1, (quantities[item.id] || 1) - 1))}
              >
                <span>-</span>
              </Button>
              <Input
                className="w-12 h-6 text-center p-0"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) updateQuantity(item.id, val);
                }}
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
              >
                <span>+</span>
              </Button>
              <span className="text-xs text-muted-foreground">{item.unidade}</span>
            </div>
            <span className="font-medium">
              R$ {(item.preco * quantity).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-6' : ''}`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{form.watch('name')}</h2>
          <p className="text-muted-foreground">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'itens'} • 
            R$ {totalCost.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicar
          </Button>
          <Button variant="outline" size="sm" onClick={clearItems}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Visualização do Projeto</CardTitle>
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={activeView === "visual" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setActiveView("visual")}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Visual
                  </Button>
                  <Button
                    variant={activeView === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setActiveView("list")}
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    Lista
                  </Button>
                </div>
              </div>
              <CardDescription>
                Visualize e gerencie os itens do seu orçamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeView === "visual" ? (
                selectedItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItems.map(renderMaterialCard)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum item adicionado</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Adicione itens da lista de materiais ao seu orçamento para visualizá-los aqui.
                    </p>
                  </div>
                )
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-center">Quantidade</TableHead>
                        <TableHead className="text-right">Preço Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItems.length > 0 ? (
                        selectedItems.map((item) => {
                          const quantity = quantities[item.id] || 1;
                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                              <TableCell className="font-medium">{item.descricao}</TableCell>
                              <TableCell>{item.unidade}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-primary/10">
                                  {item.categoria || "Outros"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, Math.max(1, (quantities[item.id] || 1) - 1))}
                                  >
                                    <span>-</span>
                                  </Button>
                                  <Input
                                    className="w-16 text-center"
                                    value={quantity}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value);
                                      if (!isNaN(val)) updateQuantity(item.id, val);
                                    }}
                                  />
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                                  >
                                    <span>+</span>
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {item.preco.toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {(item.preco * quantity).toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeItem(item.id)}
                                  className="h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            Nenhum item adicionado ao orçamento.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {selectedItems.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total do Orçamento:</div>
                      <div className="text-2xl font-bold">
                        R$ {totalCost.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Resumo do Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedItems.length > 0 ? (
                <div className="space-y-6">
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        name: { color: "#000" },
                        value: { color: "#3b82f6" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total de itens:</span>
                      <span>{selectedItems.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Categorias:</span>
                      <span>{categoryData.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Valor total:</span>
                      <span className="font-bold">R$ {totalCost.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sem dados para exibir</h3>
                  <p className="text-muted-foreground text-sm">
                    Adicione itens ao seu orçamento para ver o resumo.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Materiais Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MaterialSearchBox 
                  materials={materials}
                  onSelectMaterial={addItem}
                  placeholder="Buscar material por código ou descrição..."
                />
                
                <div className="max-h-[400px] overflow-y-auto border rounded-md divide-y">
                  {filteredMaterials.map((item) => (
                    <div key={item.id} className="p-3 hover:bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-mono text-xs text-muted-foreground mb-1">{item.codigo}</div>
                          <div className="font-medium line-clamp-2">{item.descricao}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.unidade}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => addItem(item)}
                          className="h-8 w-8 flex-shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="bg-primary/10">
                          {item.categoria || "Outros"}
                        </Badge>
                        <span className="font-medium">
                          R$ {item.preco.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {materials.length > filteredMaterials.length && (
                  <div className="text-center pt-2">
                    <Button variant="link" size="sm" onClick={() => setFilteredMaterials(materials.slice(0, 20))}>
                      Ver mais materiais
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetVisualizer;
