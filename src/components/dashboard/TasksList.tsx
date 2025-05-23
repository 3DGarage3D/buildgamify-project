
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/task/TaskItem";

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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-tight font-display">Tarefas Recentes</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/tasks" className="flex items-center gap-1">
            <span>Ver todas</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
