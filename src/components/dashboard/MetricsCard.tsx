
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const MetricsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Métricas Semanais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Painéis Produzidos
            </span>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <AnimatedCounter value={18} duration={1000} /> 
              <span className="text-xs">+12%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Eficiência da Produção
            </span>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <AnimatedCounter value={92} formatter={(val) => `${val}%`} duration={1000} /> 
              <span className="text-xs">+4%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Uso de Materiais
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <AnimatedCounter value={85} formatter={(val) => `${val}%`} duration={1000} /> 
              <span className="text-xs">-2%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
