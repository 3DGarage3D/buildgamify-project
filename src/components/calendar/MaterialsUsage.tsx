
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
  ChevronRight,
  BarChart,
  PieChart,
  Boxes,
  ShoppingBag
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

interface MaterialsUsageProps {
  date?: Date;
}

// Mock data
const materialsData = {
  // Painéis em estoque
  panels: [
    { type: "Parede Interna", quantity: 28, unit: "un" },
    { type: "Parede Externa", quantity: 15, unit: "un" },
    { type: "Fachada", quantity: 8, unit: "un" },
    { type: "Divisória", quantity: 12, unit: "un" }
  ],
  
  // Materiais em estoque
  materials: [
    { name: "Perfil Metálico", quantity: 1250, unit: "m", threshold: 1000, category: "Estrutura" },
    { name: "Parafusos", quantity: 8500, unit: "un", threshold: 5000, category: "Fixação" },
    { name: "Placa Cimentícia", quantity: 180, unit: "m²", threshold: 200, category: "Revestimento" },
    { name: "Placa de Gesso", quantity: 320, unit: "m²", threshold: 250, category: "Revestimento" },
    { name: "Isolamento", quantity: 210, unit: "m²", threshold: 180, category: "Isolamento" },
    { name: "Massa para Juntas", quantity: 65, unit: "kg", threshold: 50, category: "Acabamento" },
    { name: "Fita para Juntas", quantity: 450, unit: "m", threshold: 400, category: "Acabamento" }
  ],
  
  // Consumo de materiais no mês atual
  usage: [
    { name: "Perfil Metálico", quantity: 620, unit: "m", percentage: 78 },
    { name: "Parafusos", quantity: 3200, unit: "un", percentage: 64 },
    { name: "Placa Cimentícia", quantity: 110, unit: "m²", percentage: 92 },
    { name: "Placa de Gesso", quantity: 180, unit: "m²", percentage: 56 },
    { name: "Isolamento", quantity: 95, unit: "m²", percentage: 45 },
    { name: "Massa para Juntas", quantity: 42, unit: "kg", percentage: 65 },
    { name: "Fita para Juntas", quantity: 280, unit: "m", percentage: 62 }
  ],
  
  // Distribuição de materiais por projeto
  distribution: [
    { name: "Residencial Villa Moderna", value: 45 },
    { name: "Centro Empresarial Horizonte", value: 30 },
    { name: "Edifício Titanium", value: 15 },
    { name: "Outros", value: 10 }
  ]
};

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#f43f5e'];

const MaterialsUsage = ({ date = new Date() }: MaterialsUsageProps) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory" className="flex items-center gap-1">
            <Boxes className="h-4 w-4" />
            <span>Estoque</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>Consumo</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Estoque */}
        <TabsContent value="inventory" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Painéis em Estoque</CardTitle>
              <CardDescription>Quantidade de painéis prontos para instalação</CardDescription>
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
            <CardHeader>
              <CardTitle className="text-lg">Materiais em Estoque</CardTitle>
              <CardDescription>Inventário atual de materiais para produção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materialsData.materials.map((item, index) => {
                  const percentage = (item.quantity / item.threshold) * 100;
                  return (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category}</div>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Consumo */}
        <TabsContent value="usage" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consumo de Materiais</CardTitle>
                <CardDescription>Uso de materiais em {format(date, "MMMM 'de' yyyy", { locale: pt })}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    Perfil: { color: "#3b82f6" },
                    Parafusos: { color: "#22c55e" },
                    "Placa Cimentícia": { color: "#f97316" },
                    "Placa de Gesso": { color: "#8b5cf6" },
                    Isolamento: { color: "#f43f5e" },
                    "Massa para Juntas": { color: "#facc15" },
                    "Fita para Juntas": { color: "#06b6d4" }
                  }}
                >
                  <BarChartComponent data={materialsData.usage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="percentage" name="Consumo (%)" fill="#3b82f6" />
                  </BarChartComponent>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Projeto</CardTitle>
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              <CardTitle className="text-lg">Consumo Detalhado</CardTitle>
              <CardDescription>Consumo de materiais em {format(date, "MMMM 'de' yyyy", { locale: pt })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materialsData.usage.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-1">
                      <div className="font-medium">{item.name}</div>
                    </div>
                    <div className="col-span-2">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="font-bold">{item.quantity}</span> <span className="text-sm text-muted-foreground">{item.unit}</span>
                      <div className="text-sm text-muted-foreground">{item.percentage}% do esperado</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialsUsage;
