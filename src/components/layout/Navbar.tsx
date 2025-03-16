
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Trophy,
  Menu,
  X,
  CalendarDays,
  BarChart3,
  Boxes,
  FileSpreadsheet,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projetos", href: "/projects", icon: Briefcase },
    { name: "Tarefas", href: "/tasks", icon: CheckSquare },
    { name: "Equipe", href: "/team", icon: Users },
    { name: "Classificação", href: "/leaderboard", icon: Trophy },
    { name: "Calendário", href: "/calendar", icon: CalendarDays },
    { name: "Estoque", href: "/inventory", icon: Boxes },
    { name: "Orçamento", href: "/budget", icon: FileSpreadsheet },
    { name: "Relatórios", href: "/reports", icon: BarChart3 },
  ];

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

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
          "hover:bg-secondary focus-ring",
          isActive 
            ? "text-primary font-medium" 
            : "text-foreground/70 hover:text-foreground"
        )}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.name}</span>
      </Link>
    );
  };

  // Versão para menu lateral do NavLink
  const SidebarNavLink = ({ item, onClose }: { item: typeof navItems[0], onClose?: () => void }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        onClick={onClose}
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
    );
  };

  // TODO: Substituir por sistema de autenticação real
  const user = {
    name: "Carlos Silva",
    role: "Gerente de Produção",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4"
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/58b8e536-401c-4bd9-9fad-452ff0b1adea.png" 
              alt="DP PAINELIZAÇÃO Logo" 
              className="w-10 h-10"
            />
            <span className="font-display font-semibold tracking-tight">
              DP <span className="text-primary">PAINELIZAÇÃO</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation - agora escondido em favor do menu lateral */}
        {!isMobile ? (
          <div className="flex items-center gap-3">
            {/* Menu lateral em Sheet para desktop */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:w-80">
                <SheetHeader className="text-left">
                  <SheetTitle>Menu de Navegação</SheetTitle>
                  <SheetDescription>
                    Acesse todas as funcionalidades do sistema
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col gap-1 mt-6">
                  {navCategories.map((category, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground px-4 mb-1">
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIdx) => (
                          <SidebarNavLink 
                            key={itemIdx} 
                            item={item} 
                            onClose={() => document.body.click()} // Hack para fechar o Sheet
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <SheetFooter className="mt-auto">
                  <div className="mt-6 space-y-3">
                    <Separator />
                    <div className="flex items-center gap-3 p-3">
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
                    <div className="flex items-center gap-2 px-2">
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
              </SheetContent>
            </Sheet>
            
            {/* Avatar à direita */}
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          // Mobile drawer menu
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex flex-col gap-1 mt-2">
                  {navCategories.map((category, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground px-4 mb-1">
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIdx) => (
                          <SidebarNavLink 
                            key={itemIdx} 
                            item={item} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Navbar;
