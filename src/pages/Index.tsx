import { useState, useEffect } from "react";
import { useStaggeredAnimation } from "@/utils/animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react";
import StatsRow from "@/components/dashboard/StatsRow";
import FeaturedProject from "@/components/dashboard/FeaturedProject";
import NavigationCards from "@/components/dashboard/NavigationCards";
import TasksList from "@/components/dashboard/TasksList";
import GettingStarted from "@/components/dashboard/GettingStarted";
import FeatureHighlight from "@/components/dashboard/FeatureHighlight";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { 
  stats, 
  featuredProjects, 
  recentTasks, 
  constructionImages,
} from "@/data/dashboardData";

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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section - Intuitive Introduction */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              <Sparkles className="h-4 w-4" />
              Sistema de Gestão de Painéis Pré-Fabricados
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Gerencie seus
              <span className="text-primary block lg:inline lg:ml-3">
                Projetos de Construção
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Plataforma completa para acompanhar produção, equipes, cronogramas e métricas de seus projetos de painéis pré-fabricados de forma simples e eficiente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NewProjectDialog onProjectCreated={handleProjectCreated} />
              
              <Button variant="outline" size="lg" asChild>
                <a href="/reports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver Relatórios
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Stats */}
      <section className="py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Visão Geral do Sistema</h2>
            <p className="text-muted-foreground">Acompanhe os principais indicadores em tempo real</p>
          </div>
          <StatsRow stats={stats} visibleStats={visibleStats} />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* How it Works Section */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Nosso sistema oferece uma abordagem integrada para gerenciar todos os aspectos da sua produção
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover-card">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Planeje Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Crie e organize seus projetos com cronogramas detalhados, alocação de recursos e definição de equipes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover-card">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>2. Gerencie Equipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Acompanhe performance da equipe, distribua tarefas e monitore o progresso de cada membro em tempo real.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover-card">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle>3. Monitore Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Visualize relatórios detalhados, métricas de produtividade e indicadores de qualidade para otimizar processos.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Projeto em Destaque</h2>
                <p className="text-muted-foreground">Acompanhe o progresso do seu projeto principal</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-subtle" />
                Atualizado agora
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FeaturedProject 
                  project={projects[0]} 
                  imageUrl={constructionImages[selectedImage]}
                />
              </div>
              
              <div className="space-y-4">
                <GettingStarted />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Próximas Ações</CardTitle>
                    <CardDescription>Tarefas que requerem sua atenção</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TasksList tasks={recentTasks.slice(0, 3)} compact />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Explore Todas as Funcionalidades</h2>
              <p className="text-muted-foreground">Acesse rapidamente as diferentes seções do sistema</p>
            </div>
            
            <div className="mb-6">
              <FeatureHighlight
                title="💡 Dica: Use o Calendário para Otimizar Produção"
                description="O calendário inteligente ajuda a programar painéis por tipo e otimizar o uso de formas. Reduza até 30% o tempo de produção!"
                ctaText="Ver Calendário"
                ctaLink="/calendar"
              />
            </div>
            
            <NavigationCards />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Index;