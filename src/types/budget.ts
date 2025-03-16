
export interface MaterialItem {
  id: string;
  codigo: string;
  descricao: string;
  unidade: string;
  preco: number;
  origem?: string;
  categoria?: string;
  stock?: number;
  threshold?: number;
}

export interface Budget {
  id: string;
  name: string;
  description?: string;
  client?: string;
  createdAt: Date;
  updatedAt: Date;
  items: BudgetItem[];
  totalCost: number;
}

export interface BudgetItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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
  client?: string;
  location?: string;
  status: 'active' | 'completed' | 'on-hold';
  panels?: Panel[];
}

export interface Panel {
  id: string;
  projectId: string;
  type: 'Parede Interna' | 'Parede Externa' | 'Fachada' | 'Divisória';
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  weight: number;
  stage: PanelStage;
  materials: PanelMaterial[];
  createdAt: Date;
  estimatedCompletionDate: Date;
  curingTime?: {
    start: Date;
    end: Date;
  };
  priority: 'high' | 'medium' | 'low';
}

export interface PanelMaterial {
  materialId: string;
  quantity: number;
}

export type PanelStage = 
  'design' | 
  'reinforcement' | 
  'formwork' | 
  'concrete-pouring' | 
  'curing' | 
  'demolding' | 
  'finishing' | 
  'quality-control' | 
  'storage' | 
  'delivery' | 
  'installation';

export const PANEL_STAGE_LABELS: Record<PanelStage, string> = {
  'design': 'Projeto',
  'reinforcement': 'Armação',
  'formwork': 'Formas',
  'concrete-pouring': 'Concretagem',
  'curing': 'Cura',
  'demolding': 'Desmolde',
  'finishing': 'Acabamento',
  'quality-control': 'Controle de Qualidade',
  'storage': 'Armazenamento',
  'delivery': 'Transporte',
  'installation': 'Instalação'
};

export const PANEL_STAGE_DURATIONS: Record<PanelStage, number> = {
  'design': 24, // hours
  'reinforcement': 8,
  'formwork': 4,
  'concrete-pouring': 2,
  'curing': 72, // standard curing time
  'demolding': 1,
  'finishing': 4,
  'quality-control': 2,
  'storage': 0, // variable
  'delivery': 4,
  'installation': 8
};

export interface MaterialUsageSummary {
  name: string;
  quantity: number;
  unit: string;
  percentage: number;
  category: string;
}

export interface ProjectDistribution {
  name: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  [key: string]: { color: string };
}
