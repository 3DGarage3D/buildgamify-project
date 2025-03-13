
import { useState } from "react";
import { BarChart, MessageSquare, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface TeamMemberProps {
  member: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    level: number;
    points: number;
    projects: number;
    completedTasks: number;
  };
  className?: string;
}

const TeamMember = ({ member, className }: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate initials from name
  const initials = member.name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  return (
    <div 
      className={cn(
        "relative group rounded-xl border bg-card p-5 hover-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10 ring-4 ring-primary/5">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-medium tracking-tight">
              {member.name}
            </h3>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-xs font-medium text-primary">
                {member.level}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">{member.role}</p>
          
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-amber-400" /> 
              <AnimatedCounter 
                value={member.points} 
                className="font-medium text-foreground"
              /> pontos
            </div>
            
            <div className="flex items-center gap-1">
              <BarChart className="h-3.5 w-3.5 text-primary" /> 
              <AnimatedCounter 
                value={member.projects} 
                className="font-medium text-foreground"
              /> projetos
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-emerald-500" /> 
              <AnimatedCounter 
                value={member.completedTasks} 
                className="font-medium text-foreground"
              /> tarefas
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover action */}
      <div 
        className={cn(
          "absolute right-4 top-4 rounded-full p-2 bg-secondary text-foreground transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        <MessageSquare className="h-4 w-4" />
      </div>
      
      {/* Level progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-muted">
        <div 
          className="h-full bg-primary/70 transition-all duration-700 ease-out"
          style={{ width: `${(member.points % 100) / 100 * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TeamMember;
