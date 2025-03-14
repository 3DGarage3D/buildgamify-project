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
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface PanelQueueProps {
  date?: Date;
}

// Mock data for queue
const queueData = [
  {
    id: "q1",
    projectName: "Residencial Villa Moderna",
    panelType: "Parede Externa",
    panelId: "E-104",
    priority: "high",
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "8h",
    materials: [
      { name: "Perfil Metálico", quantity: 120, available: true },
      { name: "Parafusos", quantity: 500, available: true },
      { name: "Placa Cimentícia", quantity: 24, available: false }
    ]
  },
  {
    id: "q2",
    projectName: "Centro Empresarial Horizonte",
    panelType: "Parede Interna",
    panelId: "I-208",
    priority: "medium",
    scheduledDate: new Date(2025, 5, 13),
    requiredTime: "6h",
    materials: [
      { name: "Perfil Metálico", quantity: 80, available: true },
      { name: "Parafusos", quantity: 350, available: true },
      { name: "Placa de Gesso", quantity: 18, available: true }
    ]
  },
  {
    id: "q3",
    projectName: "Residencial Villa Moderna",
    panelType: "Parede Interna",
    panelId: "I-106",
    priority: "low",
    scheduledDate: new Date(2025, 5, 14),
    requiredTime: "4h",
    materials: [
      { name: "Perfil Metálico", quantity: 60, available: true },
      { name: "Parafusos", quantity: 250, available: true },
      { name: "Placa de Gesso", quantity: 12, available: true }
    ]
  },
  {
    id: "q4",
    projectName: "Centro Empresarial Horizonte",
    panelType: "Fachada",
    panelId: "F-002",
    priority: "high",
    scheduledDate: new Date(2025, 5, 12),
    requiredTime: "16h",
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

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-4">
        Fila de Produção
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {sortedQueue.map((item) => (
          <Card key={item.id} className={`overflow-hidden transition-all duration-200 ${!areMaterialsAvailable(item.materials) ? 'border-amber-300 bg-amber-50/30 dark:bg-amber-950/5' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <CardTitle>{item.projectName} - {item.panelId}</CardTitle>
                  <CardDescription>{item.panelType}</CardDescription>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
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
        ))}
      </div>
    </div>
  );
};

export default PanelQueue;
