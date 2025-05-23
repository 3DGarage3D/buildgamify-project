
import { Link } from "react-router-dom";
import { Users, Clock, ArrowUpRight } from "lucide-react";
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
    <div className="rounded-xl overflow-hidden relative min-h-[280px]">
      <div 
        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 transform scale-105" 
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          opacity: 0.85
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      
      <div className="relative p-8 flex flex-col h-full justify-between text-white">
        <div>
          <Badge className="bg-white/20 text-white border-white/20 mb-3">
            Destaque
          </Badge>
          <h2 className="text-2xl font-bold font-display mb-2">
            {project.title}
          </h2>
          <p className="max-w-lg opacity-90">
            {project.description}
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso do Projeto</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2 bg-white/20" />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 opacity-80" />
                <span>Prazo: {new Date(project.dueDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 opacity-80" />
                <span>{project.teamSize} membros</span>
              </div>
            </div>
            
            <Button asChild size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/projects" className="flex items-center gap-1">
                Ver Projeto
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
