
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AlertsCard = () => {
  return (
    <Card className="overflow-hidden border-amber-200/20 shadow-lg shadow-amber-100/5">
      <CardHeader className="pb-2 bg-amber-50/50 dark:bg-amber-900/10 border-b border-amber-100/30 dark:border-amber-800/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span>Alertas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-400 dark:border-amber-600">
            <div className="font-medium text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
              Estoque Baixo
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-500">
              3 materiais com níveis críticos de estoque
            </p>
            <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-amber-700 dark:text-amber-400">
              <Link to="/inventory">Verificar materiais</Link>
            </Button>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-400 dark:border-blue-600">
            <div className="font-medium text-blue-800 dark:text-blue-400 mb-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Tarefa Próxima
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-500">
              "Pedido de materiais" vence hoje
            </p>
            <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-blue-700 dark:text-blue-400">
              <Link to="/tasks">Ver tarefa</Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t px-4 py-3">
        <Button variant="ghost" size="sm" asChild className="w-full justify-between text-muted-foreground hover:text-primary">
          <Link to="/reports" className="flex items-center justify-between w-full">
            <span>Ver todos os alertas</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlertsCard;
