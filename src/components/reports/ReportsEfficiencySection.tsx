
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
  BarChart3,
  Activity
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface ReportsEfficiencySectionProps {
  efficiency: Array<{
    projeto: string;
    planejado: number;
    real: number;
    eficiencia: number;
  }>;
  chartConfig: {
    [key: string]: { color: string };
  };
}

const ReportsEfficiencySection: React.FC<ReportsEfficiencySectionProps> = ({
  efficiency,
  chartConfig
}) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Eficiência de Produção por Projeto</CardTitle>
            <CardDescription>Quantidade de painéis: planejado vs. real</CardDescription>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={efficiency}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="projeto" 
                fontSize={12} 
                tick={{ fontSize: 11 }}
                angle={-25} 
                textAnchor="end"
                height={60}
              />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="planejado" name="Painéis Planejados" fill="#3b82f6" />
              <Bar dataKey="real" name="Painéis Produzidos" fill="#22c55e" />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t py-3">
          <div className="w-full overflow-x-auto">
            <p>Total planejado: 310 painéis | Total produzido: 289 painéis | Eficiência global: 93.2%</p>
          </div>
        </CardFooter>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Taxa de Eficiência</CardTitle>
            <CardDescription>Percentual de eficiência por projeto</CardDescription>
          </div>
          <Activity className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={efficiency}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="projeto" 
                fontSize={12}
                tick={{ fontSize: 11 }}
                angle={-25} 
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[80, 100]} 
                ticks={[80, 85, 90, 95, 100]} 
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="eficiencia" name="Eficiência (%)" fill="#f97316" />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-sm">
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-md">
              <h4 className="font-medium mb-1 flex items-center gap-1">
                <Activity className="h-4 w-4 text-green-600" />
                Projeto mais eficiente
              </h4>
              <p className="text-sm">Residencial Villa Moderna: 95.8%</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md">
              <h4 className="font-medium mb-1 flex items-center gap-1">
                <Activity className="h-4 w-4 text-amber-600" />
                Média de eficiência
              </h4>
              <p className="text-sm">Todos os projetos: 92.5%</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-md">
              <h4 className="font-medium mb-1 flex items-center gap-1">
                <Activity className="h-4 w-4 text-blue-600" />
                Meta estabelecida
              </h4>
              <p className="text-sm">Eficiência de produção: 95%</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportsEfficiencySection;
