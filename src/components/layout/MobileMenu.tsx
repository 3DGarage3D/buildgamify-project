
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Trophy,
  CalendarDays,
  BarChart3,
  Boxes,
  FileSpreadsheet,
  LogOut,
  Settings,
  User,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    onOpenChange(false);
  }, [location.pathname, onOpenChange]);

  // Navegação por categorias para o menu lateral
  const navCategories = [
    {
      title: "Principal",
      items: [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Projetos", href: "/projects", icon: Briefcase },
        { name: "Tarefas", href: "/tasks", icon: CheckSquare },
      ]
    },
    {
      title: "Produção",
      items: [
        { name: "Calendário", href: "/calendar", icon: CalendarDays },
        { name: "Estoque", href: "/inventory", icon: Boxes },
      ]
    },
    {
      title: "Gestão",
      items: [
        { name: "Equipe", href: "/team", icon: Users },
        { name: "Classificação", href: "/leaderboard", icon: Trophy },
        { name: "Orçamento", href: "/budget", icon: FileSpreadsheet },
        { name: "Relatórios", href: "/reports", icon: BarChart3 },
      ]
    }
  ];

  // Versão para menu lateral do NavLink
  const SidebarNavLink = ({ item }: { item: { name: string; href: string; icon: React.ElementType } }) => {
    const isActive = location.pathname === item.href;
    return (
      <SheetClose asChild>
        <Link
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "hover:bg-secondary focus-ring",
            isActive 
              ? "bg-secondary/70 text-primary font-medium" 
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.name}</span>
          {item.name === "Tarefas" && (
            <Badge className="ml-auto bg-primary/15 text-primary hover:bg-primary/20 dark:bg-primary/30">12</Badge>
          )}
        </Link>
      </SheetClose>
    );
  };

  // TODO: Substituir por sistema de autenticação real
  const user = {
    name: "Carlos Silva",
    role: "Gerente de Produção",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4"
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 text-left border-b">
            <SheetTitle>Menu Principal</SheetTitle>
            <SheetDescription>
              Acesse todas as funcionalidades do sistema
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
            {navCategories.map((category, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground px-4 mb-1">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <SidebarNavLink key={itemIdx} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <SheetFooter className="mt-auto border-t p-4">
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  <span>Perfil</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configurações</span>
                </Button>
              </div>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
