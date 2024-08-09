import { FC, ChangeEvent } from "react";
import { IconClose } from "../../../icons";
import { ISubtask } from "../../../types";
import { Button } from "../../../ui-components/Button";

interface SubtasksProps {
  subtasks: ISubtask[];
  errors: number[];
  setSubtasks: (newSubtasks: ISubtask[]) => void;
}

export const Subtasks: FC<SubtasksProps> = ({
  subtasks,
  setSubtasks,
  errors,
}) => {
  const addSubtask = () => {
    const newSubtask: ISubtask = {
      title: "",
      isCompleted: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, subIndex) => subIndex !== index));
  };

  const changeSubTitle = (
    event: ChangeEvent<HTMLInputElement>,
    subIndex: number
  ) => {
    const newSubtasks = subtasks.map((sub, index) => {
      if (subIndex === index) {
        return {
          ...sub,
          title: event.target.value,
        };
      }
      return sub;
    });
    setSubtasks(newSubtasks);
  };

  return (
    <>
      <div className="subtasks">
        {subtasks.map((sub, subIndex) => (
          <div className="subtask" key={subIndex}>
            <div className={`${errors.includes(subIndex) ? "error" : ""}`}>
              <input
                type="text"
                value={sub.title}
                onChange={(event) => changeSubTitle(event, subIndex)}
              />
              {errors.includes(subIndex) && (
                <span className="error-message">Can’t be empty</span>
              )}
            </div>
            <span className="icon" onClick={() => removeSubtask(subIndex)}>
              <IconClose />
            </span>
          </div>
        ))}
      </div>
      <Button className="btn-add" onClick={addSubtask}>
        + Add New Subtask
      </Button>
    </>
  );
};
