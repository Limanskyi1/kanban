import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeBoard } from "../../store/boardsSlice";

export const HeaderMobileDropDown = () => {
  const dispatch = useAppDispatch();
  const { boards, activeBoard } = useAppSelector((state) => state.boards);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeBoard = (index: number): void => {
    dispatch(changeBoard(index));
  };

  return (
    <div
      className={`header-drop-down ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="active">
        <p>{activeBoard?.name}</p>
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
        </svg>
      </div>
      <ul>
        {boards?.map((board, index) => (
          <li
            style={{ display: `${board.id === activeBoard?.id ? "none" : ""}` }}
            onClick={() => handleChangeBoard(index)}
          >
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
