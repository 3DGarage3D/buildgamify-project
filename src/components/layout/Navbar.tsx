
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
  FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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

        {/* Desktop navigation */}
        {!isMobile ? (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        ) : (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-secondary focus-ring"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-background/95 z-50 pt-16 animate-fade-in">
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
