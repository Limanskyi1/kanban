import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Column } from "../Column";
import "./Board.scss";
import { IColumn } from "../../types";
import { useAppContext } from "../../hooks";



export const Board:FC = () => {
  const { activeBoard } = useAppSelector((state) => state.boards);
  const { setCurrentModal } = useAppContext();

  const renderColumns = ():JSX.Element[] => {
    if(activeBoard){
      return activeBoard?.columns?.map((column:IColumn) => (
        <Column key={column.name} name={column.name} tasks={column.tasks} id={column.id} />
      ));
    }
    return [];
  };


  const onClickNewColumn = ():void => {
    setCurrentModal("ADD_COLUMN_MODAL");
  };
  

  return (
    <>
      <div className="board" style={{gridTemplateColumns: `repeat(${activeBoard?.columns.length as number + 1},280px)`}}>
        {renderColumns()}
        <div className="add-col" onClick={onClickNewColumn}>+ New Column</div>
      </div>
    </>
  );
};
