-- Criar tabela de composições SINAPI
CREATE TABLE public.sinapi_compositions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  total_value DECIMAL(15,2),
  bdi_percentage DECIMAL(5,2),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar tabela de itens de composições
CREATE TABLE public.sinapi_composition_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  composition_id UUID NOT NULL REFERENCES public.sinapi_compositions(id) ON DELETE CASCADE,
  item_code TEXT NOT NULL,
  description TEXT NOT NULL,
  source TEXT,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  coefficient DECIMAL(15,8),
  unit_price DECIMAL(15,2),
  total_price DECIMAL(15,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_sinapi_compositions_code ON public.sinapi_compositions(code);
CREATE INDEX idx_sinapi_composition_items_code ON public.sinapi_composition_items(item_code);
CREATE INDEX idx_sinapi_composition_items_composition ON public.sinapi_composition_items(composition_id);

-- Habilitar RLS
ALTER TABLE public.sinapi_compositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sinapi_composition_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para sinapi_compositions
CREATE POLICY "Admin and Financeiro can view all compositions"
  ON public.sinapi_compositions FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can insert compositions"
  ON public.sinapi_compositions FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can update compositions"
  ON public.sinapi_compositions FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can delete compositions"
  ON public.sinapi_compositions FOR DELETE
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

-- Políticas RLS para sinapi_composition_items
CREATE POLICY "Admin and Financeiro can view all items"
  ON public.sinapi_composition_items FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can insert items"
  ON public.sinapi_composition_items FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can update items"
  ON public.sinapi_composition_items FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

CREATE POLICY "Admin and Financeiro can delete items"
  ON public.sinapi_composition_items FOR DELETE
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR 
    public.has_role(auth.uid(), 'financeiro'::app_role)
  );

-- Trigger para atualizar updated_at
CREATE TRIGGER update_sinapi_compositions_updated_at
  BEFORE UPDATE ON public.sinapi_compositions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();