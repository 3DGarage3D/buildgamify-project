
import React from "react";
import { 
  Clock, 
  Calendar, 
  Users, 
  BarChart,
  MapPin,
  User,
  CheckSquare,
  Layers,
  ArrowRight,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Project, Panel, PANEL_STAGE_LABELS } from "@/types/budget";

interface ProjectDetailCardProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({ project, onClose }) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Group panels by stage
  const panelsByStage = (project.panels || []).reduce((acc, panel) => {
    if (!acc[panel.stage]) {
      acc[panel.stage] = [];
    }
    acc[panel.stage].push(panel);
    return acc;
  }, {} as Record<string, Panel[]>);
  
  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-2xl font-display">{project.title}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <Badge 
            variant={
              project.status === 'active' ? 'default' : 
              project.status === 'completed' ? 'outline' : 'secondary'
            }
            className="h-fit"
          >
            {project.status === 'active' ? 'Ativo' : 
             project.status === 'completed' ? 'Concluído' : 'Em espera'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Prazo: {formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Equipe: <AnimatedCounter value={project.teamSize} duration={800} /> membros
                </span>
              </div>
              
              {project.client && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Cliente: {project.client}</span>
                </div>
              )}
              
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Local: {project.location}</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Progresso do Projeto</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Tarefas</h4>
              <div className="flex items-center gap-2 mb-1">
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">{project.tasks.completed}</span> de {project.tasks.total} concluídas
                </div>
              </div>
              <Progress 
                value={(project.tasks.completed / project.tasks.total) * 100} 
                className="h-2" 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Painéis em Produção</h4>
            
            {Object.keys(panelsByStage).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(panelsByStage).map(([stage, panels]) => (
                  <div key={stage} className="rounded-md border p-3">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="bg-primary/10">
                        {PANEL_STAGE_LABELS[stage as keyof typeof PANEL_STAGE_LABELS] || stage}
                      </Badge>
                      <span className="text-sm font-medium">{panels.length} painéis</span>
                    </div>
                    
                    <div className="space-y-2">
                      {panels.slice(0, 2).map((panel) => (
                        <div key={panel.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span>{panel.type}</span>
                            <span className="text-muted-foreground ml-2">
                              {panel.dimensions.width}x{panel.dimensions.height}cm
                            </span>
                          </div>
                          <Badge variant={
                            panel.priority === 'high' ? 'destructive' :
                            panel.priority === 'medium' ? 'secondary' : 'outline'
                          }>
                            {panel.priority === 'high' ? 'Alta' :
                             panel.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                        </div>
                      ))}
                      
                      {panels.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{panels.length - 2} painéis neste estágio
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Layers className="h-8 w-8 mb-2" />
                <p className="text-sm">Nenhum painel em produção</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-6 pb-6 flex justify-between">
        <Button variant="outline" onClick={onClose}>Fechar</Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/calendar" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Cronograma</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/inventory" className="flex items-center gap-1">
              <span>Ver Painéis</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectDetailCard;
