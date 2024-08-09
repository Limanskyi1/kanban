import { FC } from "react";
import { ITask } from "../../types";
import { Task } from ".";

interface TasksListProps {
  tasks: ITask[];
}
export const TasksList: FC<TasksListProps> = ({ tasks }) => {
  return tasks.map((task: ITask) => (
    <Task
      task={task}
      key={task.title}
    />
  ));
};
