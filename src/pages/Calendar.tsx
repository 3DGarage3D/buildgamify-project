
import { useState } from "react";
import { 
  Calendar as CalendarComponent,
  CalendarProps 
} from "@/components/ui/calendar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  ChevronRight,
  CalendarDays,
  Clock,
  Layers,
  CheckSquare2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PanelProductionSchedule from "@/components/calendar/PanelProductionSchedule";
import PanelQueue from "@/components/calendar/PanelQueue";
import MaterialsUsage from "@/components/calendar/MaterialsUsage";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Calendário de Produção
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o cronograma de produção dos painéis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={view === "day" ? "default" : "outline"} 
            size="sm"
            onClick={() => setView("day")}
          >
            Dia
          </Button>
          <Button 
            variant={view === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setView("week")}
          >
            Semana
          </Button>
          <Button 
            variant={view === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setView("month")}
          >
            Mês
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendário lateral */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Selecionar Data</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="production" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="production" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Produção</span>
              </TabsTrigger>
              <TabsTrigger value="queue" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Fila</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-1">
                <CheckSquare2 className="h-4 w-4" />
                <span>Materiais</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="production" className="mt-4">
              <PanelProductionSchedule date={date} view={view} />
            </TabsContent>
            
            <TabsContent value="queue" className="mt-4">
              <PanelQueue date={date} />
            </TabsContent>
            
            <TabsContent value="materials" className="mt-4">
              <MaterialsUsage date={date} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
