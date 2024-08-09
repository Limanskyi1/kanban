import { FC, useEffect, useRef, useState } from "react";
import { ViewSubtasks } from "./common/ViewSubtasks";
import { ISubtask, ITask } from "../../types";
import { changeSubTaskStatus, changeTaskStatus } from "../../store/boardsSlice";
import { Select } from "../Select";
import { DotsMenu } from "../DotsMenu";
import { useAppContext, useAppDispatch, useOutsideClick, useSelectOptions, useTask } from "../../hooks";

export const ViewTaskModal: FC = () => {
  const dispatch = useAppDispatch();
  
  const { appState,setCurrentModal } = useAppContext();
  const task: ITask = useTask() as ITask;
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setCurrentModal("BASE_STATE"));
  const selectOptions = useSelectOptions();
  const [selectedOption, setSelectedOption] = useState<string>(
    selectOptions.find((opt:string) => opt === appState.currentTaskStatus) as string
  );
  const unMount = useRef<boolean>(false);
  const selectedOptionRef = useRef<string>(selectedOption);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    return () => {
      if(unMount.current && appState.currentTaskStatus !== selectedOptionRef.current){
        const payload = {
          task,
          updatedStatus: selectedOptionRef.current as string,
        }
        dispatch(changeTaskStatus(payload));
        return 
      }
      unMount.current = true;
    }
  }, []);


  const onClickSubtask = (subIndex: number): void => {
    const payload = {
      task,
      subtaskIndex: subIndex,
    };
    dispatch(changeSubTaskStatus(payload));
  };

  const onClickDeleteText = ():void => {
    setCurrentModal("DELETE_TASK_MODAL");
  }

  const onClickEditText = ():void => {
    setCurrentModal("EDIT_TASK_MODAL");
  }

  return (
    <div className="modal-layout">
      <div className="modal" ref={modalRef}>
        <div className="flex-center-btwn">
          <h3 className="modal-title-black">{task?.title}</h3>
          <DotsMenu editText="Edit Task" deleteText="Delete Task" onClickDeleteText={onClickDeleteText} onClickEditText={onClickEditText}/>
        </div>
        <p className="modal-text mb-24">{task?.description}</p>
        <ViewSubtasks
          subtasks={task?.subtasks as ISubtask[]}
          onClickSubtask={onClickSubtask}
        />
        <Select
          options={selectOptions}
          selectedOption={selectedOption as string}
          setSelectedOption={setSelectedOption}
        />
      </div>
    </div>
  );
};
