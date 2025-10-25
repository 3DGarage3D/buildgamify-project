
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Trophy,
  BarChart3,
  Boxes,
  CalendarDays,
  Building,
  BookOpen
} from "lucide-react";

// Define the task status and priority types
export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

// Define the task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  points: number;
  project?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  teamSize: number;
  tasks: {
    total: number;
    completed: number;
  };
  category: string;
  client: string;
  location: string;
  status: 'active' | 'completed' | 'on-hold';
  panels: Panel[];
}

export interface Panel {
  id: string;
  projectId: string;
  type: 'Parede Externa' | 'Parede Interna' | 'Fachada';
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  weight: number;
  stage: 'formwork' | 'concrete-pouring' | 'curing' | 'demolding';
  materials: {
    materialId: string;
    quantity: number;
  }[];
  createdAt: Date;
  estimatedCompletionDate: Date;
  curingTime?: {
    start: Date;
    end: Date;
  };
  priority: 'low' | 'medium' | 'high';
}

export interface StatItem {
  title: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
  route: string;
}

export interface NavLink {
  name: string;
  icon: any;
  href: string;
  description: string;
}

// Mock data
export const stats: StatItem[] = [
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
export const featuredProjects: Project[] = [
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
    status: 'active',
    panels: [
      {
        id: "p1",
        projectId: "1",
        type: "Parede Externa",
        dimensions: {
          width: 320,
          height: 280,
          thickness: 20
        },
        weight: 950,
        stage: "curing",
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
        priority: "high"
      },
      {
        id: "p2",
        projectId: "1",
        type: "Parede Interna",
        dimensions: {
          width: 240,
          height: 280,
          thickness: 10
        },
        weight: 480,
        stage: "formwork",
        materials: [
          { materialId: "m1", quantity: 60 },
          { materialId: "m2", quantity: 250 }
        ],
        createdAt: new Date(2025, 5, 12),
        estimatedCompletionDate: new Date(2025, 5, 16),
        priority: "low"
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
    status: 'active',
    panels: [
      {
        id: "p3",
        projectId: "2",
        type: "Parede Interna",
        dimensions: {
          width: 260,
          height: 240,
          thickness: 15
        },
        weight: 520,
        stage: "concrete-pouring",
        materials: [
          { materialId: "m1", quantity: 80 },
          { materialId: "m2", quantity: 350 }
        ],
        createdAt: new Date(2025, 5, 11),
        estimatedCompletionDate: new Date(2025, 5, 15),
        priority: "medium"
      },
      {
        id: "p4",
        projectId: "2",
        type: "Fachada",
        dimensions: {
          width: 400,
          height: 320,
          thickness: 25
        },
        weight: 1200,
        stage: "demolding",
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
        priority: "high"
      }
    ]
  }
];

export const recentTasks: Task[] = [
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
export const constructionImages = [
  "/lovable-uploads/207af5ae-c8be-4420-b695-f42f51561a8a.png",
  "/lovable-uploads/58b8e536-401c-4bd9-9fad-452ff0b1adea.png",
];

export const dashboardLinks: NavLink[] = [
  { name: "Projetos", icon: Briefcase, href: "/projects", description: "Gerenciar projetos ativos e arquivados" },
  { name: "Tarefas", icon: CheckSquare, href: "/tasks", description: "Verificar tarefas e acompanhar progresso" },
  { name: "Equipe", icon: Users, href: "/team", description: "Visualizar membros da equipe e funções" },
  { name: "Classificação", icon: Trophy, href: "/leaderboard", description: "Conferir ranking e recompensas" },
  { name: "Calendário", icon: CalendarDays, href: "/calendar", description: "Acompanhar cronograma de produção" },
  { name: "Estoque", icon: Boxes, href: "/inventory", description: "Gerenciar painéis e materiais" },
  { name: "Relatórios", icon: BarChart3, href: "/reports", description: "Análise de produção e métricas" },
  { name: "Manual", icon: BookOpen, href: "/manual", description: "Guia completo de funcionalidades" }
];
