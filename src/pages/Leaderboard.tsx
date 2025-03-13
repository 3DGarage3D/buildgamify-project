
import { useState } from "react";
import { 
  Trophy, 
  Medal, 
  User, 
  ArrowUp, 
  Search 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useStaggeredAnimation } from "@/utils/animation";

// Mock data
const teamMembers = [
  {
    id: "user1",
    name: "Ana Silva",
    role: "Engenheira Estrutural",
    avatar: "/placeholder.svg",
    points: 8750,
    level: 12,
    badges: ["Especialista em Painéis", "Mestre BIM", "Inovador"],
    progress: 75,
    rank: 1,
    change: "up"
  },
  {
    id: "user2",
    name: "Rafael Costa",
    role: "Arquiteto Técnico",
    avatar: "/placeholder.svg",
    points: 7890,
    level: 11,
    badges: ["Colaborador Destacado", "Gerente de Projeto"],
    progress: 62,
    rank: 2,
    change: "up"
  },
  {
    id: "user3",
    name: "Juliana Mendes",
    role: "Gerente de Projetos",
    avatar: "/placeholder.svg",
    points: 6540,
    level: 10,
    badges: ["Líder de Equipe", "Estrategista"],
    progress: 48,
    rank: 3,
    change: "same"
  },
  {
    id: "user4",
    name: "Carlos Eduardo",
    role: "Engenheiro de Produção",
    avatar: "/placeholder.svg",
    points: 5980,
    level: 9,
    badges: ["Otimizador", "Especialista em Processos"],
    progress: 89,
    rank: 4,
    change: "up"
  },
  {
    id: "user5",
    name: "Fernanda Rocha",
    role: "Analista de Qualidade",
    avatar: "/placeholder.svg",
    points: 5120,
    level: 8,
    badges: ["Controlador de Qualidade", "Detalhista"],
    progress: 35,
    rank: 5,
    change: "down"
  },
  {
    id: "user6",
    name: "Gabriel Santos",
    role: "Modelador BIM",
    avatar: "/placeholder.svg",
    points: 4750,
    level: 8,
    badges: ["Especialista em Modelagem", "Inovador"],
    progress: 22,
    rank: 6,
    change: "down"
  },
  {
    id: "user7",
    name: "Mariana Costa",
    role: "Arquiteta",
    avatar: "/placeholder.svg",
    points: 4380,
    level: 7,
    badges: ["Detalhista", "Criativa"],
    progress: 92,
    rank: 7,
    change: "up"
  },
  {
    id: "user8",
    name: "Lucas Oliveira",
    role: "Engenheiro de Montagem",
    avatar: "/placeholder.svg",
    points: 3920,
    level: 7,
    badges: ["Montador Experiente", "Eficiente"],
    progress: 65,
    rank: 8,
    change: "same"
  }
];

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("individual");
  const visibleItems = useStaggeredAnimation(teamMembers.length, 70, 40);
  
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return "text-yellow-500";
      case 2: return "text-slate-400"; 
      case 3: return "text-amber-700";
      default: return "text-slate-600";
    }
  };
  
  const getChangeIcon = (change: string) => {
    switch(change) {
      case "up": return <ArrowUp className="h-3 w-3 text-emerald-500" />;
      case "down": return <ArrowUp className="h-3 w-3 text-rose-500 rotate-180" />;
      default: return <span className="h-3 w-3 block" />;
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              Classificação
            </h1>
            <p className="text-muted-foreground">
              Acompanhe as conquistas e recompensas da equipe
            </p>
          </div>
        </div>
      </div>
      
      {/* Search and Tabs */}
      <div className="flex flex-col gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar participantes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="individual">
              <User className="h-4 w-4 mr-2" />
              <span>Individual</span>
            </TabsTrigger>
            <TabsTrigger value="team">
              <Medal className="h-4 w-4 mr-2" />
              <span>Equipes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Ranking Individual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredMembers.map((member, index) => (
                    <div 
                      key={member.id}
                      className={`p-4 bg-card rounded-md border transition-all ${
                        member.rank <= 3 ? 'border-primary/30 shadow-sm' : 'border-border/40'
                      } ${visibleItems.includes(index) ? 'animate-slide-up' : 'opacity-0'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`font-bold text-lg ${getRankColor(member.rank)}`}>
                          {member.rank}
                        </div>
                        
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.name}</span>
                            <div className="flex items-center gap-1 text-xs">
                              {getChangeIcon(member.change)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-primary">{member.points.toLocaleString()} pts</div>
                          <div className="text-xs text-muted-foreground">Nível {member.level}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="text-muted-foreground">Progresso para nível {member.level + 1}</div>
                          <div className="font-medium">{member.progress}%</div>
                        </div>
                        <Progress value={member.progress} className="h-1.5" />
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {member.badges.map(badge => (
                          <Badge 
                            key={badge} 
                            variant="secondary" 
                            className="text-xs font-normal"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {filteredMembers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-4 mb-4">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
                      <p className="text-muted-foreground mb-4">
                        Não encontramos participantes que correspondam à sua busca.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                        className="gap-2"
                      >
                        <span>Limpar busca</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Ranking de Equipes</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-muted p-6 mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Em breve!</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  O ranking de equipes estará disponível em uma atualização futura.
                  Fique atento às novidades!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight font-display">Conquistas Recentes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-950/30">
                  <Trophy className="h-4 w-4 text-blue-500" />
                </div>
                Produtividade Máxima
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Concluiu 10 tarefas em um único dia</p>
              <Separator className="my-3" />
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <span className="text-sm">Desbloqueado por Rafael</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950/30">
                  <Medal className="h-4 w-4 text-emerald-500" />
                </div>
                Antecipador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Concluiu projeto com 1 semana de antecedência</p>
              <Separator className="my-3" />
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <span className="text-sm">Desbloqueado por Juliana</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-violet-100 dark:bg-violet-950/30">
                  <Medal className="h-4 w-4 text-violet-500" />
                </div>
                Colaborador Exemplar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ajudou 5 colegas em suas tarefas</p>
              <Separator className="my-3" />
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <span className="text-sm">Desbloqueado por Ana</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
