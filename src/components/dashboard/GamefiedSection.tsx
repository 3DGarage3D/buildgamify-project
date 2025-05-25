
import { Trophy, Star, Target, Zap, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const GamefiedSection = () => {
  const userLevel = 12;
  const currentXP = 2840;
  const nextLevelXP = 3000;
  const weeklyGoal = 85;
  const weeklyProgress = 68;
  
  const achievements = [
    { icon: Trophy, name: "Meta Semanal", completed: true, color: "text-yellow-500" },
    { icon: Star, name: "Eficiência", completed: true, color: "text-blue-500" },
    { icon: Target, name: "Precisão", completed: false, color: "text-gray-400" },
    { icon: Zap, name: "Velocidade", completed: true, color: "text-green-500" },
  ];

  const progressPercentage = (currentXP / nextLevelXP) * 100;
  const weeklyProgressPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Seu Nível
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
              Nível {userLevel}
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter value={currentXP} duration={1500} />
              </div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso para o próximo nível</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {nextLevelXP - currentXP} XP restantes
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-200/50 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Meta Semanal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              <AnimatedCounter value={weeklyProgress} duration={1500} />%
            </div>
            <div className="text-sm text-muted-foreground">
              de {weeklyGoal}% da meta atingida
            </div>
          </div>
          <Progress value={weeklyProgressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Início da semana</span>
            <span>Meta: {weeklyGoal}%</span>
          </div>
          {weeklyProgressPercentage >= 80 && (
            <Badge className="w-full justify-center bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              🔥 Quase lá! Continue assim!
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100/50 dark:from-amber-950/20 dark:to-orange-900/10 border-amber-200/50 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-600" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    achievement.completed
                      ? 'bg-white/70 dark:bg-gray-800/50 shadow-sm scale-105'
                      : 'bg-gray-100/50 dark:bg-gray-900/30 opacity-60'
                  }`}
                >
                  <Icon className={`h-6 w-6 mb-1 ${achievement.color}`} />
                  <span className="text-xs font-medium text-center leading-tight">
                    {achievement.name}
                  </span>
                  {achievement.completed && (
                    <div className="text-xs text-green-600 mt-1">✓</div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center">
            <Badge variant="outline" className="text-xs">
              3 de 4 conquistas desbloqueadas
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamefiedSection;
