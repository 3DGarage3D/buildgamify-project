
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Radio, MapPin, Clock, Signal } from 'lucide-react';

const RFIDManager = () => {
  const [rfidTags, setRfidTags] = useState([
    {
      id: 'RFID-001',
      panelId: 'P-2024-001',
      location: 'Setor A - Posição 12',
      lastRead: '2024-01-15 14:30',
      signal: 'strong',
      status: 'active'
    },
    {
      id: 'RFID-002',
      panelId: 'P-2024-002',
      location: 'Linha de Produção - Estação 3',
      lastRead: '2024-01-15 13:45',
      signal: 'medium',
      status: 'active'
    },
    {
      id: 'RFID-003',
      panelId: 'P-2024-003',
      location: 'Pátio - Zona B',
      lastRead: '2024-01-15 12:15',
      signal: 'weak',
      status: 'warning'
    }
  ]);

  const [newRfidId, setNewRfidId] = useState('');
  const [newPanelId, setNewPanelId] = useState('');

  const getSignalIcon = (signal: string) => {
    const signalLevels = {
      strong: 'text-green-600',
      medium: 'text-yellow-600',
      weak: 'text-red-600'
    };
    return signalLevels[signal as keyof typeof signalLevels] || 'text-gray-400';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const addRFIDTag = () => {
    if (newRfidId && newPanelId) {
      const newTag = {
        id: newRfidId,
        panelId: newPanelId,
        location: 'Não definida',
        lastRead: new Date().toLocaleString('pt-BR'),
        signal: 'strong',
        status: 'active'
      };
      setRfidTags([newTag, ...rfidTags]);
      setNewRfidId('');
      setNewPanelId('');
    }
  };

  return (
    <div className="space-y-6">
      {/* RFID Registration */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Cadastro de RFID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="ID do RFID (ex: RFID-004)"
              value={newRfidId}
              onChange={(e) => setNewRfidId(e.target.value)}
            />
            <Input
              placeholder="ID do Painel (ex: P-2024-004)"
              value={newPanelId}
              onChange={(e) => setNewPanelId(e.target.value)}
            />
            <Button 
              onClick={addRFIDTag}
              disabled={!newRfidId || !newPanelId}
              className="gap-2"
            >
              <Radio className="h-4 w-4" />
              Cadastrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RFID Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rfidTags.map((tag) => (
          <Card key={tag.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                  {tag.panelId}
                </CardTitle>
                <Badge className={getStatusColor(tag.status)}>
                  {tag.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tag.id}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Localização</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tag.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Última Leitura</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tag.lastRead}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Signal className={`h-4 w-4 ${getSignalIcon(tag.signal)}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Sinal {tag.signal}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Localizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Factory Map */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa da Fábrica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden">
            {/* Simplified Factory Layout */}
            <div className="absolute inset-4 grid grid-cols-6 grid-rows-4 gap-2">
              {/* Production Line */}
              <div className="col-span-2 row-span-2 bg-blue-200 dark:bg-blue-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Linha de Produção</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-600 dark:text-blue-300">2 painéis</span>
                  </div>
                </div>
              </div>

              {/* Storage Area A */}
              <div className="col-span-2 row-span-2 bg-green-200 dark:bg-green-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Setor A</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 dark:text-green-300">15 painéis</span>
                  </div>
                </div>
              </div>

              {/* Storage Area B */}
              <div className="col-span-2 row-span-2 bg-yellow-200 dark:bg-yellow-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pátio - Zona B</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-yellow-600 dark:text-yellow-300">8 painéis</span>
                  </div>
                </div>
              </div>

              {/* Loading Area */}
              <div className="col-span-6 row-span-2 bg-purple-200 dark:bg-purple-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Área de Expedição</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-purple-600 dark:text-purple-300">Prontos para carregamento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFIDManager;
