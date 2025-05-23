
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { Calendar } from "lucide-react";

interface DashboardHeaderProps {
  onProjectCreated: (project: any) => void;
}

const DashboardHeader = ({ onProjectCreated }: DashboardHeaderProps) => {
  // Get current date in Portuguese format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <header className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display mb-1">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <p className="text-sm capitalize">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <NewProjectDialog onProjectCreated={onProjectCreated} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
