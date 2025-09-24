import { useState } from 'react';
import { Activity, Wifi, WifiOff, Settings, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { useIoTData } from '@/hooks/useIoTData';
import PainelCard from '@/components/iot/PainelCard';
import AlertsPanel from '@/components/iot/AlertsPanel';
import { SensorGrid } from '@/components/iot/SensorCard';

const Production = () => {
  const [selectedPainel, setSelectedPainel] = useState<string | null>(null);
  
  const {
    paineis,
    sensorReadings,
    alerts,
    isConnected,
    updatePainelStatus,
    resolverAlert,
    getPainelById,
    getSensorReadingsForPainel,
    getActiveAlerts
  } = useIoTData();

  const handleStatusChange = (painelId: string, novoStatus: any) => {
    const success = updatePainelStatus(painelId, novoStatus);
    if (success) {
      toast.success(`Status do painel ${painelId} atualizado para: ${novoStatus}`);
    } else {
      toast.error('Erro ao atualizar status do painel');
    }
  };

  const handleResolveAlert = (painelId: string, alertId: string, resolvidoPor: string) => {
    const success = resolverAlert(painelId, alertId, resolvidoPor);
    if (success) {
      toast.success('Alerta resolvido com sucesso');
    } else {
      toast.error('Erro ao resolver alerta');
    }
  };

  const activeAlerts = getActiveAlerts();
  const painelSelecionado = selectedPainel ? getPainelById(selectedPainel) : null;

  // Estatísticas gerais
  const estatisticas = {
    totalPaineis: paineis.length,
    emProducao: paineis.filter(p => ['Em Cura', 'Aguardando Desmolde', 'Em Desmolde'].includes(p.statusAtual)).length,
    aprovados: paineis.filter(p => p.statusAtual === 'Aprovado').length,
    comAlertas: paineis.filter(p => p.alertas.some(a => !a.resolvido)).length,
    alertasAtivos: activeAlerts.length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoramento de Produção</h1>
          <p className="text-muted-foreground">
            Sistema IoT para controle da linha de produção de painéis
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge 
            variant={isConnected ? "default" : "destructive"}
            className="flex items-center gap-2 px-3 py-1"
          >
            {isConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {isConnected ? 'Sistema Online' : 'Sistema Offline'}
          </Badge>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{estatisticas.totalPaineis}</div>
            <div className="text-xs text-muted-foreground">Total de Painéis</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{estatisticas.emProducao}</div>
            <div className="text-xs text-muted-foreground">Em Produção</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{estatisticas.aprovados}</div>
            <div className="text-xs text-muted-foreground">Aprovados</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{estatisticas.comAlertas}</div>
            <div className="text-xs text-muted-foreground">Com Alertas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{estatisticas.alertasAtivos}</div>
            <div className="text-xs text-muted-foreground">Alertas Ativos</div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <Tabs defaultValue="paineis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="paineis" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Painéis ({paineis.length})
          </TabsTrigger>
          <TabsTrigger value="alertas" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Alertas ({activeAlerts.length})
          </TabsTrigger>
          {painelSelecionado && (
            <TabsTrigger value="detalhes" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {painelSelecionado.id}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="paineis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paineis.map(painel => (
              <PainelCard
                key={painel.id}
                painel={painel}
                onStatusChange={handleStatusChange}
                onViewDetails={(painelId) => {
                  setSelectedPainel(painelId);
                  // Mudar para a aba de detalhes seria feito via state management mais robusto
                }}
              />
            ))}
          </div>
          
          {paineis.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium">Nenhum painel em produção</h3>
                  <p className="text-muted-foreground">
                    Painéis aparecerão aqui quando entrarem na linha de produção
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alertas">
          <AlertsPanel
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />
        </TabsContent>

        {painelSelecionado && (
          <TabsContent value="detalhes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações do Painel */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Detalhes - {painelSelecionado.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Tipo:</strong> {painelSelecionado.tipo}
                    </div>
                    <div>
                      <strong>Status:</strong> {painelSelecionado.statusAtual}
                    </div>
                    <div>
                      <strong>Criado em:</strong> {painelSelecionado.dataCriacao.toLocaleString()}
                    </div>
                    <div>
                      <strong>QR Code:</strong> {painelSelecionado.qrCode}
                    </div>
                  </div>

                  {/* Histórico de Etapas */}
                  <div>
                    <h4 className="font-medium mb-2">Histórico de Etapas</h4>
                    <div className="space-y-2">
                      {painelSelecionado.historicoEtapas.map((etapa, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <div className="font-medium">{etapa.etapa}</div>
                            <div className="text-xs text-muted-foreground">
                              {etapa.inicio.toLocaleString()}
                              {etapa.fim && ` - ${etapa.fim.toLocaleString()}`}
                            </div>
                          </div>
                          <Badge variant={etapa.status === 'Concluído' ? 'default' : 'secondary'}>
                            {etapa.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sensores */}
                  {painelSelecionado.ultimaLeitura && (
                    <div>
                      <h4 className="font-medium mb-2">Última Leitura dos Sensores</h4>
                      <SensorGrid reading={painelSelecionado.ultimaLeitura} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Alertas do Painel */}
              <Card>
                <CardHeader>
                  <CardTitle>Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  {painelSelecionado.alertas.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Nenhum alerta registrado</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {painelSelecionado.alertas.slice(0, 5).map(alert => (
                        <div key={alert.id} className="p-2 border rounded text-sm">
                          <div className="font-medium">{alert.mensagem}</div>
                          <div className="text-xs text-muted-foreground">
                            {alert.timestamp.toLocaleString()}
                          </div>
                          {alert.resolvido && (
                            <div className="text-xs text-green-600">
                              ✓ Resolvido por {alert.resolvidoPor}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Production;