
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";

interface NewProjectDialogProps {
  onProjectCreated?: (project: any) => void;
}

const NewProjectDialog = ({ onProjectCreated }: NewProjectDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: any) => {
    // Calcular progresso como 0 já que é um novo projeto
    const newProject = {
      id: crypto.randomUUID(),
      ...data,
      progress: 0,
    };
    
    // Aqui você pode integrar com sua API para salvar o projeto
    console.log("Novo projeto:", newProject);
    
    // Simular criação bem-sucedida
    toast.success("Projeto criado com sucesso!");
    setOpen(false);
    
    // Notificar o componente pai
    if (onProjectCreated) {
      onProjectCreated(newProject);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Projeto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo projeto.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
