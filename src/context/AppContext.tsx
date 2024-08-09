import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { AppContextProps, IAppState } from "./types";
import { ViewTaskModal } from "../components/modals/ViewTaskModal";
import { DeleteModal } from "../components/modals/DeleteModal";
import { AddOrEditTaskModal } from "../components/modals/AddOrEditTaskModal";
import { EditModal } from "../components/modals/EditModal";
import { AddModal } from "../components/modals/AddModal";
import { localStorageServive } from "../services/LocalStorageService";
export const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<string>("BASE_STATE");
  const [appTheme, setAppTheme] = useState<string>(
    localStorageServive.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.querySelector("html");
    if (root) {
      root.dataset.theme = appTheme;
    }
  }, [appTheme]);

  const [appState, setAppState] = useState<IAppState>({
    currentColumnId: 0,
    currentTaskStatus: "",
    currentTaskId: "",
  });

  const updateAppStateField = (field: string, value: string | number): void => {
    setAppState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentModal,
        setCurrentModal,
        appState,
        updateAppStateField,
        appTheme,
        setAppTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const modalComponents: { [key: string]: JSX.Element | null } = {
  BASE_STATE: null,
  VIEW_TASK_MODAL: <ViewTaskModal />,
  DELETE_TASK_MODAL: <DeleteModal action="DELETE_TASK" />,
  EDIT_TASK_MODAL: <AddOrEditTaskModal isEdit={true} />,
  ADD_TASK_MODAL: <AddOrEditTaskModal isEdit={false} />,
  DELETE_COLUMN_MODAL: <DeleteModal action="DELETE_COLUMN" />,
  EDIT_COLUMN_MODAL: <EditModal action="EDIT_COLUMN" />,
  EDIT_BOARD_MODAL: <EditModal action="EDIT_BOARD" />,
  ADD_COLUMN_MODAL: <AddModal action="ADD_COLUMN" />,
  ADD_BOARD_MODAL: <AddModal action="ADD_BOARD" />,
  DELETE_BOARD_MODAL: <DeleteModal action="DELETE_BOARD" />,
};
