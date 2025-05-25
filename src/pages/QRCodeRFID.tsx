
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  QrCode, 
  Radio, 
  Camera, 
  Download, 
  Printer, 
  History,
  Map,
  Search,
  Plus,
  Eye
} from 'lucide-react';
import QRCodeGenerator from '@/components/qr-rfid/QRCodeGenerator';
import QRCodeScanner from '@/components/qr-rfid/QRCodeScanner';
import RFIDManager from '@/components/qr-rfid/RFIDManager';
import PanelTracker from '@/components/qr-rfid/PanelTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QRCodeRFID = () => {
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Rastreamento QR Code & RFID
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sistema completo de identificação e rastreamento de painéis
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar painel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Button variant="default" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Painel
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Total de Painéis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,247</div>
              <div className="text-xs text-green-600 dark:text-green-400">+12% este mês</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Em Produção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">89</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">7 etapas ativas</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Prontos para Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">12 cargas programadas</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Taxa de Rastreio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">98.7%</div>
              <div className="text-xs text-green-600 dark:text-green-400">+2.1% vs anterior</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generator" className="gap-2">
              <QrCode className="h-4 w-4" />
              Gerador
            </TabsTrigger>
            <TabsTrigger value="scanner" className="gap-2">
              <Camera className="h-4 w-4" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="rfid" className="gap-2">
              <Radio className="h-4 w-4" />
              RFID
            </TabsTrigger>
            <TabsTrigger value="tracker" className="gap-2">
              <Map className="h-4 w-4" />
              Rastreamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator">
            <QRCodeGenerator />
          </TabsContent>

          <TabsContent value="scanner">
            <QRCodeScanner />
          </TabsContent>

          <TabsContent value="rfid">
            <RFIDManager />
          </TabsContent>

          <TabsContent value="tracker">
            <PanelTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QRCodeRFID;
