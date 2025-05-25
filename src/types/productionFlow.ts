
import { LucideIcon } from 'lucide-react';

export interface ProductionStageLink {
  label: string;
  href: string;
}

export interface ProductionStageData {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'completed' | 'in-progress' | 'pending';
  duration: string;
  team: string;
  processes: string[];
  keywords: string[];
  links: ProductionStageLink[];
  has3DView: boolean;
}
