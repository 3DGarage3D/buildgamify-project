import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Thermometer, Droplets, RotateCcw, Zap, Shield, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PainelAlert } from '@/types/iot';

interface AlertsPanelProps {
  alerts: PainelAlert[];
  onResolveAlert?: (painelId: string, alertId: string, resolvidoPor: string) => void;
  className?: string;
}

const AlertsPanel = ({ alerts, onResolveAlert, className }: AlertsPanelProps) => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const alertasAtivos = alerts.filter(alert => !alert.resolvido);
  const alertasResolvidos = alerts.filter(alert => alert.resolvido);

  const getAlertIcon = (tipo: PainelAlert['tipo']) => {
    switch (tipo) {
      case 'temperatura':
        return <Thermometer className="h-4 w-4" />;
      case 'umidade':
        return <Droplets className="h-4 w-4" />;
      case 'inclinacao':
        return <RotateCcw className="h-4 w-4" />;
      case 'vibração':
        return <Zap className="h-4 w-4" />;
      case 'qualidade':
        return <Shield className="h-4 w-4" />;
      case 'tempo':
        return <Timer className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severidade: PainelAlert['severidade']) => {
    switch (severidade) {
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'critical':
        return 'bg-red-200 text-red-900 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severidade: PainelAlert['severidade']) => {
    switch (severidade) {
      case 'info':
        return 'Info';
      case 'warning':
        return 'Atenção';
      case 'error':
        return 'Erro';
      case 'critical':
        return 'Crítico';
      default:
        return 'Desconhecido';
    }
  };

  const handleResolveAlert = (alert: PainelAlert) => {
    // Em uma implementação real, você pegaria o ID do usuário autenticado
    const resolvidoPor = 'Operador Sistema';
    onResolveAlert?.(alert.id, alert.id, resolvidoPor);
  };

  const AlertCard = ({ alert, showActions = true }: { alert: PainelAlert; showActions?: boolean }) => (
    <Card className={`transition-all duration-200 ${selectedAlert === alert.id ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getAlertIcon(alert.tipo)}
            <div>
              <CardTitle className="text-sm font-medium">
                {alert.mensagem}
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(alert.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          <Badge className={getSeverityColor(alert.severidade)}>
            {getSeverityText(alert.severidade)}
          </Badge>
        </div>
      </CardHeader>
      
      {(showActions || alert.resolvido) && (
        <CardContent className="pt-0">
          {alert.resolvido ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>
                Resolvido por {alert.resolvidoPor} em{' '}
                {alert.resolvidoEm && new Date(alert.resolvidoEm).toLocaleString()}
              </span>
            </div>
          ) : showActions ? (
            <Button
              size="sm"
              onClick={() => handleResolveAlert(alert)}
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Marcar como Resolvido
            </Button>
          ) : null}
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className={className}>
      <Tabs defaultValue="ativos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ativos" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Ativos ({alertasAtivos.length})
          </TabsTrigger>
          <TabsTrigger value="resolvidos" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Resolvidos ({alertasResolvidos.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ativos" className="space-y-4">
          {alertasAtivos.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">Nenhum alerta ativo</h3>
                  <p className="text-muted-foreground">
                    Todos os sistemas estão funcionando normalmente
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alertasAtivos
                .sort((a, b) => {
                  // Ordenar por severidade (crítico primeiro) e depois por timestamp
                  const severityOrder = { critical: 0, error: 1, warning: 2, info: 3 };
                  const severityDiff = severityOrder[a.severidade] - severityOrder[b.severidade];
                  if (severityDiff !== 0) return severityDiff;
                  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                })
                .map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resolvidos" className="space-y-4">
          {alertasResolvidos.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">Nenhum alerta resolvido</h3>
                  <p className="text-muted-foreground">
                    Histórico de alertas aparecerá aqui
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alertasResolvidos
                .sort((a, b) => new Date(b.resolvidoEm || 0).getTime() - new Date(a.resolvidoEm || 0).getTime())
                .slice(0, 20) // Mostrar apenas os últimos 20 resolvidos
                .map(alert => (
                  <AlertCard key={alert.id} alert={alert} showActions={false} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPanel;