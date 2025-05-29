import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const AlertsCard = () => {
  return <Card className="overflow-hidden border-amber-200/20 shadow-lg shadow-amber-100/5 bg-gray-400">
      <CardHeader className="pb-2 bg-amber-50/50 dark:bg-amber-900/10 border-b border-amber-100/30 dark:border-amber-800/20 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          <span>Alertas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-400 dark:border-amber-600">
            <div className="font-medium text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
              <span className="line-clamp-1">Estoque Baixo</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-500 line-clamp-2">
              3 materiais com níveis críticos de estoque
            </p>
            <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-amber-700 dark:text-amber-400 text-xs">
              <Link to="/inventory">Verificar materiais</Link>
            </Button>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-400 dark:border-blue-600">
            <div className="font-medium text-blue-800 dark:text-blue-400 mb-1 flex items-center gap-1 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
              <span className="line-clamp-1">Tarefa Próxima</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-500 line-clamp-2">
              "Pedido de materiais" vence hoje
            </p>
            <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-blue-700 dark:text-blue-400 text-xs">
              <Link to="/tasks">Ver tarefa</Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-3 sm:px-4 py-2 sm:py-3 bg-zinc-50">
        <Button variant="ghost" size="sm" asChild className="w-full justify-between text-muted-foreground hover:text-primary text-xs sm:text-sm">
          <Link to="/reports" className="flex items-center justify-between w-full">
            <span className="text-zinc-800">Ver todos os alertas</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>;
};
export default AlertsCard;