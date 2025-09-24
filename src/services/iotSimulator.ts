import { SensorReading, PainelProducao, PainelAlert, IOT_CONFIG_DEFAULT } from '@/types/iot';

class IoTSimulator {
  private paineis: Map<string, PainelProducao> = new Map();
  private subscribers: Set<(data: SensorReading) => void> = new Set();
  private alertSubscribers: Set<(alert: PainelAlert) => void> = new Set();
  private simulationInterval?: NodeJS.Timeout;
  private isRunning = false;

  constructor() {
    this.initializeMockPaineis();
  }

  private initializeMockPaineis() {
    const mockPaineis: PainelProducao[] = [
      {
        id: 'PL001',
        qrCode: 'QR_PL001_2024',
        nfcId: 'NFC_PL001',
        tipo: 'Parede Externa',
        statusAtual: 'Em Cura',
        dataCriacao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        idProjetoOriginal: 'PROJ_001',
        historicoEtapas: [
          {
            etapa: 'Em Preparação',
            inicio: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Em Cura',
            inicio: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            status: 'Em Andamento'
          }
        ],
        alertas: []
      },
      {
        id: 'PL002',
        qrCode: 'QR_PL002_2024',
        nfcId: 'NFC_PL002',
        tipo: 'Laje',
        statusAtual: 'Aguardando Desmolde',
        dataCriacao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        idProjetoOriginal: 'PROJ_001',
        historicoEtapas: [
          {
            etapa: 'Em Preparação',
            inicio: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Em Cura',
            inicio: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 6 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Aguardando Desmolde',
            inicio: new Date(Date.now() - 6 * 60 * 60 * 1000),
            status: 'Em Andamento'
          }
        ],
        alertas: []
      },
      {
        id: 'PL003',
        qrCode: 'QR_PL003_2024',
        nfcId: 'NFC_PL003',
        tipo: 'Parede Interna',
        statusAtual: 'Controle de Qualidade',
        dataCriacao: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        idProjetoOriginal: 'PROJ_002',
        historicoEtapas: [
          {
            etapa: 'Em Preparação',
            inicio: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Em Cura',
            inicio: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 12 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Em Desmolde',
            inicio: new Date(Date.now() - 12 * 60 * 60 * 1000),
            fim: new Date(Date.now() - 10 * 60 * 60 * 1000),
            status: 'Concluído'
          },
          {
            etapa: 'Controle de Qualidade',
            inicio: new Date(Date.now() - 10 * 60 * 60 * 1000),
            status: 'Em Andamento'
          }
        ],
        alertas: []
      }
    ];

    mockPaineis.forEach(painel => {
      this.paineis.set(painel.id, painel);
    });
  }

  private generateSensorReading(painelId: string): SensorReading {
    const painel = this.paineis.get(painelId);
    if (!painel) throw new Error(`Painel ${painelId} não encontrado`);

    // Gerar dados baseados no status do painel
    let temperatura = 22;
    let umidade = 60;
    let inclinacao = 0;
    let vibração = 0;

    switch (painel.statusAtual) {
      case 'Em Cura':
        temperatura = 20 + Math.random() * 8 - 2; // 18-26°C com variação
        umidade = 55 + Math.random() * 20 - 5; // 50-70% com variação
        inclinacao = Math.random() * 2; // muito baixa inclinação
        vibração = Math.random() * 10; // vibração mínima
        break;
      
      case 'Em Desmolde':
        temperatura = 22 + Math.random() * 4 - 2; // 20-24°C
        umidade = 50 + Math.random() * 15; // 50-65%
        inclinacao = Math.random() * 25; // até 25° durante desmolde
        vibração = 20 + Math.random() * 40; // vibração de equipamentos
        break;
      
      case 'Aguardando Desmolde':
        temperatura = 20 + Math.random() * 6 - 1; // 19-25°C
        umidade = 50 + Math.random() * 20; // 50-70%
        inclinacao = Math.random() * 3; // muito baixa
        vibração = Math.random() * 5; // quase zero
        break;
      
      default:
        temperatura = 20 + Math.random() * 10;
        umidade = 40 + Math.random() * 40;
        inclinacao = Math.random() * 5;
        vibração = Math.random() * 15;
    }

    const reading: SensorReading = {
      painelId,
      timestamp: new Date(),
      temperatura: Math.round(temperatura * 10) / 10,
      umidade: Math.round(umidade * 10) / 10,
      inclinacao: Math.round(inclinacao * 10) / 10,
      vibração: Math.round(vibração * 10) / 10
    };

    // Verificar se precisa gerar alertas
    this.checkForAlerts(reading);

    return reading;
  }

