
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const { user, signOut, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Fetch profile name
      const fetchProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();
        
        if (data?.full_name) {
          setProfileName(data.full_name);
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Don't show navbar on auth page
  if (location.pathname === "/auth") {
    return null;
  }

  // Don't show navbar if not authenticated
  if (!user) {
    return null;
  }

  const getRoleLabel = (role: string | null) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "financeiro":
        return "Financeiro";
      case "operacional":
        return "Operacional";
      default:
        return "Usuário";
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="md:ml-0"
            aria-label="Menu principal"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/58b8e536-401c-4bd9-9fad-452ff0b1adea.png" 
              alt="DP PAINELIZAÇÃO Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="font-display font-semibold tracking-tight text-sm md:text-base">
              DP <span className="text-primary">PAINELIZAÇÃO</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
                <span className="sr-only">Notificações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {[1, 2, 3].map((item) => (
                  <DropdownMenuItem key={item} className="flex flex-col items-start py-2 cursor-pointer">
                    <div className="font-medium">Nova tarefa atribuída</div>
                    <div className="text-sm text-muted-foreground">Revisão estrutural - Residencial Villa Moderna</div>
                    <div className="text-xs text-muted-foreground mt-1">Há 30 minutos</div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center font-medium">
                Ver todas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Avatar à direita */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
                <AvatarFallback>{getInitials(profileName)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{profileName || user.email}</span>
                  <span className="text-xs text-muted-foreground">{getRoleLabel(userRole)}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </header>
  );
};

export default Navbar;
