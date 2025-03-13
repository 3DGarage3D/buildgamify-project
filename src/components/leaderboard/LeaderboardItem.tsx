
import { Trophy, Star, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface LeaderboardItemProps {
  player: {
    id: string;
    rank: number;
    previousRank: number;
    name: string;
    avatar?: string;
    level: number;
    points: number;
    streak: number;
    badges: number;
  };
  className?: string;
  index: number;
  showAnimation?: boolean;
}

const LeaderboardItem = ({ 
  player, 
  className, 
  index,
  showAnimation = true
}: LeaderboardItemProps) => {
  const rankChange = player.previousRank - player.rank;
  
  // Generate initials from name
  const initials = player.name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  const getRankChangeElement = () => {
    if (rankChange > 0) {
      return (
        <div className="flex items-center text-emerald-500 gap-0.5 text-xs font-medium">
          <ArrowUp className="h-3 w-3" />
          <span>{rankChange}</span>
        </div>
      );
    } else if (rankChange < 0) {
      return (
        <div className="flex items-center text-destructive gap-0.5 text-xs font-medium">
          <ArrowDown className="h-3 w-3" />
          <span>{Math.abs(rankChange)}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-muted-foreground gap-0.5 text-xs">
          <Minus className="h-3 w-3" />
        </div>
      );
    }
  };
  
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-amber-400 text-amber-950";
      case 2:
        return "bg-slate-300 text-slate-950";
      case 3:
        return "bg-amber-700 text-amber-50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <div 
      className={cn(
        "group relative rounded-lg border bg-card p-4 transition-all duration-200",
        "hover:bg-accent/5",
        index < 3 && "border-primary/20",
        showAnimation && "animate-slide-up",
        className
      )}
      style={{ 
        animationDelay: showAnimation ? `${index * 100}ms` : '0ms'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full font-semibold text-sm",
            getMedalColor(player.rank)
          )}>
            {player.rank}
          </div>
          
          <Avatar className="h-10 w-10 border border-primary/10">
            <AvatarImage src={player.avatar} alt={player.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">
                {player.name}
              </h3>
              
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-xs font-medium text-primary">
                {player.level}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400" />
                <span>streak {player.streak} dias</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-primary" />
                <span>{player.badges} conquistas</span>
              </div>
              
              {getRankChangeElement()}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-display font-semibold text-primary">
            <AnimatedCounter 
              value={player.points} 
              formatter={(val) => val.toLocaleString()}
              duration={1500} 
            />
          </div>
          <div className="text-xs text-muted-foreground">pontos</div>
        </div>
      </div>
      
      {/* Rank indicator line */}
      {index < 3 && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/5 via-primary/30 to-primary/5" />
      )}
    </div>
  );
};

export default LeaderboardItem;
