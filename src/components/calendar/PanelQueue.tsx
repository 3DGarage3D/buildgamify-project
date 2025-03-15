
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Clock,
  Droplets,
  Wrench,
  Timer
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format, addHours, differenceInHours, isAfter } from "date-fns";
import { pt } from "date-fns/locale";
import PanelStageFlow from "./PanelStageFlow";
import { PanelStage, PANEL_STAGE_DURATIONS } from "@/types/budget";

interface PanelQueueProps {
  date?: Date;
}

// Enhanced mock data for queue with curing and demolding times
const queueData = [
  {
    id: "q1",
    projectName: "Residencial Villa Moderna",
    projectId: "1",
    panelType: "Parede Externa",
    panelId: "E-104",
    priority: "high",
    stage: "curing" as PanelStage,
    stageStartTime: new Date(2025, 5, 10, 10, 0),
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "8h",
    dimensions: {
      width: 320,
      height: 280,
      thickness: 20
    },
    materials: [
      { name: "Perfil Metálico", quantity: 120, available: true },
      { name: "Parafusos", quantity: 500, available: true },
      { name: "Placa Cimentícia", quantity: 24, available: false }
    ]
  },
  {
    id: "q2",
    projectName: "Centro Empresarial Horizonte",
    projectId: "2",
    panelType: "Parede Interna",
    panelId: "I-208",
    priority: "medium",
    stage: "concrete-pouring" as PanelStage,
    stageStartTime: new Date(2025, 5, 11, 8, 30),
    scheduledDate: new Date(2025, 5, 13),
    requiredTime: "6h",
    dimensions: {
      width: 260,
      height: 240,
      thickness: 15
    },
    materials: [
      { name: "Perfil Metálico", quantity: 80, available: true },
      { name: "Parafusos", quantity: 350, available: true },
      { name: "Placa de Gesso", quantity: 18, available: true }
    ]
  },
  {
    id: "q3",
    projectName: "Residencial Villa Moderna",
    projectId: "1",
    panelType: "Parede Interna",
    panelId: "I-106",
    priority: "low",
    stage: "formwork" as PanelStage,
    stageStartTime: new Date(2025, 5, 12, 9, 0),
    scheduledDate: new Date(2025, 5, 14),
    requiredTime: "4h",
    dimensions: {
      width: 240,
      height: 280,
      thickness: 10
    },
    materials: [
      { name: "Perfil Metálico", quantity: 60, available: true },
      { name: "Parafusos", quantity: 250, available: true },
      { name: "Placa de Gesso", quantity: 12, available: true }
    ]
  },
  {
    id: "q4",
    projectName: "Centro Empresarial Horizonte",
    projectId: "2",
    panelType: "Fachada",
    panelId: "F-002",
    priority: "high",
    stage: "demolding" as PanelStage,
    stageStartTime: new Date(2025, 5, 11, 14, 0),
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "16h",
    dimensions: {
      width: 400,
      height: 320,
      thickness: 25
    },
    materials: [
      { name: "Perfil Metálico", quantity: 200, available: true },
      { name: "Parafusos", quantity: 800, available: true },
      { name: "Placa Cimentícia", quantity: 46, available: false },
      { name: "Isolamento", quantity: 46, available: true }
    ]
  }
];

const PanelQueue = ({ date = new Date() }: PanelQueueProps) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-900">
            <ArrowUp className="h-3 w-3 mr-1" />
            Alta
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900">
            <MoreHorizontal className="h-3 w-3 mr-1" />
            Média
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-900">
            <ArrowDown className="h-3 w-3 mr-1" />
            Baixa
          </Badge>
        );
    }
  };

  // Sort by priority and date
  const sortedQueue = [...queueData].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority as keyof typeof priorityOrder] !== priorityOrder[b.priority as keyof typeof priorityOrder]) {
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return a.scheduledDate.getTime() - b.scheduledDate.getTime();
  });

  const areMaterialsAvailable = (materials: any[]) => {
    return materials.every(material => material.available);
  };

  const calculateStageDuration = (stage: PanelStage) => {
    return PANEL_STAGE_DURATIONS[stage] || 24; // default to 24 hours if not specified
  };

  const calculateStageProgress = (startTime: Date, stage: PanelStage) => {
    const now = new Date();
    const stageDuration = calculateStageDuration(stage) * 60 * 60 * 1000; // convert hours to ms
    const elapsed = now.getTime() - startTime.getTime();
    return Math.min(Math.round((elapsed / stageDuration) * 100), 100);
  };

  const calculateRemainingTime = (startTime: Date, stage: PanelStage) => {
    const now = new Date();
    const stageDuration = calculateStageDuration(stage);
    const endTime = addHours(startTime, stageDuration);
    
    if (isAfter(now, endTime)) {
      return "Concluído";
    }
    
    const hoursRemaining = differenceInHours(endTime, now);
    return `${hoursRemaining}h restantes`;
  };

  const getStageIcon = (stage: PanelStage) => {
    switch (stage) {
      case 'curing':
        return <Droplets className="h-4 w-4 mr-1" />;
      case 'demolding':
        return <Wrench className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        Fila de Produção
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {sortedQueue.map((item) => {
          const stageProgress = calculateStageProgress(item.stageStartTime, item.stage);
          const remainingTime = calculateRemainingTime(item.stageStartTime, item.stage);
          
          return (
            <Card key={item.id} className={`overflow-hidden transition-all duration-200 ${!areMaterialsAvailable(item.materials) ? 'border-amber-300 bg-amber-50/30 dark:bg-amber-950/5' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <CardTitle className="group">
                      <span className="hover:text-primary transition-colors">
                        {item.projectName}
                      </span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {item.panelId}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      {item.panelType}
                      <span className="text-xs text-muted-foreground mx-1">•</span>
                      <span className="text-xs">
                        {item.dimensions.width}×{item.dimensions.height}×{item.dimensions.thickness}cm
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.priority)}
                    {!areMaterialsAvailable(item.materials) && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900">
                        Aguardando materiais
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <PanelStageFlow currentStage={item.stage} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          {getStageIcon(item.stage)}
                          <span className="text-sm font-medium">
                            {PANEL_STAGE_LABELS[item.stage]}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {remainingTime}
                        </span>
                      </div>
                      <Progress value={stageProgress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Data Programada</p>
                        <p className="font-medium">{format(item.scheduledDate, "dd/MM/yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tempo Estimado</p>
                        <p className="font-medium">{item.requiredTime}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Materiais Necessários</p>
                    <div className="space-y-1">
                      {item.materials.map((mat, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className={!mat.available ? 'text-amber-600 dark:text-amber-400' : ''}>{mat.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mat.quantity}</span>
                            {!mat.available && (
                              <Badge variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-400">
                                Indisponível
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PanelQueue;
