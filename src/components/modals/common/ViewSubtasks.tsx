import { FC } from "react";
import { ISubtask } from "../../../types";
import { IconDone } from "../../../icons";
import { getCompletedSubtasks } from "../../../utils/getCompletedSubtasks";

interface ViewSubtasksProps {
    subtasks: ISubtask[];
    onClickSubtask: (subIndex:number) => void
}
  
export const ViewSubtasks: FC<ViewSubtasksProps> = ({ subtasks , onClickSubtask}) => {
 
    const renderSubtasks = () => {
      if (subtasks && subtasks.length > 0) {
        return subtasks.map((sub,index) => (
          <div onClick={() => onClickSubtask(index)} key={sub.title} className={`subtask ${sub.isCompleted ? "completed" : ""}`}>
            <span className="icon">
              <IconDone />
            </span>
            <p>{sub.title}</p>
          </div>
        ));
      }
      return null;
    };


    return (
      <div className="view-subtasks">
        <span className="modal-text">Subtasks ({getCompletedSubtasks(subtasks)} of {subtasks.length})</span>
        {renderSubtasks()}
      </div>
    );
  };
  