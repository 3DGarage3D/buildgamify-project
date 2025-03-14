
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
  AreaChart,
  BarChart3,
  Download,
  CalendarDays,
  Package,
  LayoutDashboard,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart as AreaChartComponent,
  Area,
  Cell
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data
const reportsData = {
  // Produção mensal
  monthlyProduction: [
    { month: "Janeiro", panels: 42, materials: 1250, year: 2025 },
    { month: "Fevereiro", panels: 58, materials: 1680, year: 2025 },
    { month: "Março", panels: 65, materials: 1920, year: 2025 },
    { month: "Abril", panels: 73, materials: 2150, year: 2025 },
    { month: "Maio", panels: 80, materials: 2380, year: 2025 },
    { month: "Junho", panels: 92, materials: 2720, year: 2025 }
  ],
  
  // Eficiência de produção
  efficiency: [
    { projeto: "Residencial Villa Moderna", planejado: 120, real: 115, eficiencia: 95.8 },
    { projeto: "Centro Empresarial Horizonte", planejado: 80, real: 72, eficiencia: 90 },
    { projeto: "Edifício Titanium", planejado: 45, real: 40, eficiencia: 88.9 },
    { projeto: "Condomínio Laguna", planejado: 65, real: 62, eficiencia: 95.4 }
  ],
  
  // Consumo de materiais
  materialUsage: [
    { name: "Perfil Metálico", planejado: 3800, real: 3920, variacao: 3.2 },
    { name: "Parafusos", planejado: 24000, real: 25200, variacao: 5 },
    { name: "Placa Cimentícia", planejado: 650, real: 680, variacao: 4.6 },
    { name: "Placa de Gesso", planejado: 920, real: 890, variacao: -3.3 },
    { name: "Isolamento", planejado: 580, real: 595, variacao: 2.6 },
    { name: "Massa para Juntas", planejado: 240, real: 255, variacao: 6.3 },
    { name: "Fita para Juntas", planejado: 1800, real: 1750, variacao: -2.8 }
  ],
  
  // Tipos de painéis produzidos
  panelTypes: [
    { name: "Parede Interna", value: 45 },
    { name: "Parede Externa", value: 30 },
    { name: "Fachada", value: 15 },
    { name: "Divisória", value: 10 }
  ],
  
  // Tempo de produção
  productionTime: [
    { semana: "Semana 1", tempo: 42, meta: 40 },
    { semana: "Semana 2", tempo: 38, meta: 40 },
    { semana: "Semana 3", tempo: 41, meta: 40 },
    { semana: "Semana 4", tempo: 35, meta: 40 },
    { semana: "Semana 5", tempo: 37, meta: 40 },
    { semana: "Semana 6", tempo: 36, meta: 40 }
  ]
};

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#f43f5e'];

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(2025, 0, 1),
    to: new Date()
  });

  // Create a custom bar component to handle the conditional coloring
  const renderBarWithConditionalFill = (props: any) => {
    const { x, y, width, height, variacao } = props;
    
    // Determine the fill color based on the variacao value
    const fill = variacao >= 0 ? "#22c55e" : "#ef4444";
    
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Relatórios
          </h1>
          <p className="text-muted-foreground">
            Análise de produção e desempenho
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Período: 2025</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => range && setDateRange(range)}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
          <Button size="sm" variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Atualizar</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
      
      {/* Abas de Relatórios */}
      <Tabs defaultValue="production" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="production" className="flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Produção</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>Materiais</span>
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Eficiência</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Produção */}
        <TabsContent value="production" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Produção Mensal de Painéis</CardTitle>
                <CardDescription>Quantidade de painéis produzidos por mês em 2025</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    panels: { color: "#3b82f6" }
                  }}
                >
                  <AreaChartComponent data={reportsData.monthlyProduction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="panels" name="Painéis Produzidos" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.2} />
                  </AreaChartComponent>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipos de Painéis Produzidos</CardTitle>
                <CardDescription>Distribuição por tipo de painel</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    "Parede Interna": { color: "#3b82f6" },
                    "Parede Externa": { color: "#22c55e" },
                    "Fachada": { color: "#f97316" },
                    "Divisória": { color: "#8b5cf6" },
                  }}
                >
                  <PieChart>
                    <Pie
                      data={reportsData.panelTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportsData.panelTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tempo Médio de Produção</CardTitle>
              <CardDescription>Horas por painel por semana</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  tempo: { color: "#3b82f6" },
                  meta: { color: "#f43f5e" }
                }}
              >
                <LineChart data={reportsData.productionTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="tempo" name="Tempo Real (h)" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="meta" name="Meta (h)" stroke="#f43f5e" strokeDasharray="5 5" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Materiais */}
        <TabsContent value="materials" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consumo de Materiais</CardTitle>
              <CardDescription>Comparação entre planejado e real</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ChartContainer
                config={{
                  planejado: { color: "#3b82f6" },
                  real: { color: "#f97316" }
                }}
              >
                <BarChart data={reportsData.materialUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="planejado" name="Planejado" fill="#3b82f6" />
                  <Bar dataKey="real" name="Real" fill="#f97316" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variação no Consumo de Materiais</CardTitle>
              <CardDescription>Diferença percentual entre planejado e real</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  variacao: { 
                    theme: {
                      light: "#22c55e",
                      dark: "#22c55e"
                    }
                  }
                }}
              >
                <BarChart data={reportsData.materialUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="variacao" 
                    name="Variação (%)" 
                    fill="#22c55e"
                    shape={(props) => {
                      const { x, y, width, height, value } = props;
                      return (
                        <rect 
                          x={x} 
                          y={y} 
                          width={width} 
                          height={height} 
                          fill={value >= 0 ? "#22c55e" : "#ef4444"} 
                        />
                      );
                    }}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Eficiência */}
        <TabsContent value="efficiency" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eficiência de Produção por Projeto</CardTitle>
              <CardDescription>Quantidade de painéis: planejado vs. real</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  planejado: { color: "#3b82f6" },
                  real: { color: "#22c55e" }
                }}
              >
                <BarChart data={reportsData.efficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="projeto" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="planejado" name="Painéis Planejados" fill="#3b82f6" />
                  <Bar dataKey="real" name="Painéis Produzidos" fill="#22c55e" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taxa de Eficiência</CardTitle>
              <CardDescription>Percentual de eficiência por projeto</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  eficiencia: { color: "#f97316" }
                }}
              >
                <BarChart data={reportsData.efficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="projeto" />
                  <YAxis domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="eficiencia" name="Eficiência (%)" fill="#f97316" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
