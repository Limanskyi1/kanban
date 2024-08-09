import { FC } from "react";
import "./Task.scss";
import { ITask } from "../../types";
import { getCompletedSubtasks } from "../../utils/getCompletedSubtasks";
import { useAppContext } from "../../hooks";
import { useDrag } from "react-dnd";

interface TaskProps {
  task: ITask;
}

export const Task: FC<TaskProps> = ({ task }) => {
  if (!task) {
    console.error("Task prop is missing");
    return null;
  }

  const { title, subtasks } = task;
  const { updateAppStateField, setCurrentModal } = useAppContext();

  const [{ opacity }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { task },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }), [task]);

  const onClickTask = () => {
    updateAppStateField("currentTaskStatus", task.status);
    updateAppStateField("currentTaskId", task.id);
    setCurrentModal("VIEW_TASK_MODAL");
  };

  return (
    <div 
      className="task" 
      onClick={onClickTask} 
      ref={dragRef}
      style={{ opacity }}
    >
      <h2 className="title-15">{title}</h2>
      <p className="text-grey-12">
        {getCompletedSubtasks(subtasks)} of {subtasks.length} subtasks
      </p>
    </div>
  );
};


