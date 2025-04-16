import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart3, Download, CalendarDays, Package, LayoutDashboard, RefreshCw, Activity, Clock, LineChart as LineChartIcon, PercentSquare, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, LineChart, Line, AreaChart as AreaChartComponent, Area, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ReportsProductionSection from "@/components/reports/ReportsProductionSection";
import ReportsMaterialsSection from "@/components/reports/ReportsMaterialsSection";
import ReportsEfficiencySection from "@/components/reports/ReportsEfficiencySection";

// Mock data remains in this file for now
const reportsData = {
  // Produção mensal
  monthlyProduction: [{
    month: "Janeiro",
    panels: 42,
    materials: 1250,
    year: 2025
  }, {
    month: "Fevereiro",
    panels: 58,
    materials: 1680,
    year: 2025
  }, {
    month: "Março",
    panels: 65,
    materials: 1920,
    year: 2025
  }, {
    month: "Abril",
    panels: 73,
    materials: 2150,
    year: 2025
  }, {
    month: "Maio",
    panels: 80,
    materials: 2380,
    year: 2025
  }, {
    month: "Junho",
    panels: 92,
    materials: 2720,
    year: 2025
  }],
  // Eficiência de produção
  efficiency: [{
    projeto: "Residencial Villa Moderna",
    planejado: 120,
    real: 115,
    eficiencia: 95.8
  }, {
    projeto: "Centro Empresarial Horizonte",
    planejado: 80,
    real: 72,
    eficiencia: 90
  }, {
    projeto: "Edifício Titanium",
    planejado: 45,
    real: 40,
    eficiencia: 88.9
  }, {
    projeto: "Condomínio Laguna",
    planejado: 65,
    real: 62,
    eficiencia: 95.4
  }],
  // Consumo de materiais
  materialUsage: [{
    name: "Concreto (m³)",
    planejado: 380,
    real: 392,
    variacao: 3.2
  }, {
    name: "Armação de Aço (kg)",
    planejado: 24000,
    real: 25200,
    variacao: 5
  }, {
    name: "Formas Metálicas (un)",
    planejado: 650,
    real: 680,
    variacao: 4.6
  }, {
    name: "Desmoldante (L)",
    planejado: 920,
    real: 890,
    variacao: -3.3
  }, {
    name: "Espaçadores (un)",
    planejado: 5800,
    real: 5950,
    variacao: 2.6
  }, {
    name: "Insertos (un)",
    planejado: 240,
    real: 255,
    variacao: 6.3
  }, {
    name: "Barras de Ancoragem (un)",
    planejado: 1800,
    real: 1750,
    variacao: -2.8
  }],
  // Tipos de painéis produzidos
  panelTypes: [{
    name: "Parede Interna",
    value: 45
  }, {
    name: "Parede Externa",
    value: 30
  }, {
    name: "Fachada",
    value: 15
  }, {
    name: "Divisória",
    value: 10
  }],
  // Tempo de produção
  productionTime: [{
    semana: "Semana 1",
    tempo: 42,
    meta: 40
  }, {
    semana: "Semana 2",
    tempo: 38,
    meta: 40
  }, {
    semana: "Semana 3",
    tempo: 41,
    meta: 40
  }, {
    semana: "Semana 4",
    tempo: 35,
    meta: 40
  }, {
    semana: "Semana 5",
    tempo: 37,
    meta: 40
  }, {
    semana: "Semana 6",
    tempo: 36,
    meta: 40
  }]
};

// Chart configuration
export const chartConfig = {
  panels: {
    color: "#3b82f6"
  },
  planejado: {
    color: "#3b82f6"
  },
  real: {
    color: "#f97316"
  },
  meta: {
    color: "#f43f5e"
  },
  tempo: {
    color: "#3b82f6"
  },
  variacao: {
    color: "#22c55e"
  },
  eficiencia: {
    color: "#f97316"
  }
};
export const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#f43f5e'];
const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(2025, 0, 1),
    to: new Date()
  });
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-display">
            Relatórios
          </h1>
          <p className="text-muted-foreground">
            Análise de produção e desempenho
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Período:</span> 2025
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" defaultMonth={dateRange.from} selected={dateRange} onSelect={range => range && setDateRange(range)} numberOfMonths={1} className="rounded-md border pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Abas de Relatórios */}
      <Tabs defaultValue="production" className="w-full mx-[13px]">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="production" className="flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Produção</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>Materiais</span>
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Eficiência</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Produção */}
        <TabsContent value="production">
          <ReportsProductionSection monthlyProduction={reportsData.monthlyProduction} panelTypes={reportsData.panelTypes} productionTime={reportsData.productionTime} chartConfig={chartConfig} colors={COLORS} />
        </TabsContent>
        
        {/* Tab de Materiais */}
        <TabsContent value="materials">
          <ReportsMaterialsSection materialUsage={reportsData.materialUsage} chartConfig={chartConfig} />
        </TabsContent>
        
        {/* Tab de Eficiência */}
        <TabsContent value="efficiency">
          <ReportsEfficiencySection efficiency={reportsData.efficiency} chartConfig={chartConfig} />
        </TabsContent>
      </Tabs>
    </div>;
};
export default Reports;