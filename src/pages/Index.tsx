
import { useState, useEffect } from "react";
import { useStaggeredAnimation } from "@/utils/animation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsRow from "@/components/dashboard/StatsRow";
import FeaturedProject from "@/components/dashboard/FeaturedProject";
import DashboardSidePanels from "@/components/dashboard/DashboardSidePanels";
import NavigationCards from "@/components/dashboard/NavigationCards";
import TasksList from "@/components/dashboard/TasksList";
import GamefiedSection from "@/components/dashboard/GamefiedSection";
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
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <DashboardHeader onProjectCreated={handleProjectCreated} />
      
      {/* Gamified Progress Section - Top Priority */}
      <GamefiedSection />
      
      {/* Stats Section - Key Metrics */}
      <StatsRow stats={stats} visibleStats={visibleStats} />
      
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
