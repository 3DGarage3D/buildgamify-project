
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface PanelProductionScheduleProps {
  date?: Date;
  view: "day" | "week" | "month";
}

// Mock data
const productionData = [
  {
    id: "p1",
    projectName: "Residencial Villa Moderna",
    panelType: "Parede Externa",
    panelId: "E-103",
    startDate: new Date(2025, 5, 10, 8, 0),
    endDate: new Date(2025, 5, 10, 16, 0),
    status: "in-progress",
    progress: 75,
    team: "Equipe A",
    materials: [
      { name: "Perfil Metálico", quantity: 120, unit: "m" },
      { name: "Parafusos", quantity: 500, unit: "un" },
      { name: "Placa Cimentícia", quantity: 24, unit: "m²" }
    ]
  },
  {
    id: "p2",
    projectName: "Centro Empresarial Horizonte",
    panelType: "Parede Interna",
    panelId: "I-207",
    startDate: new Date(2025, 5, 10, 9, 0),
    endDate: new Date(2025, 5, 11, 12, 0),
    status: "pending",
    progress: 0,
    team: "Equipe B",
    materials: [
      { name: "Perfil Metálico", quantity: 80, unit: "m" },
      { name: "Parafusos", quantity: 350, unit: "un" },
      { name: "Placa de Gesso", quantity: 18, unit: "m²" }
    ]
  },
  {
    id: "p3",
    projectName: "Residencial Villa Moderna",
    panelType: "Parede Interna",
    panelId: "I-105",
    startDate: new Date(2025, 5, 9, 13, 0),
    endDate: new Date(2025, 5, 9, 17, 0),
    status: "completed",
    progress: 100,
    team: "Equipe C",
    materials: [
      { name: "Perfil Metálico", quantity: 60, unit: "m" },
      { name: "Parafusos", quantity: 250, unit: "un" },
      { name: "Placa de Gesso", quantity: 12, unit: "m²" }
    ]
  },
  {
    id: "p4",
    projectName: "Centro Empresarial Horizonte",
    panelType: "Fachada",
    panelId: "F-001",
    startDate: new Date(2025, 5, 11, 8, 0),
    endDate: new Date(2025, 5, 12, 16, 0),
    status: "pending",
    progress: 0,
    team: "Equipe A",
    materials: [
      { name: "Perfil Metálico", quantity: 200, unit: "m" },
      { name: "Parafusos", quantity: 800, unit: "un" },
      { name: "Placa Cimentícia", quantity: 46, unit: "m²" },
      { name: "Isolamento", quantity: 46, unit: "m²" }
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
            <p className="text-muted-foreground">Nenhum item em produção para o período selecionado.</p>
          </CardContent>
        </Card>
      ) : (
        filteredData.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <CardTitle>{item.projectName} - {item.panelId}</CardTitle>
                  <p className="text-muted-foreground text-sm">{item.panelType}</p>
                </div>
                <div>
                  {getStatusBadge(item.status)}
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
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground mb-1">Progresso</p>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2" />
                      <span className="text-sm font-medium">{item.progress}%</span>
                    </div>
                  </div>
                  <p className="text-sm"><span className="text-muted-foreground">Equipe:</span> {item.team}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Materiais</p>
                  <div className="space-y-1">
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
