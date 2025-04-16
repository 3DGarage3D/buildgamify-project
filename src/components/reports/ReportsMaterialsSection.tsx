
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
  LineChart as LineChartIcon
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

interface ReportsMaterialsSectionProps {
  materialUsage: Array<{
    name: string;
    planejado: number;
    real: number;
    variacao: number;
  }>;
  chartConfig: {
    [key: string]: { color: string };
  };
}

const ReportsMaterialsSection: React.FC<ReportsMaterialsSectionProps> = ({
  materialUsage,
  chartConfig
}) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Consumo de Materiais para Painéis</CardTitle>
            <CardDescription>Comparação entre planejado e real (concreto, aço e outros)</CardDescription>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="h-[350px] sm:h-[400px]">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={materialUsage} 
              layout="vertical"
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={120} 
                fontSize={12}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="planejado" name="Planejado" fill="#3b82f6" />
              <Bar dataKey="real" name="Real" fill="#f97316" />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-t">
          <div className="bg-muted/30 p-3 rounded-md">
            <h4 className="font-medium mb-2 text-sm">Principais Materiais Utilizados</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li className="flex justify-between"><span>Concreto Usinado (fck 40 MPa)</span><span>70% do volume</span></li>
              <li className="flex justify-between"><span>Aço CA-50</span><span>25% do peso</span></li>
              <li className="flex justify-between"><span>Aço CA-60</span><span>5% do peso</span></li>
            </ul>
          </div>
          <div className="bg-muted/30 p-3 rounded-md">
            <h4 className="font-medium mb-2 text-sm">Taxas de Consumo (por m² de painel)</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li className="flex justify-between"><span>Concreto</span><span>0.12 m³/m²</span></li>
              <li className="flex justify-between"><span>Aço</span><span>12.5 kg/m²</span></li>
              <li className="flex justify-between"><span>Insertos</span><span>0.8 un/m²</span></li>
            </ul>
          </div>
        </CardFooter>
      </Card>
      
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Variação no Consumo de Materiais</CardTitle>
            <CardDescription>Diferença percentual entre planejado e real</CardDescription>
          </div>
          <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="h-[250px] sm:h-[300px]">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={materialUsage}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={11} 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                domain={[-10, 10]} 
                ticks={[-10, -5, 0, 5, 10]} 
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="variacao" 
                name="Variação (%)" 
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
        <CardFooter className="text-sm text-muted-foreground border-t py-3">
          <div className="w-full overflow-x-auto">
            <p>Variação média: +2.1% acima do planejado | Concreto: +3.2% | Aço: +5.0% | Economia em desmoldante: -3.3%</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportsMaterialsSection;
