import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureHighlightProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  onDismiss?: () => void;
}

const FeatureHighlight = ({ 
  title, 
  description, 
  ctaText, 
  ctaLink, 
  onDismiss 
}: FeatureHighlightProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="font-medium text-sm text-blue-900 dark:text-blue-100">
              {title}
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              {description}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="h-7 text-xs border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
            >
              <Link to={ctaLink} className="flex items-center gap-1">
                {ctaText}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlight;