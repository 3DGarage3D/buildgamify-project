import { Clock, AlertTriangle, Settings, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PainelProducao } from '@/types/iot';
import { SensorGrid } from './SensorCard';

interface PainelCardProps {
  painel: PainelProducao;
  onStatusChange?: (painelId: string, novoStatus: PainelProducao['statusAtual']) => void;
  onViewDetails?: (painelId: string) => void;
  className?: string;
}

const PainelCard = ({ painel, onStatusChange, onViewDetails, className }: PainelCardProps) => {
  const getStatusColor = (status: PainelProducao['statusAtual']) => {
    switch (status) {
      case 'Em Preparação':
        return 'bg-gray-100 text-gray-800';
      case 'Em Cura':
        return 'bg-blue-100 text-blue-800';
      case 'Aguardando Desmolde':
        return 'bg-orange-100 text-orange-800';
      case 'Em Desmolde':
        return 'bg-orange-100 text-orange-800';
      case 'Controle de Qualidade':
        return 'bg-purple-100 text-purple-800';
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Rejeitado':
        return 'bg-red-100 text-red-800';
      case 'Em Armazenamento':
        return 'bg-indigo-100 text-indigo-800';
      case 'Transportando':
        return 'bg-teal-100 text-teal-800';
      case 'Instalado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: PainelProducao['statusAtual']): PainelProducao['statusAtual'] | null => {
    const statusFlow: Record<PainelProducao['statusAtual'], PainelProducao['statusAtual'] | null> = {
      'Em Preparação': 'Em Cura',
      'Em Cura': 'Aguardando Desmolde',
      'Aguardando Desmolde': 'Em Desmolde',
      'Em Desmolde': 'Controle de Qualidade',
      'Controle de Qualidade': 'Aprovado',
      'Aprovado': 'Em Armazenamento',
      'Rejeitado': null,
      'Em Armazenamento': 'Transportando',
      'Transportando': 'Instalado',
      'Instalado': null
    };
    
    return statusFlow[currentStatus];
  };

  const alertasAtivos = painel.alertas.filter(alert => !alert.resolvido);
  const tempoDesdeInicio = painel.dataCriacao 
    ? Math.floor((Date.now() - painel.dataCriacao.getTime()) / (1000 * 60 * 60)) 
    : 0;

  const nextStatus = getNextStatus(painel.statusAtual);

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              {painel.id}
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {painel.tipo}
            </div>
          </div>
          <Badge className={getStatusColor(painel.statusAtual)}>
            {painel.statusAtual}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Alertas */}
        {alertasAtivos.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">
              {alertasAtivos.length} alerta{alertasAtivos.length > 1 ? 's' : ''} ativo{alertasAtivos.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Sensores - apenas se há leitura recente */}
        {painel.ultimaLeitura && (
          <div>
            <h4 className="text-sm font-medium mb-2">Sensores</h4>
            <SensorGrid reading={painel.ultimaLeitura} />
          </div>
        )}

        {/* Informações temporais */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {tempoDesdeInicio}h em produção
          </div>
          {painel.ultimaLeitura && (
            <div>
              Última leitura: {new Date(painel.ultimaLeitura.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(painel.id)}
            className="flex-1"
          >
            <Settings className="h-4 w-4 mr-1" />
            Detalhes
          </Button>
          
          {nextStatus && onStatusChange && (
            <Button
              size="sm"
              onClick={() => onStatusChange(painel.id, nextStatus)}
              className="flex-1"
            >
              Avançar para {nextStatus}
            </Button>
          )}
        </div>

        {/* QR Code e NFC Info */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          <div>QR: {painel.qrCode}</div>
          <div>NFC: {painel.nfcId}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PainelCard;