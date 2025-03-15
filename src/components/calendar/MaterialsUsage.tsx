
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  BarChart,
  PieChart,
  Boxes,
  ShoppingBag,
  Truck,
  Factory,
  Droplets,
  PercentSquare,
  Hammer
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell,
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { MaterialUsageSummary, ProjectDistribution } from "@/types/budget";

interface MaterialsUsageProps {
  date?: Date;
}

// Enhanced mock data for concrete panel production
const materialsData = {
  // Painéis em estoque
  panels: [
    { type: "Parede Interna", quantity: 28, unit: "un" },
    { type: "Parede Externa", quantity: 15, unit: "un" },
    { type: "Fachada", quantity: 8, unit: "un" },
    { type: "Divisória", quantity: 12, unit: "un" }
  ],
  
  // Materiais em estoque para concreto pré-moldado
  materials: [
    { name: "Armação de Aço CA-50", quantity: 12500, unit: "kg", threshold: 10000, category: "Estrutura" },
    { name: "Armação de Aço CA-60", quantity: 7800, unit: "kg", threshold: 5000, category: "Estrutura" },
    { name: "Cimento CP-V ARI", quantity: 180, unit: "t", threshold: 150, category: "Concreto" },
    { name: "Areia Média", quantity: 320, unit: "m³", threshold: 250, category: "Concreto" },
    { name: "Brita 0", quantity: 210, unit: "m³", threshold: 180, category: "Concreto" },
    { name: "Aditivo Superplastificante", quantity: 650, unit: "L", threshold: 500, category: "Concreto" },
    { name: "Desmoldante", quantity: 450, unit: "L", threshold: 400, category: "Formas" },
    { name: "Espaçadores Plásticos", quantity: 18500, unit: "un", threshold: 15000, category: "Estrutura" },
    { name: "Insertos Metálicos", quantity: 860, unit: "un", threshold: 700, category: "Conexões" },
    { name: "Formas Metálicas", quantity: 75, unit: "un", threshold: 50, category: "Formas" }
  ],
  
  // Consumo de materiais no mês atual
  usage: [
    { name: "Armação de Aço CA-50", quantity: 3200, unit: "kg", percentage: 78, category: "Estrutura" },
    { name: "Armação de Aço CA-60", quantity: 1800, unit: "kg", percentage: 64, category: "Estrutura" },
    { name: "Cimento CP-V ARI", quantity: 42, unit: "t", percentage: 92, category: "Concreto" },
    { name: "Areia Média", quantity: 95, unit: "m³", percentage: 75, category: "Concreto" },
    { name: "Brita 0", quantity: 85, unit: "m³", percentage: 70, category: "Concreto" },
    { name: "Aditivo Superplastificante", quantity: 220, unit: "L", percentage: 82, category: "Concreto" },
    { name: "Desmoldante", quantity: 180, unit: "L", percentage: 65, category: "Formas" },
    { name: "Espaçadores Plásticos", quantity: 7500, unit: "un", percentage: 68, category: "Estrutura" },
    { name: "Insertos Metálicos", quantity: 320, unit: "un", percentage: 54, category: "Conexões" },
    { name: "Formas Metálicas", quantity: 18, unit: "un", percentage: 88, category: "Formas" }
  ],
  
  // Distribuição de materiais por projeto
  distribution: [
    { name: "Residencial Villa Moderna", value: 45, color: "#3b82f6" },
    { name: "Centro Empresarial Horizonte", value: 30, color: "#22c55e" },
    { name: "Edifício Titanium", value: 15, color: "#f97316" },
    { name: "Outros", value: 10, color: "#8b5cf6" }
  ],
  
  // Produtividade por tipo de concreto
  concreteUsage: [
    { name: "C25", quantity: 28, unit: "m³" },
    { name: "C30", quantity: 52, unit: "m³" },
    { name: "C40", quantity: 85, unit: "m³" },
    { name: "C50", quantity: 34, unit: "m³" }
  ],
  
  // Estatísticas de produção
  statistics: {
    panelsProduced: 63,
    totalConcreteVolume: 199, // m³
    totalReinforcement: 13700, // kg
    averageProductionTime: 32, // hours per panel
    averageReinforcement: 68.8 // kg/m³
  }
};

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#f43f5e'];

