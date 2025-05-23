
import { useState, useEffect } from "react";
import { useStaggeredAnimation } from "@/utils/animation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsRow from "@/components/dashboard/StatsRow";
import FeaturedProject from "@/components/dashboard/FeaturedProject";
import DashboardSidePanels from "@/components/dashboard/DashboardSidePanels";
import NavigationCards from "@/components/dashboard/NavigationCards";
import TasksList from "@/components/dashboard/TasksList";
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
    <div className="space-y-6">
      <DashboardHeader onProjectCreated={handleProjectCreated} />
      
      {/* Hero Section with Featured Project */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
        <div className="lg:col-span-2">
          <FeaturedProject 
            project={projects[0]} 
            imageUrl={constructionImages[selectedImage]}
          />
        </div>
        
        <div className="lg:col-span-1">
          <DashboardSidePanels />
        </div>
      </div>
      
      {/* Stats Section */}
      <StatsRow stats={stats} visibleStats={visibleStats} />
      
      {/* Navigation Cards */}
      <NavigationCards />
      
      {/* Tasks Section */}
      <TasksList tasks={recentTasks} />
    </div>
  );
};

export default Index;
