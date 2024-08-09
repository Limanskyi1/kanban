import { ISubtask } from "../types";
export const getCompletedSubtasks = (subtasks:ISubtask[]):number => {
  return subtasks.filter(
    (subtask) => subtask.isCompleted === true
  ).length;
};
