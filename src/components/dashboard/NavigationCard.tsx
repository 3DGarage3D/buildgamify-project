
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NavigationCardProps {
  name: string;
  icon: LucideIcon;
  href: string;
  description: string;
}

const NavigationCard = ({ name, icon: Icon, href, description }: NavigationCardProps) => {
  return (
    <Link to={href} className="group">
      <Card className="h-full hover-card overflow-hidden border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
        <CardContent className="flex items-start p-4 h-full">
          <div className="p-2.5 rounded-md bg-primary/10 text-primary mr-4">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 mt-1.5 ml-2" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default NavigationCard;
