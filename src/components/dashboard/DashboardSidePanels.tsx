
import AlertsCard from "@/components/dashboard/AlertsCard";
import MetricsCard from "@/components/dashboard/MetricsCard";

const DashboardSidePanels = () => {
  return (
    <div className="space-y-4 sm:space-y-6 h-full flex flex-col">
      <AlertsCard />
      <MetricsCard className="flex-grow" />
    </div>
  );
};

export default DashboardSidePanels;
