
import { useState } from "react";
import { CheckCircle, Circle, Clock, Star, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate: string;
    points: number;
  };
  className?: string;
  compact?: boolean;
}

const TaskItem = ({ task, className, compact = false }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-orange-500";
      default:
        return "text-emerald-500";
    }
  };
  
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-emerald-500",
          label: "Concluída"
        };
      case "in-progress":
        return {
          icon: Clock,
          color: "text-orange-500",
          label: "Em andamento"
        };
      default:
        return {
          icon: Circle,
          color: "text-muted-foreground",
          label: "Pendente"
        };
    }
  };
  
  const statusDetails = getStatusDetails(task.status);
  const priorityColor = getPriorityColor(task.priority);
  
  const formattedDate = new Date(task.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  });
  
  if (compact) {
    return (
      <div className={cn(
        "flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-accent/30 transition-colors",
        task.status === "completed" && "bg-muted/50",
        className
      )}>
        <div className="flex items-center gap-2">
          <statusDetails.icon className={cn("h-3 w-3", statusDetails.color)} />
          <div>
            <h4 className={cn(
              "font-medium text-xs",
              task.status === "completed" && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h4>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
            {statusDetails.label}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group relative rounded-lg border bg-card p-4 transition-all duration-200",
        task.status === "completed" && "bg-muted/50",
        className
      )}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <statusDetails.icon className={cn("h-5 w-5", statusDetails.color)} />
          
          <div>
            <h3 className={cn(
              "font-medium",
              task.status === "completed" && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {!isExpanded && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs flex gap-1 items-center",
              task.status === "completed" ? "bg-muted" : "bg-secondary"
            )}
          >
            <Star className="h-3 w-3 text-blue-400" />
            {task.points}
          </Badge>
          
          <div className="flex items-center gap-1 text-xs">
            <AlertTriangle className={cn("h-3 w-3", priorityColor)} />
            <span className="hidden sm:inline text-muted-foreground">{formattedDate}</span>
          </div>
          
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-90"
          )} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pl-8 animate-slide-down">
          <p className="text-sm text-muted-foreground mb-2">
            {task.description}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline" className={statusDetails.color}>
              {statusDetails.label}
            </Badge>
            
            <Badge variant="outline" className={priorityColor}>
              Prioridade {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
            </Badge>
            
            <Badge variant="outline">
              Data limite: {formattedDate}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
