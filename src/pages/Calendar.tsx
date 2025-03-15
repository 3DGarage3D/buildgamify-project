
import { useState } from "react";
import { 
  Calendar as CalendarComponent
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
  CalendarDays,
  Clock,
  Layers,
  CheckSquare2,
  CalendarClock,
  Factory,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
            Produção de Painéis
          </h1>
          <p className="text-muted-foreground">
            Cronograma e acompanhamento da produção de painéis de concreto pré-moldado
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
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-sm">Produção hoje</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">painéis em fabricação</div>
              </div>
              
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="font-medium text-sm">Em cura</span>
                  </div>
                  <span className="font-bold">8</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">painéis aguardando cura</div>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-sm">Entrega</span>
                  </div>
                  <span className="font-bold">5</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">painéis programados para entrega</div>
              </div>
            </div>
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
                <span>Fila e Cura</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-1">
                <CheckSquare2 className="h-4 w-4" />
                <span>Consumo</span>
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
