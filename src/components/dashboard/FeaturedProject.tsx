
import { Link } from "react-router-dom";
import { Users, Clock, ArrowUpRight, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProjectProps {
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
    category: string;
    client: string;
    location: string;
    status: string;
  };
  imageUrl: string;
}

const FeaturedProject = ({ project, imageUrl }: ProjectProps) => {
  return (
    <div className="rounded-xl overflow-hidden relative min-h-[320px] group shadow-lg shadow-primary/5 border border-primary/10">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 transform scale-105 group-hover:scale-110" 
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          opacity: 0.85
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/20" />
      
      {/* Content */}
      <div className="relative p-8 flex flex-col h-full justify-between text-white z-10">
        <div>
          <div className="flex items-center justify-between">
            <Badge className="bg-white/20 text-white border-white/20 mb-3">
              Projeto Destaque
            </Badge>
            <Badge className="bg-primary-foreground/10 text-white border-white/10">
              {project.status}
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-2 group-hover:text-white/90 transition-colors">
            {project.title}
          </h2>
          <p className="max-w-lg opacity-90 text-sm md:text-base line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Projeto</span>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 bg-white/30" indicatorClassName="bg-white" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 opacity-80" />
                <span className="text-sm font-medium">Prazo</span>
              </div>
              <p className="mt-1 text-sm">{new Date(project.dueDate).toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 opacity-80" />
                <span className="text-sm font-medium">Equipe</span>
              </div>
              <p className="mt-1 text-sm">{project.teamSize} membros</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 opacity-80" />
                <span className="text-sm font-medium">Tarefas</span>
              </div>
              <p className="mt-1 text-sm">{project.tasks.completed} de {project.tasks.total}</p>
            </div>
            
            <div className="bg-primary/30 rounded-lg p-3">
              <Button asChild size="sm" variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 h-full">
                <Link to="/projects" className="flex items-center justify-center gap-1">
                  Ver Detalhes
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
