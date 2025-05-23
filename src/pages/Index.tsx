
import { useState, useEffect } from "react";
import { useStaggeredAnimation } from "@/utils/animation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import FeaturedProject from "@/components/dashboard/FeaturedProject";
import AlertsCard from "@/components/dashboard/AlertsCard";
import MetricsCard from "@/components/dashboard/MetricsCard";
import NavigationCard from "@/components/dashboard/NavigationCard";
import TasksList from "@/components/dashboard/TasksList";
import { 
  stats, 
  featuredProjects, 
  recentTasks, 
  constructionImages,
  dashboardLinks
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
    <div className="space-y-8">
      <DashboardHeader onProjectCreated={handleProjectCreated} />
      
      {/* Featured Project with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeaturedProject 
            project={projects[0]} 
            imageUrl={constructionImages[selectedImage]}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <AlertsCard />
          <MetricsCard />
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            visible={visibleStats.includes(index)}
          />
        ))}
      </div>
      
      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardLinks.map((link) => (
          <NavigationCard
            key={link.name}
            {...link}
          />
        ))}
      </div>
      
      {/* Tasks Section */}
      <TasksList tasks={recentTasks} />
    </div>
  );
};

export default Index;
