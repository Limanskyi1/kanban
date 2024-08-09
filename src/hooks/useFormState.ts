import { ChangeEvent, useState } from "react";
import { ISubtask } from "../types";

export interface IFormState {
  title: string;
  description: string;
  selectedOption: string;
  subtasks: ISubtask[];
  errors: {
    title: string;
    subtasks: number[] | [];
  };
}

export const useFormState = (initialState: IFormState) => {
  const [formState, setFormState] = useState<IFormState>(initialState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  const setSubtasks = (newSubtasks: ISubtask[]) => {
    setFormState((prevState) => ({
      ...prevState,
      subtasks: newSubtasks,
      errors: {
        ...prevState.errors,
        subtasks: [],
      },
    }));
  };

  const setSelectedOption = (option: string) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedOption: option,
    }));
  };

  return { formState, setFormState, changeHandler, setSubtasks, setSelectedOption };
};

