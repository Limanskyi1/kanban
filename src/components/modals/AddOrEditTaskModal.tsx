import { FC, useRef } from "react";
import { ModalInput } from "./common/ModalInput";
import { ITask } from "../../types";
import { Subtasks } from "./common/Subtasks";
import { Select } from "../Select";
import { Button } from "../../ui-components/Button";
import { addTask, changeTask } from "../../store/boardsSlice";
import { changeTaskProps } from "../../types/reduxTypes";
import { validateFields } from "../../utils/validateFields";
import {
  useAppContext,
  useFormState,
  useOutsideClick,
  useSelectOptions,
  useTask,
  useAppDispatch,
} from "../../hooks";
import { ModalWrapper } from "./common/ModalWrapper";

export const AddOrEditTaskModal: FC<{ isEdit: boolean }> = ({ isEdit }) => {
  const dispatch = useAppDispatch();
  const selectOptions = useSelectOptions();
  const { setCurrentModal } = useAppContext();
  const task = useTask() as ITask;
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setCurrentModal("BASE_STATE"));

  const initFormState = isEdit
    ? {
        title: task.title,
        description: task.description,
        selectedOption: task.status,
        subtasks: task.subtasks,
        errors: {
          title: "",
          subtasks: [],
        },
      }
    : {
        title: "",
        description: "",
        selectedOption: selectOptions[0],
        subtasks: [],
        errors: {
          title: "",
          subtasks: [],
        },
      };

  const {
    formState,
    setFormState,
    changeHandler,
    setSubtasks,
    setSelectedOption,
  } = useFormState(initFormState);

  const sendData = () => {
    const errors = validateFields(formState);
    if (errors) {
      setFormState((prevState) => ({
        ...prevState,
        errors: {
          title: errors.titleError,
          subtasks: errors.subtasksErrors,
        },
      }));
      return;
    }

    const payload = {
      title: formState.title,
      description: formState.description,
      status: formState.selectedOption,
      subtasks: formState.subtasks,
    };

    if (isEdit) {
      const changePayload: changeTaskProps = {
        task: {
          ...payload,
          id: task.id,
        },
        colName: task.status,
      };
      dispatch(changeTask(changePayload));
    } else {
      dispatch(addTask(payload));
    }
    setCurrentModal("BASE_STATE");
  };

  return (
    <div className="modal-layout add-task-modal">
      <ModalWrapper>
        <div ref={modalRef}>
          <h3 className="modal-title-black mb-24">
            {isEdit ? `Edit Task` : "Add New Task"}
          </h3>
          <ModalInput
            title="Title"
            name="title"
            value={formState.title}
            error={formState.errors.title}
            onChange={changeHandler}
          />
          <ModalInput
            title="Description"
            name="description"
            error=""
            value={formState.description}
            onChange={changeHandler}
          />
          <span className="modal-text mb-8">Subtasks</span>
          <Subtasks
            subtasks={formState.subtasks}
            errors={formState.errors.subtasks}
            setSubtasks={setSubtasks}
          />
          <Select
            options={selectOptions}
            selectedOption={formState.selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <Button className="btn-primary" onClick={sendData}>
            {isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </ModalWrapper>
    </div>
  );
};
