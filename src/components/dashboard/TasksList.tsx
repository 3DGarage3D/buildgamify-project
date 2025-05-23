
import { Link } from "react-router-dom";
import { ChevronRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/task/TaskItem";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  points: number;
  project?: string;
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <Card className="overflow-hidden border-primary/10 shadow-lg shadow-primary/5">
      <CardHeader className="pb-2 bg-primary/5 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          <span>Tarefas Recentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t px-4 py-3">
        <Button variant="ghost" size="sm" asChild className="w-full justify-between text-muted-foreground hover:text-primary">
          <Link to="/tasks" className="flex items-center justify-between w-full">
            <span>Ver todas as tarefas</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TasksList;
