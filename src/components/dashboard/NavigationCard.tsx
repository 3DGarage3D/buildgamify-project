
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
        <CardContent className="flex items-start p-3 sm:p-4 h-full min-h-[80px] sm:min-h-[100px]">
          <div className="p-2 sm:p-2.5 rounded-md bg-primary/10 text-primary mr-3 sm:mr-4 flex-shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-sm sm:text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 mt-1 sm:mt-1.5 ml-2 flex-shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default NavigationCard;
