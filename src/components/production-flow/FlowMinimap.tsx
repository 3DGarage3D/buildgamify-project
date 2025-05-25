
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductionStageData } from '@/types/productionFlow';

interface FlowMinimapProps {
  stages: ProductionStageData[];
  currentStage: number;
  onStageClick: (index: number) => void;
}

const FlowMinimap: React.FC<FlowMinimapProps> = ({ stages, currentStage, onStageClick }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-slate-300 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-700">
          Navegação Rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stages.map((stage, index) => {
          const isPast = index < currentStage;
          const isCurrent = index === currentStage;
          const isFuture = index > currentStage;
          
          return (
            <button
              key={stage.id}
              onClick={() => onStageClick(index)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all duration-300 hover:scale-105
                ${isCurrent 
                  ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500 ring-opacity-20' 
                  : isPast 
                    ? 'bg-green-50 border-green-300 hover:bg-green-100' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <stage.icon className={`h-4 w-4 ${
                    isCurrent ? 'text-blue-600' : isPast ? 'text-green-600' : 'text-slate-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    isCurrent ? 'text-blue-700' : isPast ? 'text-green-700' : 'text-slate-500'
                  }`}>
                    ETAPA {stage.id}
                  </span>
                </div>
                
                {isCurrent && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5">
                    Atual
                  </Badge>
                )}
                {isPast && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
              
              <h4 className={`text-sm font-medium leading-tight ${
                isCurrent ? 'text-blue-800' : isPast ? 'text-green-800' : 'text-slate-600'
              }`}>
                {stage.title}
              </h4>
              
              <p className={`text-xs mt-1 leading-tight ${
                isCurrent ? 'text-blue-600' : isPast ? 'text-green-600' : 'text-slate-400'
              }`}>
                {stage.duration} • {stage.team}
              </p>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default FlowMinimap;
