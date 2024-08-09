import { FC } from "react";
import { TasksList } from "../Task/TaskList";
import "./Column.scss";
import { ITask } from "../../types";
import { IconCircle } from "../../icons";
import { DotsMenu } from "../DotsMenu";
import { useAppContext } from "../../hooks/useAppContext";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks";
import { dragAndDropTask } from "../../store/boardsSlice";

interface ColumnProps {
  name: string;
  tasks: ITask[];
  id: string | number;
}

export const Column: FC<ColumnProps> = ({ name, tasks,id }) => {

  const dispatch = useAppDispatch();

  const [{}, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { task: ITask }) => {
      const payload = {
        prev: {
          taskId : item.task.id,
          taskStatus: item.task.status,
        },
        nextColumn: name,
      };
      dispatch(dragAndDropTask(payload));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [id]);

  const {setCurrentModal,updateAppStateField} = useAppContext();

  const onClickDeleteText = () => {
    updateAppStateField("currentColumnId",id);
    setCurrentModal("DELETE_COLUMN_MODAL");
  }

  const onClickEditText = ():void => {
    updateAppStateField("currentColumnId",id);
    setCurrentModal("EDIT_COLUMN_MODAL");
  }

  return (
    <div className="column" ref={drop}>
      <div className="flex-center-btwn mb-24">
        <div className="name">
          <IconCircle fill="#49C4E5" />
          <p>
            {name} ({tasks.length})
          </p>
        </div>
        <DotsMenu editText="Edit" deleteText="Delete" onClickDeleteText={onClickDeleteText} onClickEditText={onClickEditText}/>
      </div>
      <TasksList tasks={tasks} />
    </div>
  );
};
