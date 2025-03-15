
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Hammer,
  Droplets,
  Wrench,
  Factory
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { PanelStage, PANEL_STAGE_LABELS } from "@/types/budget";

interface PanelProductionScheduleProps {
  date?: Date;
  view: "day" | "week" | "month";
}

// Enhanced mock data for concrete panel production
const productionData = [
  {
    id: "p1",
    projectName: "Residencial Villa Moderna",
    projectId: "PROJ-001",
    panelType: "Parede Externa",
    panelId: "E-103",
    startDate: new Date(2025, 5, 10, 8, 0),
    endDate: new Date(2025, 5, 10, 16, 0),
    status: "in-progress",
    progress: 75,
    stage: "formwork" as PanelStage,
    team: "Equipe A",
    dimensions: {
      width: 320,
      height: 280,
      thickness: 20
    },
    weight: 4200, // kg
    concreteType: "C40",
    reinforcementType: "CA-50",
    materials: [
      { name: "Armação de aço", quantity: 380, unit: "kg" },
      { name: "Concreto C40", quantity: 1.8, unit: "m³" },
      { name: "Desmoldante", quantity: 5, unit: "L" },
      { name: "Espaçadores", quantity: 120, unit: "un" }
    ]
  },
  {
    id: "p2",
    projectName: "Centro Empresarial Horizonte",
    projectId: "PROJ-002",
    panelType: "Parede Interna",
    panelId: "I-207",
    startDate: new Date(2025, 5, 10, 9, 0),
    endDate: new Date(2025, 5, 11, 12, 0),
    status: "pending",
    progress: 0,
    stage: "reinforcement" as PanelStage,
    team: "Equipe B",
    dimensions: {
      width: 260,
      height: 240,
      thickness: 15
    },
    weight: 2300, // kg
    concreteType: "C30",
    reinforcementType: "CA-50",
    materials: [
      { name: "Armação de aço", quantity: 210, unit: "kg" },
      { name: "Concreto C30", quantity: 0.9, unit: "m³" },
      { name: "Desmoldante", quantity: 3, unit: "L" },
      { name: "Espaçadores", quantity: 80, unit: "un" }
    ]
  },
  {
    id: "p3",
    projectName: "Residencial Villa Moderna",
    projectId: "PROJ-001",
    panelType: "Parede Interna",
    panelId: "I-105",
    startDate: new Date(2025, 5, 9, 13, 0),
    endDate: new Date(2025, 5, 9, 17, 0),
    status: "completed",
    progress: 100,
    stage: "quality-control" as PanelStage,
    team: "Equipe C",
    dimensions: {
      width: 240,
      height: 280,
      thickness: 10
    },
    weight: 1600, // kg
    concreteType: "C25",
    reinforcementType: "CA-60",
    materials: [
      { name: "Armação de aço", quantity: 180, unit: "kg" },
      { name: "Concreto C25", quantity: 0.7, unit: "m³" },
      { name: "Desmoldante", quantity: 2, unit: "L" },
      { name: "Espaçadores", quantity: 60, unit: "un" }
    ]
  },
  {
    id: "p4",
    projectName: "Centro Empresarial Horizonte",
    projectId: "PROJ-002",
    panelType: "Fachada",
    panelId: "F-001",
    startDate: new Date(2025, 5, 11, 8, 0),
    endDate: new Date(2025, 5, 12, 16, 0),
    status: "pending",
    progress: 0,
    stage: "design" as PanelStage,
    team: "Equipe A",
    dimensions: {
      width: 400,
      height: 320,
      thickness: 25
    },
    weight: 7600, // kg
    concreteType: "C50",
    reinforcementType: "CA-50",
    materials: [
      { name: "Armação de aço", quantity: 620, unit: "kg" },
      { name: "Concreto C50", quantity: 3.2, unit: "m³" },
      { name: "Desmoldante", quantity: 7, unit: "L" },
      { name: "Espaçadores", quantity: 160, unit: "un" },
      { name: "Insertos metálicos", quantity: 8, unit: "un" }
    ]
  }
];

