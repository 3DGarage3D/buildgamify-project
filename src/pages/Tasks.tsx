
import { useState } from "react";
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle,
  Clock,
  Circle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskItem from "@/components/task/TaskItem";
import { useStaggeredAnimation } from "@/utils/animation";

// Mock data
const tasks = [
  {
    id: "t1",
    title: "Revisão de projeto estrutural",
    description: "Analisar e validar os cálculos estruturais para os painéis do Bloco A do Residencial Villa Moderna.",
    status: "completed",
    priority: "high",
    dueDate: "2023-06-10",
    points: 75,
    project: "Residencial Villa Moderna"
  },
  {
    id: "t2",
    title: "Cronograma de montagem",
    description: "Criar cronograma detalhado para montagem dos painéis na obra, incluindo logística de transporte.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2023-06-15",
    points: 50,
    project: "Residencial Villa Moderna"
  },
  {
    id: "t3",
    title: "Pedido de materiais",
    description: "Enviar solicitação de compra para materiais do Centro Empresarial Horizonte - Fase 1.",
    status: "pending",
    priority: "high",
    dueDate: "2023-06-08",
    points: 30,
    project: "Centro Empresarial Horizonte"
  },
  {
    id: "t4",
    title: "Ajuste de modelagem BIM",
    description: "Corrigir interferências na modelagem BIM do Hospital Regional Norte, alinhando com projeto hidráulico.",
    status: "in-progress",
    priority: "high",
    dueDate: "2023-06-12",
    points: 65,
    project: "Hospital Regional Norte"
  },
  {
    id: "t5",
    title: "Validação de protótipo",
    description: "Analisar resultados do teste de carga realizado no protótipo de painel para Edifício Corporativo Vega.",
    status: "completed",
    priority: "medium",
    dueDate: "2023-06-05",
    points: 45,
    project: "Edifício Corporativo Vega"
  },
  {
    id: "t6",
    title: "Relatório de sustentabilidade",
    description: "Elaborar relatório de análise de ciclo de vida e sustentabilidade para o projeto Condomínio Parque das Águas.",
    status: "pending",
    priority: "low",
    dueDate: "2023-06-20",
    points: 40,
    project: "Condomínio Parque das Águas"
  },
  {
    id: "t7",
    title: "Especificação de juntas",
    description: "Definir e documentar especificações técnicas para juntas de dilatação na Fábrica Automotiva Stella.",
    status: "pending",
    priority: "medium",
    dueDate: "2023-06-17",
    points: 35,
    project: "Fábrica Automotiva Stella"
  },
  {
    id: "t8",
    title: "Treinamento de equipe",
    description: "Preparar e conduzir treinamento para equipe de montagem sobre novo sistema de fixação de painéis.",
    status: "completed",
    priority: "high",
    dueDate: "2023-06-03",
    points: 80,
    project: "Geral"
  }
];

const projects = [
  "Todos",
  "Residencial Villa Moderna",
  "Centro Empresarial Horizonte",
  "Hospital Regional Norte",
  "Edifício Corporativo Vega",
  "Condomínio Parque das Águas",
  "Fábrica Automotiva Stella",
  "Geral"
];

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const visibleTasks = useStaggeredAnimation(tasks.length, 50, 50);
  
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProject = 
        selectedProjects.length === 0 || 
        selectedProjects.includes(task.project) ||
        (selectedProjects.includes("Todos"));
      
      const matchesStatus = 
        activeTab === "all" || 
        (activeTab === "pending" && task.status === "pending") ||
        (activeTab === "in-progress" && task.status === "in-progress") ||
        (activeTab === "completed" && task.status === "completed");
      
      return matchesSearch && matchesProject && matchesStatus;
    });
  };
  
  const filteredTasks = getFilteredTasks();
  
  const taskCountByStatus = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <CheckSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              Tarefas
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas tarefas e acompanhe o progresso
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Nova Tarefa</span>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Projetos</span>
                {selectedProjects.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5">
                    {selectedProjects.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {projects.map((project) => (
                <DropdownMenuCheckboxItem
                  key={project}
                  checked={selectedProjects.includes(project)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      if (project === "Todos") {
                        setSelectedProjects(["Todos"]);
                      } else {
                        setSelectedProjects([
                          ...selectedProjects.filter(p => p !== "Todos"), 
                          project
                        ]);
                      }
                    } else {
                      setSelectedProjects(selectedProjects.filter(p => p !== project));
                    }
                  }}
                >
                  {project}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <span>Todas</span>
            <Badge variant="secondary">{taskCountByStatus.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Circle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Pendentes</span>
            <Badge variant="secondary">{taskCountByStatus.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Em andamento</span>
            <Badge variant="secondary">{taskCountByStatus["in-progress"]}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Concluídas</span>
            <Badge variant="secondary">{taskCountByStatus.completed}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map((task, index) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  className={visibleTasks.includes(index) ? 'animate-slide-up' : 'opacity-0'}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <CheckSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Não encontramos tarefas que correspondam aos seus filtros de busca.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProjects([]);
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                <span>Limpar filtros</span>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                className={visibleTasks.includes(index) ? 'animate-slide-up' : 'opacity-0'}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                className={visibleTasks.includes(index) ? 'animate-slide-up' : 'opacity-0'}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                className={visibleTasks.includes(index) ? 'animate-slide-up' : 'opacity-0'}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