  private checkForAlerts(reading: SensorReading) {
    const config = IOT_CONFIG_DEFAULT;
    const painel = this.paineis.get(reading.painelId);
    if (!painel) return;

    // Verificar temperatura
    if (reading.temperatura < config.limites.temperatura.min || reading.temperatura > config.limites.temperatura.max) {
      const alert: PainelAlert = {
        id: crypto.randomUUID(),
        tipo: 'temperatura',
        severidade: reading.temperatura < 10 || reading.temperatura > 35 ? 'critical' : 'warning',
        mensagem: `Temperatura fora do limite: ${reading.temperatura}°C`,
        timestamp: new Date(),
        resolvido: false
      };
      painel.alertas.push(alert);
      this.alertSubscribers.forEach(callback => callback(alert));
    }

    // Verificar umidade
    if (reading.umidade < config.limites.umidade.min || reading.umidade > config.limites.umidade.max) {
      const alert: PainelAlert = {
        id: crypto.randomUUID(),
        tipo: 'umidade',
        severidade: 'warning',
        mensagem: `Umidade fora do limite: ${reading.umidade}%`,
        timestamp: new Date(),
        resolvido: false
      };
      painel.alertas.push(alert);
      this.alertSubscribers.forEach(callback => callback(alert));
    }

    // Verificar inclinação
    if (reading.inclinacao > config.limites.inclinacao.warning) {
      const alert: PainelAlert = {
        id: crypto.randomUUID(),
        tipo: 'inclinacao',
        severidade: reading.inclinacao > config.limites.inclinacao.max ? 'critical' : 'warning',
        mensagem: `Inclinação elevada detectada: ${reading.inclinacao}°`,
        timestamp: new Date(),
        resolvido: false
      };
      painel.alertas.push(alert);
      this.alertSubscribers.forEach(callback => callback(alert));
    }
  }

  startSimulation() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.simulationInterval = setInterval(() => {
      this.paineis.forEach((painel, painelId) => {
        const reading = this.generateSensorReading(painelId);
        painel.ultimaLeitura = reading;
        
        // Notificar subscribers
        this.subscribers.forEach(callback => callback(reading));
      });
    }, IOT_CONFIG_DEFAULT.intervalos.leituraSensores * 1000);
  }

  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
    this.isRunning = false;
  }

  subscribeSensorData(callback: (data: SensorReading) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  subscribeAlerts(callback: (alert: PainelAlert) => void) {
    this.alertSubscribers.add(callback);
    return () => this.alertSubscribers.delete(callback);
  }

  getPaineis(): PainelProducao[] {
    return Array.from(this.paineis.values());
  }

  getPainel(id: string): PainelProducao | undefined {
    return this.paineis.get(id);
  }

  updatePainelStatus(painelId: string, novoStatus: PainelProducao['statusAtual'], observacoes?: string) {
    const painel = this.paineis.get(painelId);
    if (!painel) return false;

    // Finalizar etapa atual se houver
    const etapaAtual = painel.historicoEtapas.find(e => e.status === 'Em Andamento');
    if (etapaAtual) {
      etapaAtual.fim = new Date();
      etapaAtual.status = 'Concluído';
      if (observacoes) etapaAtual.observacoes = observacoes;
    }

    // Adicionar nova etapa
    painel.historicoEtapas.push({
      etapa: novoStatus,
      inicio: new Date(),
      status: 'Em Andamento',
      observacoes
    });

    painel.statusAtual = novoStatus;
    return true;
  }

  resolverAlert(painelId: string, alertId: string, resolvidoPor: string) {
    const painel = this.paineis.get(painelId);
    if (!painel) return false;

    const alert = painel.alertas.find(a => a.id === alertId);
    if (!alert) return false;

    alert.resolvido = true;
    alert.resolvidoPor = resolvidoPor;
    alert.resolvidoEm = new Date();
    return true;
  }
}

export const iotSimulator = new IoTSimulator();