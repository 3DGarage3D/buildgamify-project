
import { useState, useEffect } from "react";
import { useStaggeredAnimation } from "@/utils/animation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsRow from "@/components/dashboard/StatsRow";
import FeaturedProject from "@/components/dashboard/FeaturedProject";
import DashboardSidePanels from "@/components/dashboard/DashboardSidePanels";
import NavigationCards from "@/components/dashboard/NavigationCards";
import TasksList from "@/components/dashboard/TasksList";
import GamefiedSection from "@/components/dashboard/GamefiedSection";
import ProductionFlowViewer from "@/components/production-flow/ProductionFlowViewer";
import { 
  stats, 
  featuredProjects, 
  recentTasks, 
  constructionImages,
} from "@/data/dashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <DashboardHeader onProjectCreated={handleProjectCreated} />
      
      {/* Gamified Progress Section - Top Priority */}
      <GamefiedSection />
      
      {/* Stats Section - Key Metrics */}
      <StatsRow stats={stats} visibleStats={visibleStats} />
      
      {/* Production Flow Highlight */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <Workflow className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Fluxo de Produção Central
            </CardTitle>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/qr-rfid" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR & RFID
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/production-flow">
                  Ver Completo
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <ProductionFlowViewer />
          </div>
        </CardContent>
      </Card>
      
      {/* Hero Section with Featured Project */}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 mb-4">
        <div className="lg:col-span-2 order-1">
          <FeaturedProject 
            project={projects[0]} 
            imageUrl={constructionImages[selectedImage]}
          />
        </div>
        
        <div className="lg:col-span-1 order-2">
          <DashboardSidePanels />
        </div>
      </div>
      
      {/* Quick Actions and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <NavigationCards />
        <TasksList tasks={recentTasks} />
      </div>
    </div>
  );
};

export default Index;
