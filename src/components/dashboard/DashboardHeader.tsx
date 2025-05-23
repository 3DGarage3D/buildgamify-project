
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/project/NewProjectDialog";

interface DashboardHeaderProps {
  onProjectCreated: (project: any) => void;
}

const DashboardHeader = ({ onProjectCreated }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <NewProjectDialog onProjectCreated={onProjectCreated} />
      </div>
    </div>
  );
};

export default DashboardHeader;
