
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle,
  AlertCircle,
  Calendar,
  Download
} from 'lucide-react';

const PanelTracker = () => {
  const [searchId, setSearchId] = useState('');
  const [selectedPanel, setSelectedPanel] = useState<any>(null);

  const mockPanels = [
    {
      id: 'P-2024-001',
      batch: 'L-240115',
      currentStage: 'entrega',
      destination: 'Residencial Vila Moderna',
      progress: 100,
      status: 'delivered',
      estimatedDelivery: '2024-01-15 16:00',
      timeline: [
        { stage: 'projeto', completed: true, timestamp: '2024-01-10 08:00', duration: '2h' },
        { stage: 'planejamento', completed: true, timestamp: '2024-01-10 10:30', duration: '1h' },
        { stage: 'armadura', completed: true, timestamp: '2024-01-11 09:00', duration: '4h' },
        { stage: 'montagem', completed: true, timestamp: '2024-01-12 08:00', duration: '6h' },
        { stage: 'concretagem', completed: true, timestamp: '2024-01-13 07:00', duration: '8h' },
        { stage: 'desforma', completed: true, timestamp: '2024-01-14 08:00', duration: '2h' },
        { stage: 'armazenagem', completed: true, timestamp: '2024-01-14 10:30', duration: '1h' },
        { stage: 'entrega', completed: true, timestamp: '2024-01-15 14:30', duration: '3h' }
      ]
    },
    {
      id: 'P-2024-002',
      batch: 'L-240115',
      currentStage: 'concretagem',
      destination: 'Edifício Comercial Central',
      progress: 62,
      status: 'in-progress',
      estimatedDelivery: '2024-01-17 14:00',
      timeline: [
        { stage: 'projeto', completed: true, timestamp: '2024-01-12 08:00', duration: '2h' },
        { stage: 'planejamento', completed: true, timestamp: '2024-01-12 10:30', duration: '1h' },
        { stage: 'armadura', completed: true, timestamp: '2024-01-13 09:00', duration: '4h' },
        { stage: 'montagem', completed: true, timestamp: '2024-01-14 08:00', duration: '6h' },
        { stage: 'concretagem', completed: false, timestamp: '2024-01-15 07:00', duration: '8h' },
        { stage: 'desforma', completed: false, timestamp: null, duration: '2h' },
        { stage: 'armazenagem', completed: false, timestamp: null, duration: '1h' },
        { stage: 'entrega', completed: false, timestamp: null, duration: '3h' }
      ]
    }
  ];

  const searchPanel = () => {
    const panel = mockPanels.find(p => p.id === searchId);
    setSelectedPanel(panel || null);
  };

  const getStageColor = (stage: string, completed: boolean) => {
    if (!completed) return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    
    const colors = {
      projeto: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      planejamento: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      armadura: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      montagem: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      concretagem: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      desforma: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      armazenagem: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      entrega: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatStageName = (stage: string) => {
    const names = {
      projeto: 'Projeto e Modelagem',
      planejamento: 'Planejamento',
      armadura: 'Corte e Dobra',
      montagem: 'Montagem nas Formas',
      concretagem: 'Concretagem',
      desforma: 'Desforma e Acabamento',
      armazenagem: 'Armazenagem',
      entrega: 'Entrega'
    };
    return names[stage as keyof typeof names] || stage;
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Rastreamento de Painel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Digite o ID do painel (ex: P-2024-001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button onClick={searchPanel} className="gap-2">
              <Search className="h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Panel Details */}
      {selectedPanel && (
        <>
          {/* Overview */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  {selectedPanel.id}
                </CardTitle>
                <Badge 
                  className={
                    selectedPanel.status === 'delivered' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }
                >
                  {selectedPanel.status === 'delivered' ? 'Entregue' : 'Em Produção'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Lote</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedPanel.batch}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Destino</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedPanel.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Entrega Prevista</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(selectedPanel.estimatedDelivery).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Progresso Geral</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{selectedPanel.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${selectedPanel.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Linha do Tempo
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Relatório PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPanel.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${step.completed 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : 'bg-gray-100 dark:bg-gray-700'
                        }
                      `}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      {index < selectedPanel.timeline.length - 1 && (
                        <div className={`
                          w-0.5 h-12 mt-2
                          ${step.completed ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}
                        `} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {formatStageName(step.stage)}
                        </h4>
                        <Badge className={getStageColor(step.stage, step.completed)} variant="secondary">
                          {step.duration}
                        </Badge>
                      </div>
                      
                      {step.timestamp && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          {new Date(step.timestamp).toLocaleString('pt-BR')}
                        </div>
                      )}
                      
                      {!step.completed && index === selectedPanel.timeline.findIndex((s: any) => !s.completed) && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          ⚡ Etapa atual em andamento
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Recent Panels */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Painéis Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPanels.map((panel) => (
              <div 
                key={panel.id}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => setSelectedPanel(panel)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{panel.id}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{panel.destination}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getStageColor(panel.currentStage, true)} variant="secondary">
                      {formatStageName(panel.currentStage)}
                    </Badge>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {panel.progress}% concluído
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PanelTracker;
