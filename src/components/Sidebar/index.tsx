import { FC, useState } from "react";
import { IconBoard, IconEye, IconEyeOpen } from "../../icons";
import { useAppSelector, useAppContext } from "../../hooks";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { SidebarBoards } from "./SidebarBoards";
import "./Sidebar.scss";

export const Sidebar: FC = () => {
  const [openSidebar, setOpenSidebar] = useState<Boolean>(true);
  const { setCurrentModal } = useAppContext();
  const { boards } = useAppSelector((state) => state.boards);
  const handleOpenSidebar = (): void => setOpenSidebar(true);
  const handleCloseSidebar = (): void => setOpenSidebar(false);
  const onClickCreateBoard = (): void => {
    setCurrentModal("ADD_BOARD_MODAL");
  };

  return (
    <aside className={`sidebar ${openSidebar ? "open" : ""}`}>
      <p className="count text-grey-12">ALL BOARDS ({boards?.length})</p>
      <div className="boards">
        <SidebarBoards/>
        </div>
      <div className="create__board">
        <IconBoard />
        <p className="text-purple-15" onClick={onClickCreateBoard}>
          + Create New Board
        </p>
      </div>
      <ThemeSwitcher/>
      <div className="sidebar__hide" onClick={handleCloseSidebar}>
        <IconEye />
        <p className="text-grey-15">Hide Sidebar</p>
      </div>
      <div className="sidebar__open" onClick={handleOpenSidebar}>
        <IconEyeOpen />
      </div>
    </aside>
  );
};
