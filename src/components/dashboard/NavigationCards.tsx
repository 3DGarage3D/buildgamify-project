
import NavigationCard from "@/components/dashboard/NavigationCard";
import { dashboardLinks } from "@/data/dashboardData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Workflow, QrCode } from "lucide-react";

const NavigationCards = () => {
  return (
    <section aria-label="Navegação rápida" className="py-2">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold font-display px-1 text-gray-900 dark:text-gray-100">
          Acesso Rápido
        </h2>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:flex bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <Link to="/qr-rfid" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR & RFID
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden sm:flex bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <Link to="/production-flow" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Fluxo de Produção
            </Link>
          </Button>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Explore as funcionalidades</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {dashboardLinks.map((link, index) => (
          <NavigationCard
            key={link.name}
            {...link}
            priority={index < 3} // Primeiros 3 cards com prioridade visual
          />
        ))}
      </div>
    </section>
  );
};

export default NavigationCards;
