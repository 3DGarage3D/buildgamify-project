
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Zap,
  Info
} from 'lucide-react';
import { ProductionStageData } from '@/types/productionFlow';

interface ProductionStageProps {
  stage: ProductionStageData;
  isActive: boolean;
  onLinkClick: (link: string) => void;
  zoomLevel: number;
}

const ProductionStage: React.FC<ProductionStageProps> = ({ 
  stage, 
  isActive, 
  onLinkClick,
  zoomLevel 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      default:
        return <Info className="h-5 w-5 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      case 'pending':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800';
      default:
        return 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800';
    }
  };

  return (
    <div 
      className={`
        transition-all duration-700 ease-out
        ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
        ${isHovered ? 'scale-105' : ''}
      `}
      style={{ transform: `scale(${zoomLevel})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`
        w-full max-w-4xl mx-auto overflow-hidden shadow-xl
        ${getStatusColor(stage.status)}
        border-2 transition-all duration-300
        ${isHovered ? 'shadow-2xl' : ''}
      `}>
        {/* Header com ícone e título */}
        <CardHeader className="relative pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`
                p-4 rounded-xl bg-white shadow-md transition-all duration-300
                ${isHovered ? 'scale-110 rotate-3' : ''}
              `}>
                <stage.icon className="h-8 w-8 text-blue-600" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs font-medium">
                    ETAPA {stage.id}
                  </Badge>
                  {getStatusIcon(stage.status)}
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {stage.title}
                </CardTitle>
              </div>
            </div>

            {/* Status badge */}
            <Badge className={`
              px-3 py-1 text-sm font-medium
              ${stage.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
              ${stage.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
              ${stage.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-300' : ''}
            `}>
              {stage.status === 'completed' && 'Concluída'}
              {stage.status === 'in-progress' && 'Em Andamento'}
              {stage.status === 'pending' && 'Pendente'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Descrição */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {stage.description}
          </p>

          {/* Detalhes técnicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                Processos Principais
              </h4>
              <ul className="space-y-2">
                {stage.processes.map((process, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    {process}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                Informações Técnicas
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Duração média</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{stage.duration}</div>
                </div>
                <div className="bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Responsável</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{stage.team}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {stage.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>

          {/* Ações e links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {stage.links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onLinkClick(link.href)}
                className="group hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2 group-hover:text-blue-600" />
                {link.label}
              </Button>
            ))}
          </div>

          {/* Visualização 3D placeholder */}
          {stage.has3DView && (
            <div className="mt-6 p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <stage.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Visualização 3D interativa disponível
                </p>
                <Button variant="outline" size="sm" className="hover:bg-blue-50">
                  <Zap className="h-4 w-4 mr-2" />
                  Visualizar em 3D
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionStage;
