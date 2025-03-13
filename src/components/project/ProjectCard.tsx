
import { Clock, Calendar, Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    progress: number;
    dueDate: string;
    teamSize: number;
    tasks: {
      total: number;
      completed: number;
    };
  };
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 hover-card",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      {/* Progress indicator */}
      <div className="absolute inset-x-0 top-0 h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${project.progress}%` }}
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-xl font-medium tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              <AnimatedCounter value={project.teamSize} duration={800} /> membros
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              <AnimatedCounter 
                value={project.progress} 
                duration={1000} 
                formatter={(val) => `${val}%`} 
              /> completo
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span>
              <AnimatedCounter 
                value={project.tasks.completed} 
                duration={800} 
              />/{project.tasks.total} tarefas
            </span>
          </div>
        </div>
      </div>
      
      {/* Hover effect gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </div>
  );
};

export default ProjectCard;
