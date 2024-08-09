import { IBoard, ITask } from ".";

export interface BoardsState {
  boards: IBoard[] | null;
  activeBoard: IBoard | null;
}

export interface changeSubTaskStatusProps {
  task: ITask;
  subtaskIndex: number;
}

export interface changeTaskStatusProps {
  task: ITask;
  updatedStatus: string;
}

export interface deleteTaskProps {
  columnName: string;
  taskId: string | number;
}


export interface changeTaskProps {
  task: ITask;
  colName: string;
}
