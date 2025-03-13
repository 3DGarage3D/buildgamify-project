
import { useState } from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter,
  ListFilter,
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
import TeamMember from "@/components/team/TeamMember";
import { useStaggeredAnimation } from "@/utils/animation";

// Mock data
const teamMembers = [
  {
    id: "m1",
    name: "Carlos Oliveira",
    role: "Engenheiro Estrutural",
    level: 8,
    points: 3245,
    projects: 12,
    completedTasks: 87,
    department: "Engenharia"
  },
  {
    id: "m2",
    name: "Ana Pimentel",
    role: "Arquiteta",
    level: 7,
    points: 2870,
    projects: 10,
    completedTasks: 62,
    department: "Arquitetura"
  },
  {
    id: "m3",
    name: "Roberto Santos",
    role: "Gerente de Projetos",
    level: 9,
    points: 4120,
    projects: 18,
    completedTasks: 105,
    department: "Gerência"
  },
  {
    id: "m4",
    name: "Juliana Costa",
    role: "Especialista em Painelização",
    level: 8,
    points: 3050,
    projects: 15,
    completedTasks: 74,
    department: "Produção"
  },
  {
    id: "m5",
    name: "Fernando Mendes",
    role: "Coordenador de Produção",
    level: 6,
    points: 2340,
    projects: 9,
    completedTasks: 58,
    department: "Produção"
  },
  {
    id: "m6",
    name: "Mariana Alves",
    role: "Engenheira Civil",
    level: 5,
    points: 1890,
    projects: 7,
    completedTasks: 43,
    department: "Engenharia"
  },
  {
    id: "m7",
    name: "Lucas Pereira",
    role: "Técnico em Edificações",
    level: 4,
    points: 1450,
    projects: 5,
    completedTasks: 31,
    department: "Engenharia"
  },
  {
    id: "m8",
    name: "Patricia Gomes",
    role: "Coordenadora de Qualidade",
    level: 7,
    points: 2680,
    projects: 11,
    completedTasks: 64,
    department: "Qualidade"
  }
];

const departments = [
  "Todos",
  "Engenharia",
  "Arquitetura",
  "Produção",
  "Gerência",
  "Qualidade"
];

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const visibleMembers = useStaggeredAnimation(teamMembers.length, 100, 100);
  
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartments.length === 0 || 
      selectedDepartments.includes(member.department) ||
      (selectedDepartments.includes("Todos"));
    
    return matchesSearch && matchesDepartment;
  });
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              Equipe
            </h1>
            <p className="text-muted-foreground">
              Gerencie e visualize os membros da sua equipe
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Adicionar Membro</span>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar membros..."
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
                <span className="hidden sm:inline">Departamentos</span>
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={selectedDepartments.includes(department)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      if (department === "Todos") {
                        setSelectedDepartments(["Todos"]);
                      } else {
                        setSelectedDepartments([
                          ...selectedDepartments.filter(d => d !== "Todos"), 
                          department
                        ]);
                      }
                    } else {
                      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
                    }
                  }}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="gap-2">
            <ListFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Ordenar</span>
          </Button>
        </div>
      </div>
      
      {/* Team Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <TeamMember 
              key={member.id} 
              member={member} 
              className={visibleMembers.includes(index) ? 'animate-scale' : 'opacity-0'}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum membro encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Não encontramos membros que correspondam aos seus filtros de busca.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartments([]);
            }}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            <span>Limpar filtros</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Team;
