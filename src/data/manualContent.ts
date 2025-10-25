import { 
  Home, FileText, CheckSquare, Users, Trophy, Calendar, 
  Package, BarChart3, DollarSign, Activity, BookOpen,
  Settings, HelpCircle, Zap
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ManualSubsection {
  id: string;
  title: string;
  content: string;
  steps?: string[];
  tips?: string[];
  warnings?: string[];
  relatedLinks?: { label: string; path: string }[];
}

export interface ManualSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  subsections: ManualSubsection[];
  permissionLevel?: 'all' | 'admin' | 'admin-financeiro';
}

export const manualSections: ManualSection[] = [
  {
    id: "intro",
    title: "Introdução ao Sistema",
    icon: BookOpen,
    description: "Conheça a plataforma de gestão de painéis pré-fabricados",
    permissionLevel: "all",
    subsections: [
      {
        id: "what-is",
        title: "O que é o sistema",
        content: "Esta é uma plataforma completa de gestão para empresas de painéis pré-fabricados. O sistema integra produção, estoque, orçamentos, equipe e monitoramento IoT em tempo real.",
        tips: [
          "O sistema é acessível via navegador web",
          "Funciona em desktop, tablet e smartphones",
          "Dados sincronizados em tempo real"
        ]
      },
      {
        id: "who-can-use",
        title: "Níveis de Acesso",
        content: "O sistema possui três níveis de permissão com funcionalidades específicas:",
        steps: [
          "🔴 Admin: Acesso total ao sistema, incluindo equipe e configurações",
          "🟡 Financeiro: Acesso a relatórios financeiros e orçamentos",
          "🟢 Operacional: Acesso a produção, tarefas e projetos"
        ],
        tips: [
          "Suas permissões são definidas pelo administrador",
          "Alguns recursos aparecem apenas se você tiver permissão"
        ]
      },
      {
        id: "first-steps",
        title: "Primeiros Passos",
        content: "Para começar a usar o sistema, siga estas etapas:",
        steps: [
          "Faça login com suas credenciais",
          "Complete seu perfil com foto e informações",
          "Explore o Dashboard para entender as funcionalidades",
          "Acesse o manual quando tiver dúvidas"
        ],
        relatedLinks: [
          { label: "Ir para Dashboard", path: "/" }
        ]
      }
    ]
  },
  {
    id: "dashboard",
    title: "Dashboard (Página Inicial)",
    icon: Home,
    description: "Visão geral do sistema com métricas e acesso rápido",
    permissionLevel: "all",
    subsections: [
      {
        id: "overview",
        title: "Visão Geral",
        content: "O Dashboard apresenta as principais métricas do sistema em tempo real, incluindo total de projetos ativos, painéis em produção, eficiência média e tamanho da equipe.",
        tips: [
          "Os números são atualizados automaticamente",
          "Clique nos cards de estatísticas para ir direto à seção correspondente"
        ]
      },
      {
        id: "featured-project",
        title: "Projeto em Destaque",
        content: "Visualize o projeto principal com informações detalhadas sobre progresso, tarefas pendentes e equipe alocada. Os dados são apresentados em cards visuais e gráficos interativos.",
        relatedLinks: [
          { label: "Ver Todos os Projetos", path: "/projects" }
        ]
      },
      {
        id: "quick-navigation",
        title: "Navegação Rápida",
        content: "Cards de acesso rápido permitem navegar diretamente para as principais funcionalidades do sistema: Projetos, Tarefas, Equipe, Relatórios e mais.",
        tips: [
          "Use os cards de navegação para acessar rapidamente qualquer seção",
          "Cada card mostra uma descrição breve da funcionalidade"
        ]
      },
      {
        id: "recent-tasks",
        title: "Tarefas Recentes",
        content: "Acompanhe as tarefas mais recentes do sistema com status, prioridade e responsável. Clique em qualquer tarefa para ver detalhes completos.",
        relatedLinks: [
          { label: "Ver Todas as Tarefas", path: "/tasks" }
        ]
      }
    ]
  },
  {
    id: "projects",
    title: "Projetos",
    icon: FileText,
    description: "Gestão completa de projetos de painéis pré-fabricados",
    permissionLevel: "all",
    subsections: [
      {
        id: "create-project",
        title: "Criar Novo Projeto",
        content: "Crie projetos detalhados com informações sobre categoria, localização, cliente e prazos.",
        steps: [
          "Clique no botão 'Novo Projeto'",
          "Preencha o nome do projeto",
          "Selecione a categoria (Residencial, Comercial, Industrial, etc.)",
          "Defina a localização",
          "Adicione o nome do cliente",
          "Configure as datas de início e entrega",
          "Salve o projeto"
        ],
        tips: [
          "Projetos bem nomeados facilitam a busca posterior",
          "A categoria ajuda na organização e filtros"
        ]
      },
      {
        id: "view-projects",
        title: "Visualizar Projetos",
        content: "Todos os projetos são exibidos em cards com informações resumidas: nome, categoria, progresso, e datas importantes. Use a barra de busca ou filtros para encontrar projetos específicos.",
        tips: [
          "Clique em qualquer card para ver detalhes completos",
          "O progresso é calculado com base nas tarefas concluídas"
        ]
      },
      {
        id: "filter-search",
        title: "Filtrar e Buscar",
        content: "Use o campo de busca para encontrar projetos por nome. Os filtros por categoria permitem ver apenas projetos de um tipo específico (Residencial, Comercial, Industrial, Hospitalar, Educacional).",
        steps: [
          "Digite no campo de busca para filtrar por nome",
          "Use o dropdown de categoria para filtrar por tipo",
          "Combine busca e filtros para resultados mais precisos"
        ]
      },
      {
        id: "project-details",
        title: "Detalhes do Projeto",
        content: "Ao clicar em um projeto, você acessa informações detalhadas incluindo progresso geral, tarefas associadas, equipe alocada, cronograma e histórico de atualizações.",
        relatedLinks: [
          { label: "Ver Tarefas", path: "/tasks" },
          { label: "Ver Equipe", path: "/team" }
        ]
      }
    ]
  },
  {
    id: "tasks",
    title: "Tarefas",
    icon: CheckSquare,
    description: "Gerenciamento de tarefas com prioridades e status",
    permissionLevel: "all",
    subsections: [
      {
        id: "create-task",
        title: "Criar Nova Tarefa",
        content: "Adicione tarefas ao sistema definindo título, descrição, prioridade, prazo e responsável.",
        steps: [
          "Clique em 'Nova Tarefa'",
          "Preencha o título da tarefa",
          "Adicione uma descrição detalhada",
          "Selecione a prioridade (Baixa, Média, Alta, Urgente)",
          "Defina a data de conclusão",
          "Escolha o responsável",
          "Associe a um projeto (opcional)",
          "Salve a tarefa"
        ],
        tips: [
          "Tarefas urgentes aparecem destacadas em vermelho",
          "Descrições claras evitam confusão na execução"
        ]
      },
      {
        id: "view-tasks",
        title: "Visualizar e Filtrar Tarefas",
        content: "Veja todas as tarefas do sistema com filtros por status: Todas, Pendentes, Em Andamento e Concluídas. Use a busca para encontrar tarefas específicas por título ou descrição.",
        steps: [
          "Use os botões de filtro para ver tarefas por status",
          "Filtre por projeto no dropdown",
          "Use a busca para encontrar tarefas específicas"
        ]
      },
      {
        id: "update-status",
        title: "Atualizar Status",
        content: "Atualize o status das tarefas conforme o progresso: Pendente → Em Andamento → Concluída. Tarefas concluídas somam pontos no sistema de gamificação.",
        tips: [
          "Marque tarefas como concluídas assim que finalizadas",
          "Tarefas urgentes concluídas dão mais pontos"
        ],
        relatedLinks: [
          { label: "Ver Classificação", path: "/leaderboard" }
        ]
      },
      {
        id: "gamification",
        title: "Sistema de Pontos",
        content: "Cada tarefa concluída soma pontos ao seu perfil. A quantidade de pontos varia conforme a prioridade da tarefa. Acumule pontos para subir de nível e conquistar badges.",
        tips: [
          "Tarefas urgentes dão mais pontos",
          "Veja seu ranking na página de Classificação"
        ]
      }
    ]
  },
  {
    id: "team",
    title: "Equipe",
    icon: Users,
    description: "Gestão de membros da equipe e desempenho",
    permissionLevel: "admin",
    subsections: [
      {
        id: "add-member",
        title: "Adicionar Membro",
        content: "Cadastre novos membros da equipe definindo nome, cargo, departamento e nível inicial.",
        steps: [
          "Clique em 'Adicionar Membro'",
          "Preencha nome completo",
          "Defina o cargo",
          "Selecione o departamento",
          "Configure o nível inicial",
          "Adicione foto de perfil (opcional)",
          "Salve o cadastro"
        ],
        warnings: [
          "Esta funcionalidade está disponível apenas para Administradores"
        ]
      },
      {
        id: "view-team",
        title: "Visualizar Equipe",
        content: "Veja todos os membros da equipe em cards com informações de performance: nível, pontos acumulados, projetos ativos e tarefas concluídas.",
        tips: [
          "Use os filtros por departamento para encontrar membros específicos",
          "Clique em um membro para ver detalhes completos"
        ]
      },
      {
        id: "departments",
        title: "Departamentos",
        content: "A equipe é organizada por departamentos: Engenharia, Arquitetura, Produção, Qualidade e Gerência. Filtre por departamento para visualizar equipes específicas.",
        steps: [
          "Use o dropdown de departamentos",
          "Selecione um ou mais departamentos",
          "Limpe os filtros para ver todos os membros"
        ]
      },
      {
        id: "performance",
        title: "Métricas de Desempenho",
        content: "Cada membro possui métricas visíveis: nível atual, pontos totais, projetos ativos e tarefas concluídas. Estes dados ajudam na avaliação de performance.",
        relatedLinks: [
          { label: "Ver Classificação Geral", path: "/leaderboard" }
        ]
      }
    ]
  },
  {
    id: "leaderboard",
    title: "Classificação",
    icon: Trophy,
    description: "Ranking de desempenho e sistema de gamificação",
    permissionLevel: "all",
    subsections: [
      {
        id: "individual-ranking",
        title: "Ranking Individual",
        content: "Veja a classificação de todos os membros da equipe ordenados por pontos. O ranking mostra posição, nome, pontos totais, nível e progresso para o próximo nível.",
        tips: [
          "Seu card aparece destacado no ranking",
          "Use a busca para encontrar um participante específico"
        ]
      },
      {
        id: "achievements",
        title: "Conquistas Recentes",
        content: "Acompanhe os badges e prêmios desbloqueados recentemente pelos membros da equipe. Conquistas especiais aparecem com destaque visual.",
        tips: [
          "Badges são desbloqueados ao atingir marcos específicos",
          "Conquistas motivam a equipe e aumentam o engajamento"
        ]
      },
      {
        id: "points-system",
        title: "Como Ganhar Pontos",
        content: "Pontos são ganhos ao concluir tarefas. A quantidade varia conforme a prioridade:",
        steps: [
          "Tarefa de Baixa Prioridade: 10 pontos",
          "Tarefa de Média Prioridade: 25 pontos",
          "Tarefa de Alta Prioridade: 50 pontos",
          "Tarefa Urgente: 100 pontos"
        ]
      },
      {
        id: "level-progression",
        title: "Progressão de Nível",
        content: "A cada 1000 pontos acumulados, você sobe um nível. A barra de progresso mostra quanto falta para o próximo nível. Níveis mais altos desbloqueiam badges especiais.",
        relatedLinks: [
          { label: "Ver Minhas Tarefas", path: "/tasks" }
        ]
      }
    ]
  },
  {
    id: "calendar",
    title: "Calendário e Produção",
    icon: Calendar,
    description: "Cronograma de produção de painéis",
    permissionLevel: "all",
    subsections: [
      {
        id: "overview-calendar",
        title: "Visão Geral do Calendário",
        content: "O calendário exibe o cronograma completo de produção de painéis. Cada painel possui um status: em produção, em cura, aguardando entrega ou atrasado.",
        tips: [
          "Cores diferentes indicam diferentes status",
          "Clique em qualquer painel para ver detalhes"
        ]
      },
      {
        id: "daily-summary",
        title: "Sumário do Dia",
        content: "Cards no topo da página mostram estatísticas do dia: total de painéis em produção, em cura, prontos para entrega e painéis atrasados.",
        warnings: [
          "Painéis atrasados aparecem em vermelho e requerem atenção imediata"
        ]
      },
      {
        id: "production-schedule",
        title: "Aba Produção",
        content: "Visualize o cronograma de produção em diferentes períodos: diário, semanal ou mensal. A timeline mostra todas as etapas de cada painel desde o início até a entrega.",
        steps: [
          "Selecione a visualização (Dia/Semana/Mês)",
          "Navegue entre períodos usando as setas",
          "Clique em um painel para editar ou ver detalhes"
        ]
      },
      {
        id: "queue-cure",
        title: "Aba Fila e Cura",
        content: "Acompanhe painéis em processo: fila de produção (aguardando início) e painéis em cura (aguardando tempo necessário para serem finalizados).",
        tips: [
          "Painéis em cura possuem timer de contagem regressiva",
          "Arraste e solte para reorganizar a fila de produção"
        ]
      },
      {
        id: "consumption",
        title: "Aba Consumo de Materiais",
        content: "Visualize os materiais utilizados por dia de produção. Gráficos mostram o consumo real versus o planejado, ajudando a identificar desperdícios.",
        relatedLinks: [
          { label: "Ver Estoque", path: "/inventory" }
        ]
      },
      {
        id: "weekly-forecast",
        title: "Previsão Semanal",
        content: "Planeje a produção dos próximos dias com base em prazos de projetos e disponibilidade de materiais. A previsão ajuda a evitar gargalos.",
        tips: [
          "Use a previsão para antecipar compras de materiais",
          "Ajuste o cronograma conforme necessário"
        ]
      }
    ]
  },
  {
    id: "inventory",
    title: "Estoque",
    icon: Package,
    description: "Controle de materiais e painéis em estoque",
    permissionLevel: "all",
    subsections: [
      {
        id: "materials-tab",
        title: "Aba Materiais",
        content: "Veja todos os materiais em estoque com informações de quantidade, localização e alertas de estoque baixo. Materiais são categorizados para facilitar a busca.",
        tips: [
          "Use os filtros por categoria para encontrar materiais rapidamente",
          "Materiais com estoque baixo aparecem destacados em amarelo"
        ]
      },
      {
        id: "panels-tab",
        title: "Aba Painéis",
        content: "Visualize painéis prontos em estoque aguardando entrega. Cada painel possui código de rastreamento, dimensões, projeto associado e data de produção.",
        steps: [
          "Busque painéis por código ou projeto",
          "Filtre por dimensões ou tipo",
          "Clique para ver histórico completo do painel"
        ]
      },
      {
        id: "categories",
        title: "Categorias de Materiais",
        content: "Os materiais são organizados em categorias: Estrutura (concreto, aço), Fixação (parafusos, conectores), Revestimento, Isolamento e Acabamento.",
        tips: [
          "Filtre por categoria para agilizar a busca",
          "Cada categoria possui cor específica para identificação rápida"
        ]
      },
      {
        id: "low-stock",
        title: "Alertas de Estoque Baixo",
        content: "O sistema alerta automaticamente quando materiais atingem o limite mínimo. Alertas aparecem no topo da página e nos cards de cada material.",
        warnings: [
          "Configure limites mínimos adequados para evitar paradas na produção",
          "Faça pedidos de reposição assim que receber alertas"
        ]
      },
      {
        id: "location",
        title: "Localização no Estoque",
        content: "Cada material possui identificação de prateleira ou área de armazenamento. Use o campo de busca com o código da localização para encontrar materiais rapidamente.",
        tips: [
          "Mantenha o sistema atualizado ao mover materiais",
          "Use códigos de prateleira padronizados (ex: A1, B2, C3)"
        ]
      }
    ]
  },
  {
    id: "reports",
    title: "Relatórios",
    icon: BarChart3,
    description: "Relatórios analíticos de produção e eficiência",
    permissionLevel: "admin-financeiro",
    subsections: [
      {
        id: "production-reports",
        title: "Aba Produção",
        content: "Visualize gráficos detalhados de produção mensal, distribuição por tipo de painel e tempo médio de produção. Use filtros de período para análises customizadas.",
        tips: [
          "Passe o mouse sobre os gráficos para ver detalhes",
          "Use o seletor de período para comparar meses diferentes"
        ],
        warnings: [
          "Disponível apenas para Admin e Financeiro"
        ]
      },
      {
        id: "materials-reports",
        title: "Aba Materiais",
        content: "Compare o consumo real de materiais versus o planejado. Gráficos mostram variações percentuais por categoria, ajudando a identificar desperdícios ou desvios.",
        steps: [
          "Selecione o período de análise",
          "Visualize o gráfico de consumo real vs. planejado",
          "Identifique materiais com maior variação",
          "Analise as causas dos desvios"
        ]
      },
      {
        id: "efficiency-reports",
        title: "Aba Eficiência",
        content: "Compare a eficiência de diferentes projetos com base em tempo de produção, consumo de materiais e cumprimento de prazos. Rankings mostram os projetos mais eficientes.",
        relatedLinks: [
          { label: "Ver Projetos", path: "/projects" }
        ]
      },
      {
        id: "export-reports",
        title: "Exportação de Relatórios",
        content: "Exporte relatórios em formato PDF ou Excel para análises externas ou apresentações. Todos os gráficos e tabelas são incluídos na exportação.",
        steps: [
          "Configure o relatório desejado",
          "Clique no botão de exportar",
          "Escolha o formato (PDF ou Excel)",
          "Faça o download do arquivo"
        ]
      },
      {
        id: "refresh-data",
        title: "Atualização de Dados",
        content: "Use o botão de refresh para atualizar os dados dos relatórios manualmente. O sistema também atualiza automaticamente a cada 5 minutos.",
        tips: [
          "Atualize após mudanças importantes na produção",
          "Dados são salvos no histórico para análises futuras"
        ]
      }
    ]
  },
  {
    id: "budget",
    title: "Orçamentos",
    icon: DollarSign,
    description: "Gestão de orçamentos e comparação SINAPI",
    permissionLevel: "admin-financeiro",
    subsections: [
      {
        id: "materials-tab",
        title: "Aba Insumos",
        content: "Importe planilhas de materiais em formato Excel (.xlsx) para criar bases de orçamentos. O sistema processa automaticamente os dados da planilha.",
        steps: [
          "Clique em 'Importar Planilha'",
          "Selecione o arquivo Excel (.xlsx)",
          "Aguarde o processamento",
          "Revise os materiais importados na tabela"
        ],
        tips: [
          "Use o template fornecido para evitar erros de importação",
          "Verifique se todas as colunas obrigatórias estão presentes"
        ],
        warnings: [
          "Disponível apenas para Admin e Financeiro"
        ]
      },
      {
        id: "budgets-tab",
        title: "Aba Orçamentos",
        content: "Crie e gerencie orçamentos de projetos. Adicione materiais, defina quantidades, calcule totais e gere documentos profissionais para clientes.",
        steps: [
          "Clique em 'Novo Orçamento'",
          "Associe a um projeto",
          "Adicione materiais da base de dados",
          "Defina quantidades",
          "Configure margens e impostos",
          "Gere o documento final"
        ]
      },
      {
        id: "sinapi-comparison",
        title: "Aba Comparação SINAPI",
        content: "Importe e compare composições SINAPI (Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil) para validar preços e garantir conformidade com valores de referência do mercado.",
        tips: [
          "Use arquivos no formato FNDE para melhor compatibilidade",
          "Compare seus preços com os valores SINAPI para negociações"
        ]
      },
      {
        id: "import-sinapi",
        title: "Importar Composições SINAPI",
        content: "Faça upload de arquivos Excel com composições SINAPI. O sistema processa automaticamente as composições e seus insumos detalhados.",
        steps: [
          "Clique em 'Importar Composições SINAPI'",
          "Selecione o arquivo Excel (.xlsx)",
          "Aguarde o processamento (pode levar alguns segundos)",
          "Visualize as composições importadas"
        ],
        warnings: [
          "Certifique-se de usar o formato correto (FNDE)",
          "Arquivos muito grandes podem demorar para processar"
        ]
      },
      {
        id: "view-compositions",
        title: "Visualizar Composições",
        content: "Veja todas as composições SINAPI importadas em uma tabela interativa. Cada composição pode ser expandida para visualizar seus insumos detalhados: materiais, mão de obra, equipamentos e serviços.",
        tips: [
          "Clique no ícone '+' para expandir e ver os insumos",
          "Use os filtros para encontrar composições específicas"
        ]
      },
      {
        id: "filter-sinapi",
        title: "Filtros e Busca SINAPI",
        content: "Filtre composições por fonte (SINAPI, SP OBRAS, PRÓPRIA) e por categoria de insumo (Material, Mão de Obra, Equipamento, Serviço). Use a busca por código ou descrição.",
        steps: [
          "Use o dropdown 'Fonte' para filtrar por origem dos dados",
          "Use o dropdown 'Categoria' para filtrar por tipo de insumo",
          "Digite no campo de busca para encontrar códigos ou descrições específicas",
          "Combine múltiplos filtros para resultados precisos"
        ]
      },
      {
        id: "composition-details",
        title: "Detalhes da Composição",
        content: "Cada composição exibe: código, descrição, unidade, valor total, BDI (%) e lista completa de insumos com coeficientes, preços unitários e totais.",
        tips: [
          "Coeficiente indica a quantidade necessária do insumo",
          "Preço Total = Coeficiente × Preço Unitário",
          "BDI (Bonificações e Despesas Indiretas) já está incluído no valor total"
        ]
      },
      {
        id: "search-code",
        title: "Buscar Código SINAPI",
        content: "Use a ferramenta de busca rápida para encontrar códigos SINAPI específicos. Ideal quando você sabe o código mas precisa ver os detalhes da composição.",
        steps: [
          "Clique em 'Buscar Código SINAPI'",
          "Digite o código completo",
          "Visualize os resultados instantaneamente",
          "Expanda para ver insumos detalhados"
        ]
      }
    ]
  },
  {
    id: "production-iot",
    title: "Monitoramento IoT",
    icon: Activity,
    description: "Monitoramento em tempo real da produção com IoT",
    permissionLevel: "all",
    subsections: [
      {
        id: "system-status",
        title: "Status do Sistema",
        content: "O indicador no topo da página mostra o status da conexão IoT: Online (verde) ou Offline (vermelho). Dados são atualizados em tempo real quando online.",
        warnings: [
          "Se o sistema estiver offline, os dados podem estar desatualizados",
          "Verifique a conexão de internet e sensores em caso de problemas"
        ]
      },
      {
        id: "quick-stats",
        title: "Estatísticas Rápidas",
        content: "Cards no topo mostram: total de painéis monitorados, painéis em produção, painéis aprovados e painéis com alertas ativos.",
        tips: [
          "Painéis com alertas requerem atenção imediata",
          "Clique nos cards para filtrar a visualização"
        ]
      },
      {
        id: "panels-monitoring",
        title: "Aba Painéis",
        content: "Visualize todos os painéis em produção com status em tempo real. Cada card mostra: ID do painel, fase atual, temperatura, umidade e alertas ativos.",
        steps: [
          "Visualize todos os painéis na grid",
          "Clique em um painel para ver detalhes completos",
          "Monitore leituras de sensores em tempo real"
        ]
      },
      {
        id: "alerts-monitoring",
        title: "Aba Alertas",
        content: "Lista todos os alertas ativos do sistema IoT: temperatura fora do padrão, umidade inadequada, vibrações anormais, etc. Cada alerta possui nível de severidade.",
        warnings: [
          "Alertas críticos (vermelho) requerem ação imediata",
          "Marque alertas como resolvidos após tomar ação"
        ]
      },
      {
        id: "panel-details",
        title: "Detalhes do Painel",
        content: "Ao clicar em um painel, veja: histórico completo de etapas, leituras de todos os sensores (temperatura, umidade, pressão, vibração), QR Code para rastreamento e opção de atualizar status.",
        tips: [
          "Use o QR Code para rastreamento físico do painel",
          "Histórico mostra todas as transições de fase com timestamps"
        ]
      },
      {
        id: "sensors",
        title: "Leituras de Sensores",
        content: "Cada painel possui múltiplos sensores IoT: temperatura (°C), umidade (%), pressão (kPa) e vibração (Hz). Valores fora da faixa normal geram alertas automáticos.",
        tips: [
          "Valores ideais dependem da fase de produção",
          "Gráficos históricos mostram tendências ao longo do tempo"
        ]
      },
      {
        id: "resolve-alerts",
        title: "Resolver Alertas",
        content: "Quando um alerta é identificado, tome a ação corretiva necessária e marque o alerta como resolvido. Adicione comentários sobre a ação tomada para histórico.",
        steps: [
          "Identifique o alerta na aba de Alertas",
          "Tome a ação corretiva necessária",
          "Clique em 'Resolver'",
          "Adicione comentários sobre a solução",
          "Confirme a resolução"
        ]
      },
      {
        id: "update-status",
        title: "Atualizar Status do Painel",
        content: "Atualize manualmente a fase de produção do painel: Moldagem → Cura → Acabamento → Qualidade → Finalizado. Cada transição é registrada no histórico.",
        tips: [
          "Atualize o status apenas quando a fase estiver realmente completa",
          "Transições são auditadas e aparecem no relatório"
        ]
      }
    ]
  },
  {
    id: "faq",
    title: "Perguntas Frequentes",
    icon: HelpCircle,
    description: "Dúvidas comuns sobre o sistema",
    permissionLevel: "all",
    subsections: [
      {
        id: "general-faq",
        title: "Geral",
        content: "Perguntas gerais sobre o sistema e seu funcionamento.",
        steps: [
          "Q: Como faço para alterar minha senha? | A: No menu do seu perfil, clique em 'Configurações' e depois em 'Alterar Senha'.",
          "Q: Posso acessar o sistema pelo celular? | A: Sim! O sistema é totalmente responsivo e funciona em qualquer dispositivo.",
          "Q: Como atualizo minha foto de perfil? | A: Clique no seu avatar no canto superior direito e selecione 'Perfil'.",
          "Q: O que fazer se esquecer minha senha? | A: Use a opção 'Esqueci minha senha' na tela de login."
        ]
      },
      {
        id: "technical-faq",
        title: "Técnico",
        content: "Questões técnicas sobre funcionalidades do sistema.",
        steps: [
          "Q: Os dados são salvos automaticamente? | A: Sim, todas as alterações são salvas em tempo real no servidor.",
          "Q: Como funciona a sincronização IoT? | A: Sensores enviam dados a cada 30 segundos via protocolo MQTT.",
          "Q: Posso exportar relatórios? | A: Sim, relatórios podem ser exportados em PDF ou Excel (apenas Admin/Financeiro).",
          "Q: Há limite de projetos? | A: Não, você pode criar quantos projetos precisar."
        ]
      },
      {
        id: "permissions-faq",
        title: "Permissões",
        content: "Dúvidas sobre níveis de acesso e permissões.",
        steps: [
          "Q: Como sei qual meu nível de permissão? | A: Seu nível aparece no menu do perfil (Admin, Financeiro ou Operacional).",
          "Q: Posso solicitar acesso Admin? | A: Sim, contate o administrador do sistema da sua empresa.",
          "Q: Por que não vejo a aba 'Equipe'? | A: Esta aba é exclusiva para usuários Admin.",
          "Q: Posso criar orçamentos? | A: Apenas usuários Admin e Financeiro podem criar orçamentos."
        ]
      }
    ]
  },
  {
    id: "glossary",
    title: "Glossário",
    icon: BookOpen,
    description: "Definições de termos técnicos",
    permissionLevel: "all",
    subsections: [
      {
        id: "construction-terms",
        title: "Termos de Construção",
        content: "Definições de termos relacionados a painéis pré-fabricados e construção.",
        steps: [
          "Painel Pré-fabricado: Elemento construtivo produzido industrialmente antes da montagem no local da obra.",
          "Cura: Processo de endurecimento do concreto que requer controle de temperatura e umidade.",
          "Moldagem: Etapa inicial de produção onde o concreto é despejado nas formas.",
          "BDI: Bonificações e Despesas Indiretas - percentual aplicado sobre custos diretos.",
          "Composição: Conjunto de insumos necessários para executar um serviço ou produzir um elemento."
        ]
      },
      {
        id: "system-terms",
        title: "Termos do Sistema",
        content: "Definições de termos técnicos usados no sistema.",
        steps: [
          "SINAPI: Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil.",
          "RLS: Row Level Security - segurança de dados a nível de linha no banco de dados.",
          "IoT: Internet of Things - rede de dispositivos físicos conectados à internet.",
          "Dashboard: Painel visual com resumo de informações e métricas importantes.",
          "Gamificação: Uso de elementos de jogos (pontos, níveis, badges) para engajamento."
        ]
      },
      {
        id: "technical-terms",
        title: "Termos Técnicos",
        content: "Definições de termos técnicos de produção e qualidade.",
        steps: [
          "Coeficiente: Quantidade de um insumo necessária para produzir uma unidade do item final.",
          "Tolerância: Variação aceitável em medidas ou especificações técnicas.",
          "Qualidade: Conformidade com especificações técnicas e normas aplicáveis.",
          "Timeline: Linha do tempo com sequência de eventos ou atividades.",
          "Badge: Distintivo virtual conquistado ao atingir objetivos no sistema."
        ]
      }
    ]
  },
  {
    id: "shortcuts",
    title: "Atalhos e Dicas",
    icon: Zap,
    description: "Atalhos de teclado e dicas de produtividade",
    permissionLevel: "all",
    subsections: [
      {
        id: "keyboard-shortcuts",
        title: "Atalhos de Teclado",
        content: "Atalhos úteis para navegar mais rapidamente no sistema.",
        steps: [
          "Ctrl + K: Abrir busca global (em breve)",
          "Ctrl + N: Nova tarefa/projeto (quando aplicável)",
          "Esc: Fechar diálogos e modais",
          "Tab: Navegar entre campos de formulário",
          "Enter: Confirmar ação em diálogos"
        ],
        tips: [
          "Use Tab para navegar rapidamente em formulários",
          "Esc sempre fecha o último modal aberto"
        ]
      },
      {
        id: "productivity-tips",
        title: "Dicas de Produtividade",
        content: "Aproveite melhor o sistema com estas dicas.",
        steps: [
          "Use filtros combinados para encontrar informações rapidamente",
          "Marque tarefas como concluídas diariamente para manter pontuação atualizada",
          "Configure alertas de estoque baixo adequadamente",
          "Exporte relatórios periodicamente para análises offline",
          "Use QR Codes para rastreamento físico de painéis"
        ]
      },
      {
        id: "best-practices",
        title: "Melhores Práticas",
        content: "Recomendações para usar o sistema de forma eficiente.",
        steps: [
          "Atualize status de tarefas e painéis em tempo real",
          "Mantenha informações de projetos sempre atualizadas",
          "Revise alertas IoT diariamente",
          "Faça backups de dados importantes via exportação",
          "Treine novos usuários com este manual"
        ],
        tips: [
          "Dados atualizados geram relatórios mais precisos",
          "Comunicação constante da equipe melhora eficiência"
        ]
      }
    ]
  }
];

