
import NavigationCard from "@/components/dashboard/NavigationCard";
import { dashboardLinks } from "@/data/dashboardData";

const NavigationCards = () => {
  return (
    <section aria-label="Navegação rápida" className="py-2">
      <h2 className="text-xl font-semibold mb-4 font-display">Acesso Rápido</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardLinks.map((link) => (
          <NavigationCard
            key={link.name}
            {...link}
          />
        ))}
      </div>
    </section>
  );
};

export default NavigationCards;
