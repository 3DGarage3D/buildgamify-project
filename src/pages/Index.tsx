
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Trophy,
  ChevronRight,
  BarChart3,
  Boxes,
  CalendarDays
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProjectCard from "@/components/project/ProjectCard";
import TaskItem from "@/components/task/TaskItem";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { useStaggeredAnimation } from "@/utils/animation";

// Define the task status and priority types
type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

// Define the task interface
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  points: number;
  project?: string;
}

// Mock data
const stats = [
  { 
    title: "Projetos ativos", 
    value: 12,
    icon: Briefcase,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-950/30",
    route: "/projects"
  },
  { 
    title: "Tarefas concluídas", 
    value: 284,
    icon: CheckSquare,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/30",
    route: "/tasks"
  },
  { 
    title: "Membros da equipe", 
    value: 48,
    icon: Users,
    color: "text-violet-500",
    bgColor: "bg-violet-100 dark:bg-violet-950/30",
    route: "/team"
  },
  { 
    title: "Pontos acumulados", 
    value: 12750,
    icon: Trophy,
    color: "text-amber-500",
    bgColor: "bg-amber-100 dark:bg-amber-950/30",
    route: "/leaderboard"
  }
];

const featuredProjects = [
  {
    id: "1",
    title: "Residencial Villa Moderna",
    description: "Projeto de painelização para condomínio residencial com 24 unidades, incluindo otimização de corte e montagem.",
    progress: 65,
    dueDate: "2025-07-15",
    teamSize: 12,
    tasks: {
      total: 48,
      completed: 31
    }
  },
  {
    id: "2",
    title: "Centro Empresarial Horizonte",
    description: "Painelização para complexo comercial de 3 torres, com foco em eficiência energética e sustentabilidade.",
    progress: 42,
    dueDate: "2025-08-30",
    teamSize: 18,
    tasks: {
      total: 56,
      completed: 23
    }
  }
];

const recentTasks: Task[] = [
  {
    id: "t1",
    title: "Revisão de projeto estrutural",
    description: "Analisar e validar os cálculos estruturais para os painéis do Bloco A do Residencial Villa Moderna.",
    status: "completed",
    priority: "high",
    dueDate: "2025-06-10",
    points: 75
  },
  {
    id: "t2",
    title: "Cronograma de montagem",
    description: "Criar cronograma detalhado para montagem dos painéis na obra, incluindo logística de transporte.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-06-15",
    points: 50
  },
  {
    id: "t3",
    title: "Pedido de materiais",
    description: "Enviar solicitação de compra para materiais do Centro Empresarial Horizonte - Fase 1.",
    status: "pending",
    priority: "high",
    dueDate: "2025-06-08",
    points: 30
  }
];

const Index = () => {
  const [animate, setAnimate] = useState(false);
  const [projects, setProjects] = useState(featuredProjects);
  const visibleStats = useStaggeredAnimation(stats.length, 100, 100);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleProjectCreated = (newProject: any) => {
    setProjects(prev => [newProject, ...prev]);
  };
  
  const dashboardLinks = [
    { name: "Projetos", icon: Briefcase, href: "/projects", description: "Gerenciar projetos ativos e arquivados" },
    { name: "Tarefas", icon: CheckSquare, href: "/tasks", description: "Verificar tarefas e acompanhar progresso" },
    { name: "Equipe", icon: Users, href: "/team", description: "Visualizar membros da equipe e funções" },
    { name: "Classificação", icon: Trophy, href: "/leaderboard", description: "Conferir ranking e recompensas" },
    { name: "Calendário", icon: CalendarDays, href: "/calendar", description: "Acompanhar cronograma de produção" },
    { name: "Estoque", icon: Boxes, href: "/inventory", description: "Gerenciar painéis e materiais" },
    { name: "Relatórios", icon: BarChart3, href: "/reports", description: "Análise de produção e métricas" }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <NewProjectDialog onProjectCreated={handleProjectCreated} />
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link 
            key={stat.title}
            to={stat.route}
            className="group"
          >
            <Card 
              className={`overflow-hidden group-hover:border-primary/50 transition-all ${visibleStats.includes(index) ? 'animate-scale' : 'opacity-0'}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div 
                    className={`p-2 rounded-md ${stat.bgColor}`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  <AnimatedCounter 
                    value={stat.value} 
                    formatter={(val) => val.toLocaleString()} 
                    duration={1500} 
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardLinks.map((link, index) => (
          <Link 
            key={link.name} 
            to={link.href}
            className="group"
          >
            <Card className="h-full hover-card overflow-hidden border border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <link.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {link.name}
                    </CardTitle>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {link.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight font-display">Projetos em Destaque</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/projects" className="flex items-center gap-1">
              <span>Ver todos</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      
      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight font-display">Tarefas Recentes</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/tasks" className="flex items-center gap-1">
              <span>Ver todas</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
