import { FC } from "react";
import { IconPlus, Logo, LogoWhite, MobileLogo } from "../../icons";
import { Button } from "../../ui-components/Button";
import { useAppSelector, useAppContext,useWindowSize } from "../../hooks";
import { DotsMenu } from "../DotsMenu";
import "./Header.scss";
import { HeaderMobileDropDown } from "./HeaderMobileDropDown";


export const Header: FC = () => {
  const windowSize = useWindowSize();
  const { activeBoard } = useAppSelector((state) => state.boards);
  const { setCurrentModal, appTheme } = useAppContext();

  const onClickAdd = (): void => {
    setCurrentModal("ADD_TASK_MODAL");
  };

  const onClickEditText = () => {
    setCurrentModal("EDIT_BOARD_MODAL");
  };

  const onClickDeleteText = () => {
    setCurrentModal("DELETE_BOARD_MODAL");
  };
  const setLogo = () => {
    if (windowSize.width > 768) {
      return appTheme === "light" ? <Logo /> : <LogoWhite />;
    } else {
      return <MobileLogo />;
    }
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">{setLogo()}</div>
        <div className="header__right">
          {windowSize.width > 768 ? (
            <h2 className="title-24">{activeBoard?.name}</h2>
          ) : (
            <HeaderMobileDropDown />
          )}
          <Button className="btn-primary" onClick={onClickAdd}>
            {windowSize.width > 768 ? "+ Add New Task" : <IconPlus/>}
          </Button>
          <DotsMenu
            editText="Edit"
            deleteText="Delete"
            onClickDeleteText={onClickDeleteText}
            onClickEditText={onClickEditText}
          />
        </div>
      </div>
    </header>
  );
};
