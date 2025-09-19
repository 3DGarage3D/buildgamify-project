import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Step {
  id: string;
  title: string;
  description: string;
  href: string;
  completed: boolean;
}

interface GettingStartedProps {
  onDismiss?: () => void;
}

const GettingStarted = ({ onDismiss }: GettingStartedProps) => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "1",
      title: "Criar seu primeiro projeto",
      description: "Configure um novo projeto com detalhes básicos e cronograma",
      href: "/projects",
      completed: false
    },
    {
      id: "2", 
      title: "Adicionar membros da equipe",
      description: "Convide colaboradores e defina suas funções no projeto",
      href: "/team",
      completed: false
    },
    {
      id: "3",
      title: "Configurar cronograma",
      description: "Organize tarefas e marcos importantes no calendário",
      href: "/calendar", 
      completed: false
    },
    {
      id: "4",
      title: "Monitorar progresso",
      description: "Acompanhe métricas e relatórios de desempenho",
      href: "/reports",
      completed: false
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Primeiros Passos</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Configure sua conta em minutos
              </p>
            </div>
          </div>
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <Badge variant="outline">
              {completedSteps}/{steps.length}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
          >
            <button
              onClick={() => toggleStep(step.id)}
              className="flex-shrink-0"
            >
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                {step.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {step.description}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Link to={step.href}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
        
        {completedSteps === steps.length && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Parabéns!</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              Você completou a configuração inicial. Agora explore todas as funcionalidades!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GettingStarted;