const MaterialsUsage = ({ date = new Date() }: MaterialsUsageProps) => {
  // Prepare data for charts
  const categoryUsageData = Array.from(
    new Set(materialsData.usage.map(item => item.category))
  ).map(category => {
    const total = materialsData.usage
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.percentage, 0);
    
    const count = materialsData.usage.filter(item => item.category === category).length;
    
    return {
      name: category,
      value: Math.round(total / count) // Average percentage per category
    };
  });
  
  const concreteUsageData = materialsData.concreteUsage.map(item => ({
    name: item.name,
    value: item.quantity
  }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory" className="flex items-center gap-1">
            <Boxes className="h-4 w-4" />
            <span>Estoque</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>Consumo</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-1">
            <PercentSquare className="h-4 w-4" />
            <span>Estatísticas</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Estoque */}
        <TabsContent value="inventory" className="mt-4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Factory className="h-4 w-4 text-primary" />
                  Painéis em Estoque
                </CardTitle>
                <CardDescription>Quantidade de painéis prontos para instalação</CardDescription>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-md flex items-center gap-1">
                <span className="text-sm font-medium">Total:</span>
                <span className="text-lg font-bold">{materialsData.panels.reduce((acc, panel) => acc + panel.quantity, 0)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {materialsData.panels.map((item, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="font-medium text-lg mb-1">{item.type}</div>
                      <div className="text-2xl font-bold">
                        {item.quantity} <span className="text-muted-foreground text-sm">{item.unit}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-primary" />
                  Materiais para Produção
                </CardTitle>
                <CardDescription>Inventário atual de materiais para painéis</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {/* Group materials by category */}
              {Array.from(new Set(materialsData.materials.map(item => item.category))).map(category => (
                <div key={category} className="mb-4">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground mb-3">{category}</h3>
                  <div className="space-y-4">
                    {materialsData.materials
                      .filter(item => item.category === category)
                      .map((item, index) => {
                        const percentage = (item.quantity / item.threshold) * 100;
                        return (
                          <div key={index} className="grid grid-cols-4 gap-4 items-center">
                            <div className="col-span-1">
                              <div className="font-medium">{item.name}</div>
                            </div>
                            <div className="col-span-2">
                              <Progress value={percentage > 100 ? 100 : percentage} className="h-2" />
                            </div>
                            <div className="col-span-1 text-right">
                              <span className="font-bold">{item.quantity}</span> <span className="text-sm text-muted-foreground">{item.unit}</span>
                              {item.quantity < item.threshold && (
                                <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                                  Baixo
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Consumo */}
        <TabsContent value="usage" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-primary" />
                  Consumo por Categoria
                </CardTitle>
                <CardDescription>Consumo médio por categoria em {format(date, "MMMM 'de' yyyy", { locale: pt })}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    Estrutura: { color: "#3b82f6" },
                    Concreto: { color: "#22c55e" },
                    Formas: { color: "#f97316" },
                    Conexões: { color: "#8b5cf6" }
                  }}
                >
                  <BarChartComponent data={categoryUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" name="Consumo (%)" fill="#3b82f6" />
                  </BarChartComponent>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-primary" />
                  Distribuição por Projeto
                </CardTitle>
                <CardDescription>Uso de materiais por projeto</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    "Residencial Villa Moderna": { color: "#3b82f6" },
                    "Centro Empresarial Horizonte": { color: "#22c55e" },
                    "Edifício Titanium": { color: "#f97316" },
                    "Outros": { color: "#8b5cf6" },
                  }}
                >
                  <PieChartComponent>
                    <Pie
                      data={materialsData.distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {materialsData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChartComponent>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Consumo de Concreto por Classe
              </CardTitle>
              <CardDescription>Volume utilizado em {format(date, "MMMM 'de' yyyy", { locale: pt })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-60">
                  <ChartContainer
                    config={{
                      C25: { color: "#3b82f6" },
                      C30: { color: "#22c55e" },
                      C40: { color: "#f97316" },
                      C50: { color: "#8b5cf6" }
                    }}
                  >
                    <PieChartComponent>
                      <Pie
                        data={concreteUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value} m³`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {concreteUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChartComponent>
                  </ChartContainer>
                </div>
                
                <div>
                  <div className="space-y-4">
                    {materialsData.concreteUsage.map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 items-center">
                        <div className="col-span-1">
                          <div className="font-medium">{item.name}</div>
                        </div>
                        <div className="col-span-1">
                          <Progress 
                            value={(item.quantity / Math.max(...materialsData.concreteUsage.map(i => i.quantity))) * 100} 
                            className="h-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] + '33' }}
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <span className="font-bold">{item.quantity}</span> <span className="text-sm text-muted-foreground">{item.unit}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Volume Total</span>
                        <span className="font-bold text-lg">{materialsData.statistics.totalConcreteVolume} m³</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Hammer className="h-4 w-4 text-primary" />
                Consumo de Materiais
              </CardTitle>
              <CardDescription>Consumo detalhado em {format(date, "MMMM 'de' yyyy", { locale: pt })}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Group materials by category */}
              {Array.from(new Set(materialsData.usage.map(item => item.category))).map(category => (
                <div key={category} className="mb-6">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground mb-3">{category}</h3>
                  <div className="space-y-4">
                    {materialsData.usage
                      .filter(item => item.category === category)
                      .map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center">
                          <div className="col-span-1">
                            <div className="font-medium">{item.name}</div>
                          </div>
                          <div className="col-span-2">
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                          <div className="col-span-1 text-right">
                            <span className="font-bold">{item.quantity}</span> <span className="text-sm text-muted-foreground">{item.unit}</span>
                            <div className="text-sm text-muted-foreground">{item.percentage}% do previsto</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Estatísticas */}
        <TabsContent value="statistics" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Factory className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Painéis Produzidos</p>
                    <p className="text-3xl font-bold">{materialsData.statistics.panelsProduced}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume de Concreto</p>
                    <p className="text-3xl font-bold">{materialsData.statistics.totalConcreteVolume} <span className="text-base font-medium">m³</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Hammer className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Armação de Aço</p>
                    <p className="text-3xl font-bold">{materialsData.statistics.totalReinforcement.toLocaleString()} <span className="text-base font-medium">kg</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Indicadores de Produção</CardTitle>
              <CardDescription>Estatísticas de produção para o período atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tempo Médio de Produção</p>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{materialsData.statistics.averageProductionTime}</div>
                      <div className="text-muted-foreground">horas/painel</div>
                    </div>
                    <Progress value={75} className="h-2 mt-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Taxa Média de Armação</p>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{materialsData.statistics.averageReinforcement}</div>
                      <div className="text-muted-foreground">kg/m³</div>
                    </div>
                    <Progress value={85} className="h-2 mt-2" />
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="font-medium mb-4">Distribuição de Produção por Tipo de Painel</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {materialsData.panels.map((panel, index) => {
                      const percentage = (panel.quantity / materialsData.panels.reduce((acc, p) => acc + p.quantity, 0)) * 100;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{panel.type}</span>
                            <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <p className="text-right text-xs text-muted-foreground">{panel.quantity} painéis</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialsUsage;
