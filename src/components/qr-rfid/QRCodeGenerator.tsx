
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Printer, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [panelId, setPanelId] = useState('');
  const [batch, setBatch] = useState('');
  const [stage, setStage] = useState('');
  const [destination, setDestination] = useState('');
  const [qrData, setQrData] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRCode = () => {
    const data = {
      panelId,
      batch,
      stage,
      destination,
      timestamp: new Date().toISOString(),
      type: 'panel'
    };
    setQrData(JSON.stringify(data));
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `panel-${panelId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const printQR = () => {
    if (!qrRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - Painel ${panelId}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .qr-container { margin: 20px; }
            .panel-info { margin: 10px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h2>Painel ${panelId}</h2>
            <div class="panel-info">
              <p><strong>Lote:</strong> ${batch}</p>
              <p><strong>Etapa:</strong> ${stage}</p>
              <p><strong>Destino:</strong> ${destination}</p>
            </div>
            ${qrRef.current.innerHTML}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Gerar QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="panelId">ID do Painel</Label>
              <Input
                id="panelId"
                placeholder="P-2024-001"
                value={panelId}
                onChange={(e) => setPanelId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="batch">Lote</Label>
              <Input
                id="batch"
                placeholder="L-240115"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Etapa Atual</Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projeto">Projeto e Modelagem</SelectItem>
                <SelectItem value="planejamento">Planejamento</SelectItem>
                <SelectItem value="armadura">Corte e Dobra</SelectItem>
                <SelectItem value="montagem">Montagem nas Formas</SelectItem>
                <SelectItem value="concretagem">Concretagem</SelectItem>
                <SelectItem value="desforma">Desforma</SelectItem>
                <SelectItem value="armazenagem">Armazenagem</SelectItem>
                <SelectItem value="entrega">Entrega</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destino/Obra</Label>
            <Input
              id="destination"
              placeholder="Residencial Vila Moderna"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <Button 
            onClick={generateQRCode}
            className="w-full"
            disabled={!panelId || !batch || !stage}
          >
            Gerar QR Code
          </Button>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            QR Code Gerado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qrData ? (
            <>
              <div ref={qrRef} className="flex justify-center p-4 bg-white rounded-lg">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Painel:</strong> {panelId}</p>
                <p><strong>Lote:</strong> {batch}</p>
                <p><strong>Etapa:</strong> {stage}</p>
                <p><strong>Destino:</strong> {destination}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadQR} className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={printQR} className="flex-1 gap-2">
                  <Printer className="h-4 w-4" />
                  Imprimir
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
              Preencha os dados para gerar o QR Code
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
