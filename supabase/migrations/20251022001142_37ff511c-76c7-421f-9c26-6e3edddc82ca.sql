-- Fix search_path for handle_updated_at function
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate trigger for profiles updated_at
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();