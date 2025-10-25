import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ManualSubsection } from "@/data/manualContent";
import { AlertTriangle, CheckCircle, Lightbulb, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ManualSectionProps {
  subsection: ManualSubsection;
}

export const ManualSection = ({ subsection }: ManualSectionProps) => {
  return (
    <Card id={subsection.id} className="scroll-mt-20">
      <CardHeader>
        <CardTitle className="text-xl">{subsection.title}</CardTitle>
        <CardDescription className="text-base">{subsection.content}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subsection.steps && subsection.steps.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Passos:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 ml-2">
              {subsection.steps.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">{step}</li>
              ))}
            </ol>
          </div>
        )}
        
        {subsection.tips && subsection.tips.length > 0 && (
          <Alert className="border-primary/20 bg-primary/5">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold text-sm">Dicas:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {subsection.tips.map((tip, index) => (
                    <li key={index} className="text-sm">{tip}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {subsection.warnings && subsection.warnings.length > 0 && (
          <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold text-sm">Atenção:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {subsection.warnings.map((warning, index) => (
                    <li key={index} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {subsection.relatedLinks && subsection.relatedLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm font-semibold flex items-center gap-1">
              <LinkIcon className="h-3 w-3" />
              Links relacionados:
            </span>
            {subsection.relatedLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                  {link.label}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
