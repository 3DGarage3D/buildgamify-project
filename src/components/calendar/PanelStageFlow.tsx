
import React from 'react';
import { 
  Pencil, 
  Hammer, 
  Box, 
  Droplets, 
  Clock, 
  Wrench, 
  CheckSquare,
  Warehouse,
  Truck,
  HardHat
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PanelStage, PANEL_STAGE_LABELS } from '@/types/budget';

interface PanelStageFlowProps {
  currentStage: PanelStage;
  onStageClick?: (stage: PanelStage) => void;
}

const stageIcons: Record<PanelStage, React.ReactNode> = {
  'design': <Pencil className="h-5 w-5" />,
  'reinforcement': <Hammer className="h-5 w-5" />,
  'formwork': <Box className="h-5 w-5" />,
  'concrete-pouring': <Droplets className="h-5 w-5" />,
  'curing': <Clock className="h-5 w-5" />,
  'demolding': <Wrench className="h-5 w-5" />,
  'finishing': <Wrench className="h-5 w-5" />,
  'quality-control': <CheckSquare className="h-5 w-5" />,
  'storage': <Warehouse className="h-5 w-5" />,
  'delivery': <Truck className="h-5 w-5" />,
  'installation': <HardHat className="h-5 w-5" />
};

const stageOrder: PanelStage[] = [
  'design',
  'reinforcement',
  'formwork',
  'concrete-pouring',
  'curing',
  'demolding',
  'finishing',
  'quality-control',
  'storage',
  'delivery',
  'installation'
];

const PanelStageFlow: React.FC<PanelStageFlowProps> = ({ 
  currentStage, 
  onStageClick 
}) => {
  const currentStageIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max py-4">
        <div className="flex items-center">
          {stageOrder.map((stage, index) => {
            const isPast = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isFuture = index > currentStageIndex;
            
            return (
              <React.Fragment key={stage}>
                <div 
                  className={`
                    flex flex-col items-center cursor-pointer transition-colors
                    ${onStageClick ? 'hover:text-primary' : ''}
                    ${isCurrent ? 'text-primary' : isPast ? 'text-muted-foreground' : 'text-muted-foreground/50'}
                  `}
                  onClick={() => onStageClick?.(stage)}
                >
                  <div 
                    className={`
                      flex items-center justify-center w-12 h-12 rounded-full border-2
                      ${isCurrent ? 'border-primary bg-primary/10' : 
                        isPast ? 'border-muted-foreground/50 bg-muted-foreground/10' : 
                        'border-muted-foreground/30 bg-transparent'}
                    `}
                  >
                    {stageIcons[stage]}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[80px]">
                    {PANEL_STAGE_LABELS[stage]}
                  </span>
                  {isCurrent && (
                    <Badge className="mt-1 text-[10px] h-5 bg-primary/20 hover:bg-primary/30 text-primary border-primary/20">
                      Atual
                    </Badge>
                  )}
                </div>
                
                {index < stageOrder.length - 1 && (
                  <div 
                    className={`
                      w-8 h-[2px] mx-1
                      ${index < currentStageIndex ? 'bg-muted-foreground/50' : 'bg-muted-foreground/20'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PanelStageFlow;
