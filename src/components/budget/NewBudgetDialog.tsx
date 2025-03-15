
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { MaterialItem } from "@/types/budget";

interface NewBudgetDialogProps {
  materials: MaterialItem[];
  onCreateBudget: (name: string, description: string, client: string) => void;
  disabled?: boolean;
}

const NewBudgetDialog = ({ 
  materials, 
  onCreateBudget, 
  disabled = false 
}: NewBudgetDialogProps) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [client, setClient] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateBudget(name, description, client);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setClient("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Orçamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar novo orçamento</DialogTitle>
            <DialogDescription>
              Preencha as informações básicas para criar um novo orçamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do projeto</Label>
              <Input
                id="name"
                placeholder="Digite o nome do projeto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                placeholder="Nome do cliente"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição do projeto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name.trim()}>Criar orçamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBudgetDialog;
