import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainLayout } from "./layouts/MainLayout";
import { EmptyBoard } from "./components/EmptyBoard";
import { Board } from "./components/Board";
import { modalComponents } from "./context/AppContext";
import { useAppContext, useAppSelector } from "./hooks";
import { Button } from "./ui-components/Button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const { activeBoard, boards } = useAppSelector((state) => state.boards);
  const { currentModal, setCurrentModal } = useAppContext();

  const renderTable = () => {
    return activeBoard?.columns?.length! > 0 ? <Board /> : <EmptyBoard />;
  };

  const onClickCreateBoard = (): void => {
    setCurrentModal("ADD_BOARD_MODAL");
  };

  if (!boards || boards?.length < 1) {
    return (
      <>
        <div className="empty-app">
          <h3>
            There are no boards available. Create a new board to get started
          </h3>
          <Button className="btn-primary" onClick={onClickCreateBoard}>
            + Add New Board
          </Button>
        </div>
        {modalComponents[currentModal]};
      </>
    );
  }

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <MainLayout aside={<Sidebar />} table={renderTable()} />
      </DndProvider>
      {modalComponents[currentModal]}
    </>
  );
};
export default App;
