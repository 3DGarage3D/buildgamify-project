
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <FileQuestion className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-display">Página não encontrada</h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Não foi possível encontrar a página que você está procurando.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-5 w-5" />
              <span>Voltar ao Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
