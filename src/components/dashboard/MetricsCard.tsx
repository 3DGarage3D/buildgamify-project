
import { TrendingUp, BarChart, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MetricsCardProps {
  className?: string;
}

const MetricsCard = ({ className }: MetricsCardProps) => {
  return (
    <Card className={`overflow-hidden border-emerald-200/20 shadow-lg shadow-emerald-100/5 ${className}`}>
      <CardHeader className="pb-2 bg-emerald-50/50 dark:bg-emerald-900/10 border-b border-emerald-100/30 dark:border-emerald-800/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <span>Métricas Semanais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50/70 to-emerald-50/20 dark:from-emerald-900/20 dark:to-transparent p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Painéis Produzidos
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <AnimatedCounter value={18} duration={1000} className="text-lg font-bold" /> 
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">+12%</span>
              </div>
            </div>
            <div className="w-full bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50/70 to-blue-50/20 dark:from-blue-900/20 dark:to-transparent p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Eficiência da Produção
                </span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <AnimatedCounter value={92} formatter={(val) => `${val}%`} duration={1000} className="text-lg font-bold" /> 
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">+4%</span>
              </div>
            </div>
            <div className="w-full bg-blue-100/50 dark:bg-blue-900/20 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50/70 to-purple-50/20 dark:from-purple-900/20 dark:to-transparent p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  Uso de Materiais
                </span>
              </div>
              <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <AnimatedCounter value={85} formatter={(val) => `${val}%`} duration={1000} className="text-lg font-bold" /> 
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded-full">-2%</span>
              </div>
            </div>
            <div className="w-full bg-purple-100/50 dark:bg-purple-900/20 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t px-4 py-3">
        <Button variant="ghost" size="sm" asChild className="w-full justify-between text-muted-foreground hover:text-primary">
          <Link to="/reports" className="flex items-center justify-between w-full">
            <span>Ver relatório completo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MetricsCard;
