
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
      <Card className="h-full hover-card overflow-hidden border border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NavigationCard;
