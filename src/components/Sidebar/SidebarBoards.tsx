import { FC } from "react";
import { IBoard } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IconBoard } from "../../icons";
import { changeBoard } from "../../store/boardsSlice";

export const SidebarBoards: FC = () => {
  const dispatch = useAppDispatch();
  const { boards, activeBoard } = useAppSelector((state) => state.boards);
  
  const handleChangeBoard = (index: number): void => {
    dispatch(changeBoard(index));
  };

  const renderBoards = (): JSX.Element[] => {
    if (boards) {
      return boards?.map((board: IBoard, index: number) => (
        <div
          key={index}
          onClick={() => handleChangeBoard(index)}
          className={`board ${activeBoard?.id === board.id ? "active" : ""}`}
        >
          <IconBoard />
          <p className="text-grey-15">{board.name}</p>
        </div>
      ));
    }
    return [];
  };
  return <>{renderBoards()}</>;
};
