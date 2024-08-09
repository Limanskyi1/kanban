import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../data";
import { IBoard, ITask } from "../types";
import { generateRandomId } from "../utils/generateRandomId";
import {
  BoardsState,
  changeSubTaskStatusProps,
  changeTaskProps,
  changeTaskStatusProps,
  deleteTaskProps,
} from "../types/reduxTypes";
import { localStorageServive } from "../services/LocalStorageService";

const initData = localStorageServive.getItem("boards") || data;
const activeBoardIndex = Number(localStorage.getItem("activeBoardIndex")) || 0;

const initialState: BoardsState = {
  boards: initData,
  activeBoard: initData[activeBoardIndex],
};

const updateBoardState = (state: BoardsState) => {
  const activeBoardIndex = state.boards?.findIndex(
    (board) => board.id === state.activeBoard?.id
  );

  if (activeBoardIndex !== -1 && state.activeBoard && state.boards) {
    state.boards[activeBoardIndex as number] = { ...state.activeBoard };
  }
};

const saveBoardsToLS = (state: BoardsState) => {
  updateBoardState(state);
  localStorageServive.setItem("boards", state.boards);
};

interface dragAndDropTaskProps {
  prev: {
    taskId: string | number;
    taskStatus: string;
  };
  nextColumn: string;
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    changeBoard(state, action: PayloadAction<number>) {
      const newActiveBoardIndex = action.payload;
      updateBoardState(state);
      localStorageServive.setItem("activeBoardIndex", newActiveBoardIndex);
      if (state.boards) state.activeBoard = state.boards[newActiveBoardIndex];
    },
    changeSubTaskStatus(
      state,
      action: PayloadAction<changeSubTaskStatusProps>
    ) {
      const { task, subtaskIndex } = action.payload;
      const column = state.activeBoard?.columns.find(
        (column) => column.name === task.status
      );
      if (column) {
        const taskToUpdate: ITask = column?.tasks?.find(
          (t) => t.id === task.id
        )!;
        const subTaskToUpdate = taskToUpdate?.subtasks[subtaskIndex];
        subTaskToUpdate.isCompleted = !subTaskToUpdate.isCompleted;
        saveBoardsToLS(state);
      }
    },
    changeTaskStatus(state, action: PayloadAction<changeTaskStatusProps>) {
      const { task, updatedStatus } = action.payload;
      if (updatedStatus) {
        const column = state.activeBoard?.columns.find(
          (column) => column.name === task.status
        );
        const taskToUpdate = column?.tasks.find((t) => t.id === task.id);
        if (column) column.tasks = column.tasks.filter((t) => t.id !== task.id);
        if (taskToUpdate) {
          taskToUpdate.status = updatedStatus as string;
          const newColumn = state.activeBoard?.columns.find(
            (col) => col.name === updatedStatus
          );
          if (newColumn) {
            newColumn.tasks.push({
              ...taskToUpdate,
            });
            saveBoardsToLS(state);
          }
        }
      }
    },
    addTask(state, action: PayloadAction<Omit<ITask, "id">>) {
      const task = action.payload;
      const column = state.activeBoard?.columns.find(
        (col) => col.name === task.status
      );
      if (column) {
        const newTask = {
          ...task,
          id: generateRandomId(),
        };
        column.tasks.push(newTask);
        saveBoardsToLS(state);
      }
    },
    deleteTask(state, action: PayloadAction<deleteTaskProps>) {
      const { columnName, taskId } = action.payload;
      const column = state.activeBoard?.columns.find(
        (col) => col.name === columnName
      );
      if (column) {
        column.tasks = column?.tasks.filter((task) => task.id !== taskId);
        saveBoardsToLS(state);
      }
    },
    changeTask(state, action: PayloadAction<changeTaskProps>) {
      const { task, colName } = action.payload;
      if (task.status === colName) {
        const column = state.activeBoard?.columns.find(
          (col) => col.name === task.status
        );
        if (column) {
          column.tasks = column.tasks.map((t) => {
            if (t.id === task.id) {
              return { ...task };
            }
            return t;
          });
          saveBoardsToLS(state);
        }
      } else {
        const columnPrev = state.activeBoard?.columns.find(
          (col) => col.name === colName
        );
        const columnNext = state.activeBoard?.columns.find(
          (col) => col.name === task.status
        );
        if (columnPrev) {
          columnPrev.tasks = columnPrev.tasks.filter((t) => t.id !== task.id);
        }
        if (columnNext) {
          columnNext.tasks.push({ ...task });
        }
        saveBoardsToLS(state);
      }
    },
    deleteColumn(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.activeBoard?.columns) {
        state.activeBoard.columns = state.activeBoard?.columns.filter(
          (col) => col.id !== id
        );
        saveBoardsToLS(state);
      }
    },
    changeColumnName(
      state,
      action: PayloadAction<{ id: string | number; value: string }>
    ) {
      const { id, value } = action.payload;
      const column = state.activeBoard?.columns.find(
        (column) => column.id === id
      );
      if (column) {
        column.name = value;
        column.tasks = column.tasks.map((task) => {
          return {
            ...task,
            status: value,
          };
        });
        saveBoardsToLS(state);
      }
    },
    changeBoardName(state, action: PayloadAction<string>) {
      if (state.activeBoard) {
        state.activeBoard.name = action.payload;
        saveBoardsToLS(state);
      }
    },
    addColumn(state, action: PayloadAction<string>) {
      const name = action.payload;
      if (state.activeBoard) {
        state.activeBoard.columns.push({
          name: name,
          id: state.activeBoard.columns.length,
          tasks: [],
        });
        saveBoardsToLS(state);
      }
    },
    addBoard(state, action: PayloadAction<string>) {
      const name = action.payload;
      if (state.boards) {
        const newBoard: IBoard = {
          name: name,
          id: state.boards.length,
          columns: [],
        };
        state.boards.push(newBoard as IBoard);
        state.activeBoard = newBoard;
        saveBoardsToLS(state);
        localStorageServive.setItem(
          "activeBoardIndex",
          state.boards.length - 1
        );
      }
    },
    deleteBoard(state) {
      const activeBoard = state.activeBoard;
      if (state.boards && state.boards.length > 0) {
        state.boards = state.boards.filter(
          (board) => board.id !== activeBoard?.id
        );
        if (state.boards.length > 0) {
          state.activeBoard = state.boards[0];
          localStorageServive.setItem("activeBoardIndex", 0);
        } else {
          state.activeBoard = null;
        }
        saveBoardsToLS(state);
      }
    },
    dragAndDropTask(state, action: PayloadAction<dragAndDropTaskProps>) {
      const { prev, nextColumn } = action.payload;
      console.log(prev, nextColumn);
      if (prev.taskStatus === nextColumn) {
        return;
      }
      const columnIndexPrev = state.activeBoard?.columns.findIndex(
        (col) => col.name === prev.taskStatus
      );
      const columnIndexNext = state.activeBoard?.columns.findIndex(
        (col) => col.name === nextColumn
      );

      if (
        columnIndexPrev !== undefined &&
        columnIndexPrev !== -1 &&
        state.activeBoard
      ) {
        const taskToMove = state.activeBoard.columns[
          columnIndexPrev
        ].tasks.find((task) => task.id === prev.taskId);
        if (taskToMove) {
          state.activeBoard.columns[columnIndexPrev].tasks =
            state.activeBoard.columns[columnIndexPrev].tasks.filter(
              (task) => task.id !== prev.taskId
            );
          if (columnIndexNext !== undefined && columnIndexNext !== -1) {
            taskToMove.status = nextColumn as string;
            state.activeBoard.columns[columnIndexNext].tasks.push(taskToMove);
          }
        }
        saveBoardsToLS(state);
      }
    },
  },
});

export const {
  changeBoard,
  changeSubTaskStatus,
  changeTaskStatus,
  deleteTask,
  deleteColumn,
  addTask,
  changeTask,
  changeColumnName,
  changeBoardName,
  addColumn,
  addBoard,
  deleteBoard,
  dragAndDropTask,
} = boardsSlice.actions;
export default boardsSlice.reducer;
