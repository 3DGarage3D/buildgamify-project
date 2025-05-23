
import StatsCard from "@/components/dashboard/StatsCard";

interface StatsRowProps {
  stats: Array<{
    title: string;
    value: number;
    icon: any;
    color: string;
    bgColor: string;
    route: string;
  }>;
  visibleStats: number[];
}

const StatsRow = ({ stats, visibleStats }: StatsRowProps) => {
  return (
    <section aria-label="Estatísticas do projeto" className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            visible={visibleStats.includes(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsRow;
