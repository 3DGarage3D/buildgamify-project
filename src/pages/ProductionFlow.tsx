
import React from 'react';
import ProductionFlowViewer from '@/components/production-flow/ProductionFlowViewer';

const ProductionFlow = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Fluxo de Produção de Painéis
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Acompanhe visualmente todas as etapas da produção de painéis de concreto armado offsite
          </p>
        </div>
        
        <ProductionFlowViewer />
      </div>
    </div>
  );
};

export default ProductionFlow;
