import { FC } from "react";
import { Button } from "../../ui-components/Button";
import './EmptyBoard.scss';
import { useAppContext } from "../../hooks";

export const EmptyBoard:FC = () => {
  const { setCurrentModal } = useAppContext();
  const onClickNewColumn = ():void => {
    setCurrentModal("ADD_COLUMN_MODAL");
  }
  return (
    <div className="emptyBoard">
      <p className="text-md-grey-18">This board is empty. Create a new column to get started.</p>
      <Button className="btn-primary" onClick={onClickNewColumn}>
        + Add New Column
      </Button>
    </div>
  );
};