export const faqItems = [
  {
    category: "Geral",
    questions: [
      {
        q: "Como faço para alterar minha senha?",
        a: "No menu do seu perfil (clique no avatar no canto superior direito), selecione 'Configurações' e depois 'Alterar Senha'. Siga as instruções na tela."
      },
      {
        q: "Posso acessar o sistema pelo celular?",
        a: "Sim! O sistema é totalmente responsivo e funciona perfeitamente em smartphones e tablets. Todos os recursos estão disponíveis na versão mobile."
      },
      {
        q: "O que fazer se esquecer minha senha?",
        a: "Na tela de login, clique em 'Esqueci minha senha'. Você receberá um email com instruções para redefinir sua senha."
      }
    ]
  },
  {
    category: "Técnico",
    questions: [
      {
        q: "Os dados são salvos automaticamente?",
        a: "Sim, todas as alterações feitas no sistema são salvas automaticamente em tempo real no servidor. Não é necessário clicar em 'Salvar'."
      },
      {
        q: "Como funciona a sincronização IoT?",
        a: "Os sensores IoT enviam dados a cada 30 segundos via protocolo MQTT. O sistema processa e exibe as informações em tempo real na interface."
      },
      {
        q: "Posso exportar relatórios?",
        a: "Sim, usuários com permissão Admin ou Financeiro podem exportar relatórios em formato PDF ou Excel através da aba de Relatórios."
      }
    ]
  },
  {
    category: "Permissões",
    questions: [
      {
        q: "Como sei qual meu nível de permissão?",
        a: "Seu nível de permissão aparece no menu do perfil (clique no avatar). Pode ser: Admin, Financeiro ou Operacional."
      },
      {
        q: "Por que não vejo a aba 'Equipe'?",
        a: "A aba 'Equipe' é exclusiva para usuários com permissão de Administrador. Contate o admin do sistema se você precisa deste acesso."
      },
      {
        q: "Posso criar orçamentos?",
        a: "Apenas usuários com permissão Admin ou Financeiro podem acessar e criar orçamentos na aba de Orçamentos."
      }
    ]
  }
];
