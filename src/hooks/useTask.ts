import { useSelector } from 'react-redux';
import { useAppContext } from '.';
import { IColumn, ITask } from '../types';

export const useTask = () => {

  const { appState } = useAppContext();

  return useSelector<any>(state => {
    const column:IColumn = state.boards?.activeBoard?.columns?.find((column:IColumn) => column.name === appState.currentTaskStatus);
    if (column) {
      return column.tasks.find((task:ITask) => task.id === appState.currentTaskId);
    }
    return null;
  });
};