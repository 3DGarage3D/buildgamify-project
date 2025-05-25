
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Maximize2, 
  Minimize2, 
  Search, 
  Map, 
  Play,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductionStage from './ProductionStage';
import FlowMinimap from './FlowMinimap';
import { productionStages } from '@/data/productionFlowData';

const ProductionFlowViewer = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMinimap, setShowMinimap] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentStage > 0) {
        setCurrentStage(currentStage - 1);
      } else if (e.key === 'ArrowRight' && currentStage < productionStages.length - 1) {
        setCurrentStage(currentStage + 1);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen);
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStage, isFullscreen]);

  // Search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const stageIndex = productionStages.findIndex(stage => 
      stage.title.toLowerCase().includes(term.toLowerCase()) ||
      stage.description.toLowerCase().includes(term.toLowerCase()) ||
      stage.keywords.some(keyword => keyword.toLowerCase().includes(term.toLowerCase()))
    );
    if (stageIndex !== -1) {
      setCurrentStage(stageIndex);
    }
  };

  const nextStage = () => {
    if (currentStage < productionStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageLink = (link: string) => {
    navigate(link);
  };

  return (
    <div 
      ref={containerRef}
      className={`
        relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800
        ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-[80vh] rounded-lg border'}
        transition-all duration-500 ease-in-out
      `}
    >
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white"
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Etapa {currentStage + 1} de {productionStages.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar etapa..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Minimap Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMinimap(!showMinimap)}
            className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white"
          >
            <Map className="h-4 w-4" />
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative h-full flex">
        {/* Stage Content */}
        <div className="flex-1 flex items-center justify-center p-8 pt-20">
          <ProductionStage
            stage={productionStages[currentStage]}
            isActive={true}
            onLinkClick={handleStageLink}
            zoomLevel={zoomLevel}
          />
        </div>

        {/* Minimap */}
        {showMinimap && (
          <div className="absolute right-4 top-20 w-64 z-10">
            <FlowMinimap
              stages={productionStages}
              currentStage={currentStage}
              onStageClick={setCurrentStage}
            />
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-full px-6 py-3 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStage}
            disabled={currentStage === 0}
            className="hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {productionStages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStage 
                    ? 'bg-blue-600 scale-125' 
                    : index < currentStage 
                      ? 'bg-green-500' 
                      : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextStage}
            disabled={currentStage === productionStages.length - 1}
            className="hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentStage + 1) / productionStages.length) * 100}%` }}
        />
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="absolute bottom-4 left-4 text-xs text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-md">
        Use ← → para navegar • F para tela cheia • ESC para sair
      </div>
    </div>
  );
};

export default ProductionFlowViewer;
