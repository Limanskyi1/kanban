import { FC, useRef, useState } from "react";
import { IconDots } from "../../icons";
import "./DotsMenu.scss";
import { useOutsideClick } from "../../hooks";

interface DotsMenuProps {
  editText: string;
  deleteText: string;
  onClickDeleteText: () => void;
  onClickEditText: () => void;
}

export const DotsMenu: FC<DotsMenuProps> = ({ editText, deleteText , onClickDeleteText,onClickEditText}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const menuRef = useRef(null);

  const toogleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useOutsideClick(menuRef, () => setIsOpenMenu(false));

  const onClickDelete = ():void => {
    setIsOpenMenu(false);
    onClickDeleteText();
  }

  return (
    <div className="dots-menu">
      <IconDots onClick={() => toogleMenu()} />
      <div ref={menuRef} className={`sub-menu ${isOpenMenu ? "open" : ""}`}>
        <span className="edit" onClick={onClickEditText}>{editText}</span>
        <span className="delete" onClick={onClickDelete}>{deleteText}</span>
      </div>
    </div>
  );
};
