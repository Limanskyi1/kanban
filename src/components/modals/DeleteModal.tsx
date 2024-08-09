import { FC } from "react";
import { Button } from "../../ui-components/Button";
import { deleteBoard, deleteColumn, deleteTask } from "../../store/boardsSlice";
import { ITask } from "../../types";
import { deleteModalActions } from "../../utils/deleteModalActions";
import { useAppContext , useTask, useCurrentColumn , useAppDispatch, useAppSelector} from "../../hooks";
import { deleteTaskProps } from "../../types/reduxTypes";

export const DeleteModal: FC<{ action: string; }>= ({action}) => {
  const dispatch = useAppDispatch();
  const { appState,setCurrentModal} = useAppContext();
  const task = useTask() as ITask;
  const currentColumn = useCurrentColumn();
  const activeBoard = useAppSelector(state => state.boards.activeBoard);

  if (!deleteModalActions[action]) {
    return null;
  }

  const { createTitle, createText } = deleteModalActions[action];

  const onClickDelete = () => {
    if (action === "DELETE_TASK") {
      const payload:deleteTaskProps = {
        columnName: task.status,
        taskId: task.id,
      };
      dispatch(deleteTask(payload));
    }
    if (action === "DELETE_COLUMN") {
      const payload = appState.currentColumnId;
      dispatch(deleteColumn(payload));
    }
    if(action === "DELETE_BOARD"){
      dispatch(deleteBoard());
    }
    setCurrentModal("BASE_STATE");
  };

  const setTitle = () => {
    if(action === "DELETE_TASK"){
      return createText(task?.title)
    }
    if(action === "DELETE_COLUMN"){
      return createText(currentColumn?.name as string)
    }
    if(action === "DELETE_BOARD"){
      return createText(activeBoard?.name as string);
    }
  }


  return (
    <div className="modal-layout">
      <div className="modal">
        <h3 style={{ color: "#ea5555" }} className="mb-24">
          {createTitle()}
        </h3>
        <p className="mb-24 modal-text">{setTitle()}</p>
        <div className="grid-2">
          <Button className="delete-btn" onClick={onClickDelete}>
            Delete
          </Button>
          <Button className="cancel-btn" onClick={() => setCurrentModal("BASE_STATE")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
