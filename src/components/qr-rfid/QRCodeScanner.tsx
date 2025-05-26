
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, History, Eye } from 'lucide-react';

const QRCodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [recentScans, setRecentScans] = useState([
    {
      id: 'P-2024-001',
      timestamp: '2024-01-15 14:30',
      stage: 'concretagem',
      batch: 'L-240115'
    },
    {
      id: 'P-2024-002', 
      timestamp: '2024-01-15 13:45',
      stage: 'montagem',
      batch: 'L-240115'
    }
  ]);

  const startScanning = () => {
    setIsScanning(true);
    // Simular scan após 3 segundos
    setTimeout(() => {
      const mockData = {
        panelId: 'P-2024-003',
        batch: 'L-240115',
        stage: 'desforma',
        destination: 'Residencial Vila Moderna',
        timestamp: new Date().toISOString(),
        type: 'panel'
      };
      setScannedData(mockData);
      setIsScanning(false);
      
      setRecentScans(prev => [{
        id: mockData.panelId,
        timestamp: new Date().toLocaleString('pt-BR'),
        stage: mockData.stage,
        batch: mockData.batch
      }, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const getStageColor = (stage: string) => {
    const colors = {
      projeto: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      planejamento: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      armadura: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      montagem: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      concretagem: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      desforma: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      armazenagem: 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400',
      entrega: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
    };
    return colors[stage as keyof typeof colors] || 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Scanner */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Scanner QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {isScanning ? (
              <div className="text-center">
                <div className="animate-pulse">
                  <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
                </div>
                <p className="text-muted-foreground">Escaneando...</p>
                <div className="absolute inset-4 border-2 border-primary rounded-lg animate-pulse"></div>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Clique para iniciar o scanner
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={startScanning}
              disabled={isScanning}
              className="flex-1 gap-2"
            >
              <Camera className="h-4 w-4" />
              {isScanning ? 'Escaneando...' : 'Iniciar Scanner'}
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            {scannedData ? 'Dados do Painel' : 'Escaneamentos Recentes'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scannedData ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    {scannedData.panelId}
                  </h3>
                  <Badge className={getStageColor(scannedData.stage)}>
                    {scannedData.stage}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lote:</span>
                    <span className="font-medium text-foreground">{scannedData.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destino:</span>
                    <span className="font-medium text-foreground">{scannedData.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Escaneado:</span>
                    <span className="font-medium text-foreground">
                      {new Date(scannedData.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <History className="h-4 w-4" />
                  Histórico
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <div 
                  key={index}
                  className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{scan.id}</p>
                      <p className="text-sm text-muted-foreground">{scan.timestamp}</p>
                    </div>
                    <Badge className={getStageColor(scan.stage)} variant="secondary">
                      {scan.stage}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeScanner;
