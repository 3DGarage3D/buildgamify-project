
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  AreaChart,
  PercentSquare,
  Clock
} from "lucide-react";
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

interface ReportsProductionSectionProps {
  monthlyProduction: Array<{
    month: string;
    panels: number;
    materials: number;
    year: number;
  }>;
  panelTypes: Array<{
    name: string;
    value: number;
  }>;
  productionTime: Array<{
    semana: string;
    tempo: number;
    meta: number;
  }>;
  chartConfig: {
    [key: string]: { color: string };
  };
  colors: string[];
}

const ReportsProductionSection: React.FC<ReportsProductionSectionProps> = ({
  monthlyProduction,
  panelTypes,
  productionTime,
  chartConfig,
  colors
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Produção Mensal de Painéis</CardTitle>
              <CardDescription>Quantidade de painéis produzidos por mês em 2025</CardDescription>
            </div>
            <AreaChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChartComponent 
                    data={monthlyProduction}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="panels" 
                      name="Painéis Produzidos" 
                      fill="#3b82f6" 
                      stroke="#3b82f6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChartComponent>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Tipos de Painéis Produzidos</CardTitle>
              <CardDescription>Distribuição por tipo de painel</CardDescription>
            </div>
            <PercentSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={panelTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {panelTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Tempo Médio de Produção</CardTitle>
            <CardDescription>Horas por painel por semana vs meta estabelecida</CardDescription>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={productionTime}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" fontSize={12} />
                  <YAxis domain={[30, 45]} ticks={[30, 35, 40, 45]} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="tempo" name="Tempo Real (h)" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="meta" name="Meta (h)" stroke="#f43f5e" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t py-3">
          <div className="w-full overflow-x-auto">
            <p>Tempo médio atual: 38.2h por painel | Meta: 40h por painel | Desempenho: 104.7% acima da meta</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportsProductionSection;
