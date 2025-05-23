
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AlertsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Alertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
            <div className="font-medium text-amber-800 dark:text-amber-400 mb-1">
              Estoque Baixo
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-500">
              3 materiais com níveis críticos de estoque
            </p>
            <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-amber-700 dark:text-amber-400">
              <Link to="/inventory">Verificar materiais</Link>
            </Button>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
            <div className="font-medium text-blue-800 dark:text-blue-400 mb-1">
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
    </Card>
  );
};

export default AlertsCard;
