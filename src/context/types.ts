import { Dispatch, SetStateAction } from "react";

export interface ItaskState {
    status: string;
    id: string | number;
}

export interface addOrEditModalState {
    isOpen: boolean;
    isEdit: boolean;
}

export interface IAppState {
    currentColumnId: number;
    currentTaskStatus: string;
    currentTaskId: string;
  }

export interface AppContextProps {
    currentModal: string;
    setCurrentModal: Dispatch<SetStateAction<string>>;
    appState: IAppState;
    updateAppStateField: (field:string, value:string|number) => void;
    appTheme:string;
    setAppTheme:  Dispatch<SetStateAction<string>>;
}