
import NavigationCard from "@/components/dashboard/NavigationCard";
import { dashboardLinks } from "@/data/dashboardData";

const NavigationCards = () => {
  return (
    <section aria-label="Navegação rápida" className="py-2">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold font-display px-1">Acesso Rápido</h2>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Explore as funcionalidades</span>
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