const PanelProductionSchedule = ({ date = new Date(), view }: PanelProductionScheduleProps) => {
  // Filter data based on selected date and view
  const filteredData = productionData.filter(item => {
    if (view === "day") {
      return item.startDate.toDateString() === date.toDateString();
    } else if (view === "week") {
      const startDate = new Date(date);
      startDate.setDate(date.getDate() - date.getDay());
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      return item.startDate >= startDate && item.startDate <= endDate;
    } else {
      return (
        item.startDate.getMonth() === date.getMonth() &&
        item.startDate.getFullYear() === date.getFullYear()
      );
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900">
            <CheckCircle className="h-3 w-3 mr-1" />
            Concluído
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-900">
            <Clock className="h-3 w-3 mr-1" />
            Em produção
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-900">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
    }
  };

  const getStageBadge = (stage: PanelStage) => {
    let icon;
    let colors;
    
    switch (stage) {
      case "design":
        icon = <ChevronRight className="h-3 w-3 mr-1" />;
        colors = "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400 border-purple-200 dark:border-purple-900";
        break;
      case "reinforcement":
        icon = <Hammer className="h-3 w-3 mr-1" />;
        colors = "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-900";
        break;
      case "formwork":
        icon = <Factory className="h-3 w-3 mr-1" />;
        colors = "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900";
        break;
      case "concrete-pouring":
        icon = <Droplets className="h-3 w-3 mr-1" />;
        colors = "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900";
        break;
      case "curing":
        icon = <Clock className="h-3 w-3 mr-1" />;
        colors = "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900";
        break;
      case "demolding":
        icon = <Wrench className="h-3 w-3 mr-1" />;
        colors = "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400 border-orange-200 dark:border-orange-900";
        break;
      default:
        icon = <CheckCircle className="h-3 w-3 mr-1" />;
        colors = "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-900";
    }
    
    return (
      <Badge variant="outline" className={colors}>
        {icon}
        {PANEL_STAGE_LABELS[stage]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-4">
        {view === "day" && `Produção: ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}`}
        {view === "week" && "Produção Semanal"}
        {view === "month" && `Produção: ${format(date, "MMMM 'de' yyyy", { locale: pt })}`}
      </div>
      
      {filteredData.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex justify-center items-center">
            <p className="text-muted-foreground">Nenhum painel em produção para o período selecionado.</p>
          </CardContent>
        </Card>
      ) : (
        filteredData.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <CardTitle className="flex items-center gap-2">
                    {item.projectName}
                    <span className="text-base text-muted-foreground">{item.projectId}</span>
                  </CardTitle>
                  <CardDescription>
                    {item.panelType} - {item.panelId}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(item.status)}
                  {getStageBadge(item.stage)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Início</p>
                      <p className="font-medium">{format(item.startDate, "dd/MM/yyyy HH:mm")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Término</p>
                      <p className="font-medium">{format(item.endDate, "dd/MM/yyyy HH:mm")}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Progresso</p>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2" />
                      <span className="text-sm font-medium">{item.progress}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-muted-foreground">Equipe:</span> {item.team}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Dimensões:</span> {item.dimensions.width}×{item.dimensions.height}×{item.dimensions.thickness}cm</p>
                    <p className="text-sm"><span className="text-muted-foreground">Peso:</span> {item.weight.toLocaleString()}kg</p>
                    <p className="text-sm"><span className="text-muted-foreground">Concreto:</span> {item.concreteType}</p>
                    <p className="text-sm"><span className="text-muted-foreground">Armação:</span> {item.reinforcementType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Materiais</p>
                  <div className="space-y-2 bg-muted/30 p-3 rounded-md">
                    {item.materials.map((mat, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{mat.name}</span>
                        <span className="font-medium">{mat.quantity} {mat.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PanelProductionSchedule;
