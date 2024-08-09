import { useMemo } from 'react';
import { useAppSelector } from './useAppSelector';
import { IColumn } from '../types';

export const useSelectOptions = () => {
  const columns = useAppSelector((state) => state.boards.activeBoard?.columns || []);
  
  const selectOptions = useMemo(() => {
    return columns.map((col: IColumn) => col.name);
  }, [columns]);
  
  return selectOptions;
};
