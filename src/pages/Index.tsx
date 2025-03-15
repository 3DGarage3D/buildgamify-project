
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
  CalendarDays,
  Building,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

// Enhanced projects data with additional fields needed for detailed view
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
    },
    category: "Residencial",
    client: "Construtora Horizonte",
    location: "São Paulo, SP",
    status: 'active' as const,
    panels: [
      {
        id: "p1",
        projectId: "1",
        type: "Parede Externa" as const,
        dimensions: {
          width: 320,
          height: 280,
          thickness: 20
        },
        weight: 950,
        stage: "curing" as const,
        materials: [
          { materialId: "m1", quantity: 120 },
          { materialId: "m2", quantity: 500 }
        ],
        createdAt: new Date(2025, 5, 10),
        estimatedCompletionDate: new Date(2025, 5, 14),
        curingTime: {
          start: new Date(2025, 5, 11),
          end: new Date(2025, 5, 14)
        },
        priority: "high" as const
      },
      {
        id: "p2",
        projectId: "1",
        type: "Parede Interna" as const,
        dimensions: {
          width: 240,
          height: 280,
          thickness: 10
        },
        weight: 480,
        stage: "formwork" as const,
        materials: [
          { materialId: "m1", quantity: 60 },
          { materialId: "m2", quantity: 250 }
        ],
        createdAt: new Date(2025, 5, 12),
        estimatedCompletionDate: new Date(2025, 5, 16),
        priority: "low" as const
      }
    ]
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
    },
    category: "Comercial",
    client: "Grupo Investimentos S.A.",
    location: "Rio de Janeiro, RJ",
    status: 'active' as const,
    panels: [
      {
        id: "p3",
        projectId: "2",
        type: "Parede Interna" as const,
        dimensions: {
          width: 260,
          height: 240,
          thickness: 15
        },
        weight: 520,
        stage: "concrete-pouring" as const,
        materials: [
          { materialId: "m1", quantity: 80 },
          { materialId: "m2", quantity: 350 }
        ],
        createdAt: new Date(2025, 5, 11),
        estimatedCompletionDate: new Date(2025, 5, 15),
        priority: "medium" as const
      },
      {
        id: "p4",
        projectId: "2",
        type: "Fachada" as const,
        dimensions: {
          width: 400,
          height: 320,
          thickness: 25
        },
        weight: 1200,
        stage: "demolding" as const,
        materials: [
          { materialId: "m1", quantity: 200 },
          { materialId: "m2", quantity: 800 }
        ],
        createdAt: new Date(2025, 5, 8),
        estimatedCompletionDate: new Date(2025, 5, 13),
        curingTime: {
          start: new Date(2025, 5, 9),
          end: new Date(2025, 5, 12)
        },
        priority: "high" as const
      }
    ]
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

// Add sample construction images
const constructionImages = [
  "/lovable-uploads/207af5ae-c8be-4420-b695-f42f51561a8a.png",
  "/lovable-uploads/58b8e536-401c-4bd9-9fad-452ff0b1adea.png",
];

const Index = () => {
  const [animate, setAnimate] = useState(false);
  const [projects, setProjects] = useState(featuredProjects);
  const visibleStats = useStaggeredAnimation(stats.length, 100, 100);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    setAnimate(true);
    
    // Auto rotate through images
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % constructionImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
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
      
      {/* Featured Project with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative min-h-[280px]">
          <div 
            className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 transform scale-105" 
            style={{ 
              backgroundImage: `url(${constructionImages[selectedImage]})`,
              opacity: 0.85
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
          
          <div className="relative p-8 flex flex-col h-full justify-between text-white">
            <div>
              <Badge className="bg-white/20 text-white border-white/20 mb-3">
                Destaque
              </Badge>
              <h2 className="text-2xl font-bold font-display mb-2">
                {projects[0].title}
              </h2>
              <p className="max-w-lg opacity-90">
                {projects[0].description}
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progresso do Projeto</span>
                <span className="text-sm font-medium">{projects[0].progress}%</span>
              </div>
              <Progress value={projects[0].progress} className="h-2 bg-white/20" />
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 opacity-80" />
                    <span>Prazo: {new Date(projects[0].dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 opacity-80" />
                    <span>{projects[0].teamSize} membros</span>
                  </div>
                </div>
                
                <Button asChild size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/projects" className="flex items-center gap-1">
                    Ver Projeto
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
                  <div className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                    Estoque Baixo
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-500">
                    3 materiais com níveis críticos de estoque
                  </p>
                  <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-amber-700 dark:text-amber-400">
                    <Link to="/inventory">Verificar materiais</Link>
                  </Button>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                  <div className="font-medium text-blue-800 dark:text-blue-400 mb-1">
                    Tarefa Próxima
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-500">
                    "Pedido de materiais" vence hoje
                  </p>
                  <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1 text-blue-700 dark:text-blue-400">
                    <Link to="/tasks">Ver tarefa</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Métricas Semanais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Painéis Produzidos
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter value={18} duration={1000} /> 
                    <span className="text-xs">+12%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Eficiência da Produção
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter value={92} formatter={(val) => `${val}%`} duration={1000} /> 
                    <span className="text-xs">+4%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Uso de Materiais
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <AnimatedCounter value={85} formatter={(val) => `${val}%`} duration={1000} /> 
                    <span className="text-xs">-2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
