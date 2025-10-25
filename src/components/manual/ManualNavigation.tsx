import { manualSections } from "@/data/manualContent";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ManualNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const ManualNavigation = ({ activeSection, onSectionClick }: ManualNavigationProps) => {
  const getPermissionBadge = (level?: string) => {
    if (!level || level === "all") return null;
    
    if (level === "admin") {
      return <Badge variant="destructive" className="text-xs">Admin</Badge>;
    }
    if (level === "admin-financeiro") {
      return <Badge variant="default" className="text-xs bg-yellow-500">Admin/Fin</Badge>;
    }
    return null;
  };

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <nav className="space-y-1 pr-4">
        {manualSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0",
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
              )} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">{section.title}</span>
                  {getPermissionBadge(section.permissionLevel)}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </ScrollArea>
  );
};
