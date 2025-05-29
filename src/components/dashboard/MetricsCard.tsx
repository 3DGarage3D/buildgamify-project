import { TrendingUp, BarChart, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface MetricsCardProps {
  className?: string;
}
const MetricsCard = ({
  className
}: MetricsCardProps) => {
  const metrics = [{
    label: "Painéis Produzidos",
    value: 18,
    percentage: 75,
    trend: "+12%",
    color: "emerald",
    status: "good" // good, warning, danger
  }, {
    label: "Eficiência da Produção",
    value: 92,
    percentage: 92,
    trend: "+4%",
    color: "blue",
    status: "excellent"
  }, {
    label: "Uso de Materiais",
    value: 85,
    percentage: 85,
    trend: "-2%",
    color: "amber",
    status: "warning"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'good':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'warning':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'danger':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  return <Card className={`overflow-hidden border-emerald-200/20 shadow-lg shadow-emerald-100/5 ${className}`}>
      <CardHeader className="pb-2 bg-emerald-50/50 dark:bg-emerald-900/10 border-b border-emerald-100/30 dark:border-emerald-800/20 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
          <span>Métricas Semanais</span>
          <Badge variant="outline" className="ml-auto text-xs">
            Atualizado há 5min
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {metrics.map((metric, index) => <div key={index} className={`bg-gradient-to-r from-${metric.color}-50/70 to-${metric.color}-50/20 dark:from-${metric.color}-900/20 dark:to-transparent p-3 sm:p-4 rounded-lg border border-${metric.color}-100/20 dark:border-${metric.color}-800/20`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <BarChart className={`h-3 w-3 sm:h-4 sm:w-4 text-${metric.color}-600`} />
                  <span className={`text-xs sm:text-sm font-medium text-${metric.color}-700 dark:text-${metric.color}-400`}>
                    {metric.label}
                  </span>
                  {metric.status === 'warning' && <AlertCircle className="h-3 w-3 text-amber-500" />}
                </div>
                <div className={`flex items-center gap-1 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                  <AnimatedCounter value={metric.value} formatter={val => metric.label.includes('Eficiência') ? `${val}%` : val.toString()} duration={1000} className="text-base sm:text-lg font-bold" /> 
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(metric.status)}`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              <div className={`w-full bg-${metric.color}-100/50 dark:bg-${metric.color}-900/20 rounded-full h-1.5`}>
                <div className={`${getProgressColor(metric.status)} h-1.5 rounded-full transition-all duration-500`} style={{
              width: `${metric.percentage}%`
            }}></div>
              </div>
              {metric.status === 'warning' && <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                  ⚠️ Atenção necessária - Considere otimização
                </div>}
            </div>)}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t px-3 sm:px-4 py-2 sm:py-3">
        <Button variant="ghost" size="sm" asChild className="w-full justify-between text-muted-foreground hover:text-primary text-xs sm:text-sm">
          <Link to="/reports" className="flex items-center justify-between w-full">
            <span className="text-zinc-800">Ver relatório completo</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>;
};
export default MetricsCard;