
import {
  Pencil,
  Calendar,
  Scissors,
  Hammer,
  Droplets,
  Wrench,
  Package,
  Truck
} from 'lucide-react';
import { ProductionStageData } from '@/types/productionFlow';

export const productionStages: ProductionStageData[] = [
  {
    id: 1,
    title: "Projeto e Modelagem",
    description: "Desenvolvimento de modelagem BIM 3D detalhada do painel, definição completa de armaduras, insertos e pontos de içamento, com geração automática de documentação técnica.",
    icon: Pencil,
    status: 'completed',
    duration: '2-3 dias',
    team: 'Engenharia',
    processes: [
      'Modelagem BIM 3D do painel',
      'Definição de armaduras e insertos',
      'Cálculo de pontos de içamento',
      'Geração de listas de corte',
      'Aprovação técnica digital'
    ],
    keywords: ['BIM', '3D', 'armadura', 'projeto', 'engenharia', 'modelagem'],
    links: [
      { label: 'Acessar Projetos', href: '/projects' },
      { label: 'Biblioteca BIM', href: '/projects' }
    ],
    has3DView: true
  },
  {
    id: 2,
    title: "Planejamento e Agendamento",
    description: "Sequenciamento inteligente da produção com definição de janelas logísticas, alocação otimizada de recursos e controle de capacidade da linha de produção.",
    icon: Calendar,
    status: 'in-progress',
    duration: '1 dia',
    team: 'Planejamento',
    processes: [
      'Sequenciamento de produção',
      'Definição de janelas logísticas',
      'Alocação de formas e recursos',
      'Controle de capacidade',
      'Sincronização com cronograma'
    ],
    keywords: ['planejamento', 'cronograma', 'sequenciamento', 'logística', 'recursos'],
    links: [
      { label: 'Ver Cronograma', href: '/calendar' },
      { label: 'Gestão de Recursos', href: '/inventory' }
    ],
    has3DView: false
  },
  {
    id: 3,
    title: "Corte e Dobra das Armaduras",
    description: "Processamento automatizado das armaduras com geração de códigos QR para rastreabilidade completa, corte e dobra de precisão conforme especificações do projeto.",
    icon: Scissors,
    status: 'pending',
    duration: '4-6 horas',
    team: 'Produção',
    processes: [
      'Geração de código QR',
      'Corte automatizado das barras',
      'Dobra conforme projeto',
      'Conferência dimensional',
      'Separação por painel'
    ],
    keywords: ['armadura', 'corte', 'dobra', 'QR', 'rastreabilidade', 'aço'],
    links: [
      { label: 'Controle de Estoque', href: '/inventory' },
      { label: 'Rastreabilidade', href: '/inventory' }
    ],
    has3DView: true
  },
  {
    id: 4,
    title: "Montagem nas Formas",
    description: "Posicionamento preciso das armaduras nas formas metálicas, instalação de todos os insertos, furações e reservas conforme projeto, com validação digital.",
    icon: Hammer,
    status: 'pending',
    duration: '6-8 horas',
    team: 'Montagem',
    processes: [
      'Posicionamento das armaduras',
      'Instalação de insertos',
      'Criação de furações e reservas',
      'Conferência por checklist',
      'Validação dimensional'
    ],
    keywords: ['montagem', 'formas', 'insertos', 'checklist', 'validação'],
    links: [
      { label: 'Checklist Digital', href: '/tasks' },
      { label: 'Controle de Qualidade', href: '/reports' }
    ],
    has3DView: true
  },
  {
    id: 5,
    title: "Concretagem",
    description: "Mistura controlada e lançamento do concreto com vibração adequada, processo de cura inicial monitorado e registro completo de lote e tempo de cura.",
    icon: Droplets,
    status: 'pending',
    duration: '2-3 horas',
    team: 'Concretagem',
    processes: [
      'Mistura do concreto',
      'Lançamento controlado',
      'Vibração adequada',
      'Início da cura',
      'Registro de lote e tempo'
    ],
    keywords: ['concreto', 'mistura', 'cura', 'vibração', 'lote', 'qualidade'],
    links: [
      { label: 'Controle de Concreto', href: '/reports' },
      { label: 'Registro de Qualidade', href: '/reports' }
    ],
    has3DView: false
  },
  {
    id: 6,
    title: "Desforma e Acabamento",
    description: "Processo de desforma automatizada ou manual, aplicação de acabamento superficial especificado e inspeção visual e dimensional completa do painel.",
    icon: Wrench,
    status: 'pending',
    duration: '3-4 horas',
    team: 'Acabamento',
    processes: [
      'Desforma automatizada',
      'Acabamento superficial',
      'Inspeção visual',
      'Verificação dimensional',
      'Correções necessárias'
    ],
    keywords: ['desforma', 'acabamento', 'inspeção', 'superficial', 'dimensional'],
    links: [
      { label: 'Inspeção de Qualidade', href: '/reports' },
      { label: 'Padrões de Acabamento', href: '/reports' }
    ],
    has3DView: true
  },
  {
    id: 7,
    title: "Armazenagem e Logística",
    description: "Etiquetagem com QR Code ou RFID para rastreabilidade, alocação estratégica por ordem de entrega e geração automática de manifesto de carga.",
    icon: Package,
    status: 'pending',
    duration: '1-2 horas',
    team: 'Logística',
    processes: [
      'Etiquetagem com QR/RFID',
      'Alocação por entrega',
      'Organização no estoque',
      'Manifesto de carga',
      'Preparação para transporte'
    ],
    keywords: ['armazenagem', 'RFID', 'logística', 'manifesto', 'estoque'],
    links: [
      { label: 'Gestão de Estoque', href: '/inventory' },
      { label: 'Planejamento Logístico', href: '/calendar' }
    ],
    has3DView: false
  },
  {
    id: 8,
    title: "Entrega e Rastreabilidade",
    description: "Transporte monitorado com atualização em tempo real, validação de conformidade in loco e documentação fotográfica completa da entrega na obra.",
    icon: Truck,
    status: 'pending',
    duration: '4-8 horas',
    team: 'Entrega',
    processes: [
      'Transporte monitorado',
      'Rastreamento GPS',
      'Validação in loco',
      'Documentação fotográfica',
      'Confirmação de entrega'
    ],
    keywords: ['entrega', 'transporte', 'GPS', 'rastreamento', 'obra', 'validação'],
    links: [
      { label: 'Rastreamento de Entregas', href: '/calendar' },
      { label: 'Relatórios de Entrega', href: '/reports' }
    ],
    has3DView: false
  }
];
