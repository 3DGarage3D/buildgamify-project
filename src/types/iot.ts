export interface SensorReading {
  painelId: string;
  timestamp: Date;
  temperatura: number;
  umidade: number;
  inclinacao: number;
  vibração?: number;
  pressao?: number;
}

export interface PainelProducao {
  id: string;
  qrCode: string;
  nfcId: string;
  tipo: 'Parede Interna' | 'Parede Externa' | 'Fachada' | 'Divisória' | 'Laje';
  statusAtual: PainelStatus;
  dataCriacao: Date;
  idProjetoOriginal: string;
  historicoEtapas: EtapaHistorico[];
  ultimaLeitura?: SensorReading;
  alertas: PainelAlert[];
}

export type PainelStatus = 
  | 'Em Preparação'
  | 'Em Cura' 
  | 'Aguardando Desmolde'
  | 'Em Desmolde'
  | 'Controle de Qualidade'
  | 'Aprovado'
  | 'Rejeitado'
  | 'Em Armazenamento'
  | 'Transportando'
  | 'Instalado';

export interface EtapaHistorico {
  etapa: PainelStatus;
  inicio: Date;
  fim?: Date;
  status: 'Em Andamento' | 'Concluído' | 'Interrompido';
  observacoes?: string;
  operadorId?: string;
}

export interface PainelAlert {
  id: string;
  tipo: 'temperatura' | 'umidade' | 'inclinacao' | 'vibração' | 'tempo' | 'qualidade';
  severidade: 'info' | 'warning' | 'error' | 'critical';
  mensagem: string;
  timestamp: Date;
  resolvido: boolean;
  resolvidoPor?: string;
  resolvidoEm?: Date;
}

export interface IoTConfig {
  mqttBroker: string;
  topicos: {
    temperatura: string;
    umidade: string;
    inclinacao: string;
    vibração: string;
    status: string;
  };
  intervalos: {
    leituraSensores: number; // em segundos
    heartbeat: number;
  };
  limites: {
    temperatura: { min: number; max: number; ideal: { min: number; max: number } };
    umidade: { min: number; max: number; ideal: { min: number; max: number } };
    inclinacao: { max: number; warning: number };
    vibração: { max: number; warning: number };
  };
}

export const IOT_CONFIG_DEFAULT: IoTConfig = {
  mqttBroker: 'mqtt://localhost:1883',
  topicos: {
    temperatura: 'producao/painel/+/temperatura',
    umidade: 'producao/painel/+/umidade',
    inclinacao: 'producao/painel/+/inclinacao',
    vibração: 'producao/painel/+/vibracao',
    status: 'producao/painel/+/status'
  },
  intervalos: {
    leituraSensores: 30,
    heartbeat: 60
  },
  limites: {
    temperatura: { 
      min: 15, 
      max: 40, 
      ideal: { min: 20, max: 25 } 
    },
    umidade: { 
      min: 40, 
      max: 80, 
      ideal: { min: 50, max: 70 } 
    },
    inclinacao: { 
      max: 45, 
      warning: 30 
    },
    vibração: { 
      max: 100, 
      warning: 70 
    }
  }
};