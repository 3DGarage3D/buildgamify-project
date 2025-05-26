
import { Link } from "react-router-dom";
import { Users, Clock, ArrowUpRight, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  // Usar imagens mais relevantes ao tema do sistema
  const thematicImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&crop=entropy", // Modern office building
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop&crop=entropy", // Team collaboration
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&crop=entropy", // Construction/manufacturing
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&crop=entropy", // Business analytics
  ];
  
  const selectedImage = thematicImages[Math.floor(Math.random() * thematicImages.length)];

  return (
    <div className="rounded-xl overflow-hidden relative min-h-[280px] sm:min-h-[320px] group shadow-lg shadow-primary/5 border border-primary/10">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 transform scale-105 group-hover:scale-110" 
        style={{ 
          backgroundImage: `url(${selectedImage})`,
          opacity: 0.85
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/20" />
      
      {/* Content */}
      <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col h-full justify-between text-white z-10">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <Badge className="bg-white/20 text-white border-white/20">
              Projeto Destaque
            </Badge>
            <Badge className="bg-primary-foreground/10 text-white border-white/10">
              {project.status}
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display mb-2 group-hover:text-white/90 transition-colors text-white">
            {project.title}
          </h2>
          <p className="max-w-lg opacity-90 text-sm sm:text-base line-clamp-2 text-white">
            {project.description}
          </p>
        </div>
        
        <div className="space-y-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-white">Progresso do Projeto</span>
              <span className="text-xs sm:text-sm font-medium text-white">{project.progress}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300" 
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 opacity-80 text-white" />
                <span className="text-xs sm:text-sm font-medium text-white">Prazo</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white">{new Date(project.dueDate).toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 opacity-80 text-white" />
                <span className="text-xs sm:text-sm font-medium text-white">Equipe</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white">{project.teamSize} membros</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <BarChart className="h-3 w-3 sm:h-4 sm:w-4 opacity-80 text-white" />
                <span className="text-xs sm:text-sm font-medium text-white">Tarefas</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white">{project.tasks.completed} de {project.tasks.total}</p>
            </div>
            
            <div className="bg-primary/30 rounded-lg p-2 sm:p-3 col-span-2 lg:col-span-1">
              <Button asChild size="sm" variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 h-full text-xs sm:text-sm">
                <Link to="/projects" className="flex items-center justify-center gap-1">
                  Ver Detalhes
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
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
