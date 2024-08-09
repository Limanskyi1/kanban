import { IFormState } from "../hooks/useFormState";

export const validateFields = (formState: IFormState) => {
  let titleError = "";
  let subtasksErrors: number[] = [];

  if (!formState.title.trim()) {
    titleError = "Title is required.";
  }

  formState.subtasks.forEach((subtask, index) => {
    if (!subtask.title.trim()) {
      subtasksErrors.push(index);
    }
  });

  if (titleError || subtasksErrors.length > 0) {
    return { titleError, subtasksErrors };
  }
  return null;
};