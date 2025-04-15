
import { useState } from "react";
import { 
  Briefcase, 
  Search, 
  Filter, 
  SlidersHorizontal,
  Check
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
import ProjectCard from "@/components/project/ProjectCard";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { useStaggeredAnimation } from "@/utils/animation";
import { Project } from "@/types/budget";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data
const projects: Project[] = [
  {
    id: "1",
    title: "Residencial Villa Moderna",
    description: "Projeto de painelização para condomínio residencial com 24 unidades, incluindo otimização de corte e montagem.",
    progress: 65,
    dueDate: "2023-07-15",
    teamSize: 12,
    tasks: {
      total: 48,
      completed: 31
    },
    category: "Residencial",
    status: 'active'
  },
  {
    id: "2",
    title: "Centro Empresarial Horizonte",
    description: "Painelização para complexo comercial de 3 torres, com foco em eficiência energética e sustentabilidade.",
    progress: 42,
    dueDate: "2023-08-30",
    teamSize: 18,
    tasks: {
      total: 56,
      completed: 23
    },
    category: "Comercial",
    status: 'active'
  },
  {
    id: "3",
    title: "Hospital Regional Norte",
    description: "Sistema de painéis estruturais para novo centro hospitalar, com requisitos especiais de isolamento acústico e térmico.",
    progress: 87,
    dueDate: "2023-06-22",
    teamSize: 24,
    tasks: {
      total: 72,
      completed: 63
    },
    category: "Hospitalar",
    status: 'active'
  },
  {
    id: "4",
    title: "Edifício Corporativo Vega",
    description: "Painelização para torre corporativa de 15 andares, com fachada envidraçada e estrutura metálica.",
    progress: 21,
    dueDate: "2023-09-10",
    teamSize: 16,
    tasks: {
      total: 64,
      completed: 13
    },
    category: "Comercial",
    status: 'active'
  },
  {
    id: "5",
    title: "Condomínio Parque das Águas",
    description: "Projeto de painéis para conjunto residencial com 120 unidades distribuídas em 10 blocos de 4 andares.",
    progress: 54,
    dueDate: "2023-08-05",
    teamSize: 22,
    tasks: {
      total: 96,
      completed: 52
    },
    category: "Residencial",
    status: 'active'
  },
  {
    id: "6",
    title: "Fábrica Automotiva Stella",
    description: "Painelização para nova planta industrial, com requisitos específicos para suporte de maquinário pesado.",
    progress: 33,
    dueDate: "2023-10-15",
    teamSize: 30,
    tasks: {
      total: 108,
      completed: 36
    },
    category: "Industrial",
    status: 'active'
  }
];

const categories = [
  "Residencial",
  "Comercial",
  "Industrial",
  "Hospitalar",
  "Educacional"
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [projectsList, setProjectsList] = useState(projects);
  const visibleProjects = useStaggeredAnimation(projectsList.length, 100, 100);
  const isMobile = useIsMobile();
  
  const filteredProjects = projectsList.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category);
    return matchesSearch && matchesCategory;
  });

  const handleProjectCreated = (newProject: any) => {
    setProjectsList([newProject, ...projectsList]);
  };
  
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-display">
              Projetos
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Gerencie e acompanhe seus projetos
            </p>
          </div>
        </div>
        <NewProjectDialog onProjectCreated={handleProjectCreated} />
      </div>
      
      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 w-full sm:w-auto mb-2 sm:mb-0">
                <Filter className="h-4 w-4" />
                <span className="inline">Categorias</span>
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-56">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="inline">Ordenar</span>
          </Button>
        </div>
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              className={visibleProjects.includes(index) ? 'animate-scale' : 'opacity-0'}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 md:p-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Não encontramos projetos que correspondam aos seus filtros de busca.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategories([]);
            }}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            <span>Limpar filtros</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
