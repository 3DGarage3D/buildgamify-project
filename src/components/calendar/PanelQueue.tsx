
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
  Timer,
  Hammer,
  Factory,
  CheckSquare,
  CalendarClock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format, addHours, differenceInHours, isAfter } from "date-fns";
import { pt } from "date-fns/locale";
import PanelStageFlow from "./PanelStageFlow";
import { PanelStage, PANEL_STAGE_LABELS, PANEL_STAGE_DURATIONS } from "@/types/budget";

interface PanelQueueProps {
  date?: Date;
}

// Enhanced mock data for queue with concrete panel production specifics
const queueData = [
  {
    id: "q1",
    projectName: "Residencial Villa Moderna",
    projectId: "PROJ-001",
    panelType: "Parede Externa",
    panelId: "E-104",
    priority: "high",
    stage: "curing" as PanelStage,
    stageStartTime: new Date(2025, 5, 10, 10, 0),
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "8h",
    concreteType: "C40",
    reinforcementRatio: "80kg/m³",
    dimensions: {
      width: 320,
      height: 280,
      thickness: 20
    },
    curingConditions: {
      temperature: "23°C",
      humidity: "95%",
      timeRemaining: "48h"
    },
    weight: 4200, // kg
    materials: [
      { name: "Armação de aço", quantity: 380, unit: "kg", available: true },
      { name: "Concreto C40", quantity: 1.8, unit: "m³", available: true },
      { name: "Desmoldante", quantity: 5, unit: "L", available: true },
      { name: "Espaçadores", quantity: 120, unit: "un", available: false }
    ]
  },
  {
    id: "q2",
    projectName: "Centro Empresarial Horizonte",
    projectId: "PROJ-002",
    panelType: "Parede Interna",
    panelId: "I-208",
    priority: "medium",
    stage: "concrete-pouring" as PanelStage,
    stageStartTime: new Date(2025, 5, 11, 8, 30),
    scheduledDate: new Date(2025, 5, 13),
    requiredTime: "6h",
    concreteType: "C30",
    reinforcementRatio: "70kg/m³",
    dimensions: {
      width: 260,
      height: 240,
      thickness: 15
    },
    curingConditions: {
      temperature: "22°C",
      humidity: "90%",
      timeRemaining: "N/A"
    },
    weight: 2300, // kg
    materials: [
      { name: "Armação de aço", quantity: 210, unit: "kg", available: true },
      { name: "Concreto C30", quantity: 0.9, unit: "m³", available: true },
      { name: "Desmoldante", quantity: 3, unit: "L", available: true },
      { name: "Espaçadores", quantity: 80, unit: "un", available: true }
    ]
  },
  {
    id: "q3",
    projectName: "Residencial Villa Moderna",
    projectId: "PROJ-001",
    panelType: "Parede Interna",
    panelId: "I-106",
    priority: "low",
    stage: "formwork" as PanelStage,
    stageStartTime: new Date(2025, 5, 12, 9, 0),
    scheduledDate: new Date(2025, 5, 14),
    requiredTime: "4h",
    concreteType: "C25",
    reinforcementRatio: "60kg/m³",
    dimensions: {
      width: 240,
      height: 280,
      thickness: 10
    },
    curingConditions: {
      temperature: "N/A",
      humidity: "N/A",
      timeRemaining: "N/A"
    },
    weight: 1600, // kg
    materials: [
      { name: "Armação de aço", quantity: 180, unit: "kg", available: true },
      { name: "Concreto C25", quantity: 0.7, unit: "m³", available: true },
      { name: "Desmoldante", quantity: 2, unit: "L", available: true },
      { name: "Espaçadores", quantity: 60, unit: "un", available: true }
    ]
  },
  {
    id: "q4",
    projectName: "Centro Empresarial Horizonte",
    projectId: "PROJ-002",
    panelType: "Fachada",
    panelId: "F-002",
    priority: "high",
    stage: "demolding" as PanelStage,
    stageStartTime: new Date(2025, 5, 11, 14, 0),
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "16h",
    concreteType: "C50",
    reinforcementRatio: "90kg/m³",
    dimensions: {
      width: 400,
      height: 320,
      thickness: 25
    },
    curingConditions: {
      temperature: "24°C",
      humidity: "85%",
      timeRemaining: "Concluído"
    },
    weight: 7600, // kg
    materials: [
      { name: "Armação de aço", quantity: 620, unit: "kg", available: true },
      { name: "Concreto C50", quantity: 3.2, unit: "m³", available: true },
      { name: "Desmoldante", quantity: 7, unit: "L", available: true },
      { name: "Espaçadores", quantity: 160, unit: "un", available: true },
      { name: "Insertos metálicos", quantity: 8, unit: "un", available: false }
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
      case 'design':
        return <Factory className="h-4 w-4 mr-1" />;
      case 'reinforcement':
        return <Hammer className="h-4 w-4 mr-1" />;
      case 'formwork':
        return <Factory className="h-4 w-4 mr-1" />;
      case 'concrete-pouring':
        return <Droplets className="h-4 w-4 mr-1" />;
      case 'curing':
        return <CalendarClock className="h-4 w-4 mr-1" />;
      case 'demolding':
        return <Wrench className="h-4 w-4 mr-1" />;
      case 'quality-control':
        return <CheckSquare className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        Fila de Produção e Monitoramento
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
                    <CardTitle className="group flex items-center gap-2">
                      <span className="hover:text-primary transition-colors">
                        {item.projectName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.projectId}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      {item.panelType} - {item.panelId}
                      <span className="text-xs text-muted-foreground mx-1">•</span>
                      <span className="text-xs">
                        {item.dimensions.width}×{item.dimensions.height}×{item.dimensions.thickness}cm
                      </span>
                      <span className="text-xs text-muted-foreground mx-1">•</span>
                      <span className="text-xs">
                        {item.weight.toLocaleString()}kg
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
                    
                    {item.stage === 'curing' && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                        <p className="text-sm font-medium mb-2">Condições de Cura</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Temperatura</p>
                            <p className="text-sm font-medium">{item.curingConditions.temperature}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Umidade</p>
                            <p className="text-sm font-medium">{item.curingConditions.humidity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tempo Restante</p>
                            <p className="text-sm font-medium">{item.curingConditions.timeRemaining}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Especificações</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Tipo de Concreto</p>
                          <p className="text-sm font-medium">{item.concreteType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Taxa de Armação</p>
                          <p className="text-sm font-medium">{item.reinforcementRatio}</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">Materiais Necessários</p>
                    <div className="space-y-1 bg-muted/30 p-3 rounded-md">
                      {item.materials.map((mat, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className={!mat.available ? 'text-amber-600 dark:text-amber-400' : ''}>{mat.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mat.quantity} {mat.unit}</span>
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
