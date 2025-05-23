
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

const StatsCard = ({ title, value, icon: Icon, color, bgColor, route, visible }: StatCardProps) => {
  return (
    <Link to={route} className="group">
      <Card 
        className={`overflow-hidden group-hover:border-primary/50 transition-all ${visible ? 'animate-scale' : 'opacity-0'}`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-md ${bgColor}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">
            <AnimatedCounter 
              value={value} 
              formatter={(val) => val.toLocaleString()} 
              duration={1500} 
            />
          </div>
          <p className="text-muted-foreground text-sm">
            {title}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StatsCard;
