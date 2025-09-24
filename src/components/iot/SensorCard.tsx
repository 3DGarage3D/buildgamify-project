import { Thermometer, Droplets, RotateCcw, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SensorReading } from '@/types/iot';
import { IOT_CONFIG_DEFAULT } from '@/types/iot';

interface SensorCardProps {
  reading?: SensorReading;
  type: 'temperatura' | 'umidade' | 'inclinacao' | 'vibração';
  title: string;
  unit: string;
  icon: React.ReactNode;
  className?: string;
}

const SensorCard = ({ reading, type, title, unit, icon, className }: SensorCardProps) => {
  const getValue = () => {
    if (!reading) return '--';
    
    switch (type) {
      case 'temperatura':
        return reading.temperatura;
      case 'umidade':
        return reading.umidade;
      case 'inclinacao':
        return reading.inclinacao;
      case 'vibração':
        return reading.vibração || 0;
      default:
        return '--';
    }
  };

  const getStatus = () => {
    if (!reading) return 'offline';
    
    const value = getValue() as number;
    const config = IOT_CONFIG_DEFAULT.limites;
    
    switch (type) {
      case 'temperatura':
        if (value >= config.temperatura.ideal.min && value <= config.temperatura.ideal.max) return 'ideal';
        if (value >= config.temperatura.min && value <= config.temperatura.max) return 'normal';
        return 'alert';
      
      case 'umidade':
        if (value >= config.umidade.ideal.min && value <= config.umidade.ideal.max) return 'ideal';
        if (value >= config.umidade.min && value <= config.umidade.max) return 'normal';
        return 'alert';
      
      case 'inclinacao':
        if (value <= config.inclinacao.warning) return 'normal';
        if (value <= config.inclinacao.max) return 'warning';
        return 'alert';
      
      case 'vibração':
        if (value <= config.vibração.warning) return 'normal';
        if (value <= config.vibração.max) return 'warning';
        return 'alert';
      
      default:
        return 'normal';
    }
  };

  const status = getStatus();
  const value = getValue();

  const getStatusColor = () => {
    switch (status) {
      case 'ideal':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'normal':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800';
      case 'alert':
        return 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
      case 'offline':
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800';
      default:
        return '';
    }
  };

  const getValueColor = () => {
    switch (status) {
      case 'ideal':
        return 'text-green-600 dark:text-green-400';
      case 'normal':
        return 'text-blue-600 dark:text-blue-400';
      case 'warning':
        return 'text-orange-600 dark:text-orange-400';
      case 'alert':
        return 'text-red-600 dark:text-red-400';
      case 'offline':
        return 'text-gray-400 dark:text-gray-500';
      default:
        return '';
    }
  };

  const getBadgeVariant = () => {
    switch (status) {
      case 'ideal':
        return 'default';
      case 'normal':
        return 'secondary';
      case 'warning':
        return 'outline';
      case 'alert':
        return 'destructive';
      case 'offline':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'ideal':
        return 'Ideal';
      case 'normal':
        return 'Normal';
      case 'warning':
        return 'Atenção';
      case 'alert':
        return 'Alerta';
      case 'offline':
        return 'Offline';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card className={`${getStatusColor()} transition-all duration-200 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
          <Badge variant={getBadgeVariant()} className="text-xs">
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className={`text-2xl font-bold ${getValueColor()}`}>
            {value}
            <span className="text-sm font-normal ml-1">{unit}</span>
          </div>
          {reading && (
            <div className="text-xs text-muted-foreground">
              {new Date(reading.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
        {!reading && (
          <div className="text-xs text-muted-foreground mt-1">
            Aguardando dados...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SensorGridProps {
  reading?: SensorReading;
  className?: string;
}

export const SensorGrid = ({ reading, className }: SensorGridProps) => {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <SensorCard
        reading={reading}
        type="temperatura"
        title="Temperatura"
        unit="°C"
        icon={<Thermometer className="h-4 w-4" />}
      />
      <SensorCard
        reading={reading}
        type="umidade"
        title="Umidade"
        unit="%"
        icon={<Droplets className="h-4 w-4" />}
      />
      <SensorCard
        reading={reading}
        type="inclinacao"
        title="Inclinação"
        unit="°"
        icon={<RotateCcw className="h-4 w-4" />}
      />
      <SensorCard
        reading={reading}
        type="vibração"
        title="Vibração"
        unit="Hz"
        icon={<Zap className="h-4 w-4" />}
      />
    </div>
  );
};

export default SensorCard;