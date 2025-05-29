import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { LucideIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  route: string;
  visible: boolean;
}
const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  route,
  visible
}: StatCardProps) => {
  return <Link to={route} className="group">
      <Card className={`overflow-hidden group-hover:border-primary/50 transition-all ${visible ? 'animate-scale' : 'opacity-0'} hover:shadow-lg hover:shadow-primary/5`}>
        <div className="flex items-center p-4 h-full bg-slate-50">
          <div className={`${bgColor} p-3 rounded-xl mr-4`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="flex-grow">
            <div className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
              <AnimatedCounter value={value} formatter={val => val.toLocaleString()} duration={1500} />
            </div>
            <p className="text-sm text-zinc-800">
              {title}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>;
};
export default StatsCard;