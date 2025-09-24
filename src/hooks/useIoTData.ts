import { useState, useEffect, useCallback } from 'react';
import { SensorReading, PainelProducao, PainelAlert } from '@/types/iot';
import { iotSimulator } from '@/services/iotSimulator';

export const useIoTData = () => {
  const [paineis, setPaineis] = useState<PainelProducao[]>([]);
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([]);
  const [alerts, setAlerts] = useState<PainelAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Inicializar dados
    setPaineis(iotSimulator.getPaineis());
    
    // Configurar subscription para dados de sensores
    const unsubscribeSensors = iotSimulator.subscribeSensorData((reading) => {
      setSensorReadings(prev => {
        const newReadings = [reading, ...prev].slice(0, 100); // manter apenas últimas 100 leituras
        return newReadings;
      });
      
      // Atualizar painel com última leitura
      setPaineis(prev => prev.map(painel => 
        painel.id === reading.painelId 
          ? { ...painel, ultimaLeitura: reading }
          : painel
      ));
    });

    // Configurar subscription para alertas
    const unsubscribeAlerts = iotSimulator.subscribeAlerts((alert) => {
      setAlerts(prev => [alert, ...prev]);
      
      // Atualizar painel com novo alerta
      setPaineis(prev => prev.map(painel => 
        painel.id === alert.id 
          ? { ...painel, alertas: [alert, ...painel.alertas] }
          : painel
      ));
    });

    // Iniciar simulação
    iotSimulator.startSimulation();
    setIsConnected(true);

    return () => {
      unsubscribeSensors();
      unsubscribeAlerts();
      iotSimulator.stopSimulation();
      setIsConnected(false);
    };
  }, []);

  const updatePainelStatus = useCallback((painelId: string, novoStatus: PainelProducao['statusAtual'], observacoes?: string) => {
    const success = iotSimulator.updatePainelStatus(painelId, novoStatus, observacoes);
    if (success) {
      setPaineis(iotSimulator.getPaineis());
    }
    return success;
  }, []);

  const resolverAlert = useCallback((painelId: string, alertId: string, resolvidoPor: string) => {
    const success = iotSimulator.resolverAlert(painelId, alertId, resolvidoPor);
    if (success) {
      setPaineis(iotSimulator.getPaineis());
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolvido: true, resolvidoPor, resolvidoEm: new Date() }
          : alert
      ));
    }
    return success;
  }, []);

  const getPainelById = useCallback((id: string) => {
    return paineis.find(painel => painel.id === id);
  }, [paineis]);

  const getSensorReadingsForPainel = useCallback((painelId: string, limit = 20) => {
    return sensorReadings
      .filter(reading => reading.painelId === painelId)
      .slice(0, limit);
  }, [sensorReadings]);

  const getActiveAlerts = useCallback(() => {
    return alerts.filter(alert => !alert.resolvido);
  }, [alerts]);

  const getAlertsForPainel = useCallback((painelId: string) => {
    return alerts.filter(alert => alert.id === painelId); // Note: This might need adjustment based on alert structure
  }, [alerts]);

  return {
    paineis,
    sensorReadings,
    alerts,
    isConnected,
    updatePainelStatus,
    resolverAlert,
    getPainelById,
    getSensorReadingsForPainel,
    getActiveAlerts,
    getAlertsForPainel
  };
};