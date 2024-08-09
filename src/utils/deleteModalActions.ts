interface IdeleteModalActions {
  [key: string]: {
    createTitle: () => string;
    createText: (name: string) => string;
  };
}

export const deleteModalActions: IdeleteModalActions = {
  DELETE_TASK: {
    createTitle: (): string => {
      return "Delete this task?";
    },
    createText: (name: string): string => {
      return `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`;
    },
  },
  DELETE_COLUMN: {
    createTitle: (): string => {
      return "Delete this column?";
    },
    createText: (name: string): string => {
      return `Are you sure you want to delete the ‘${name}’ column? This action will delete all the tasks and sub tasks in this column and can not be reversed.`;
    },
  },
  DELETE_BOARD: {
    createTitle: (): string => {
      return "Delete this board?";
    },
    createText: (name: string): string => {
      return `Are you sure you want to delete the ‘${name}’ board? This action will delete all the tasks and columns in this board and can not be reversed.`;
    },
  },
};
