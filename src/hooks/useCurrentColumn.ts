import { useAppContext, useAppSelector } from ".";

export const useCurrentColumn = () => {
  const { appState } = useAppContext();
  const currentColumn = useAppSelector((state) =>
    state.boards.activeBoard?.columns.find(
      (col) => col.id === appState.currentColumnId
    )
  );
  return currentColumn;
};
