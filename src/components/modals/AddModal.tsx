import { ChangeEvent, FC, useRef, useState } from "react";
import { ModalInput } from "./common/ModalInput";
import { useAppContext, useAppDispatch, useOutsideClick } from "../../hooks";
import { Button } from "../../ui-components/Button";
import { addBoard, addColumn } from "../../store/boardsSlice";

interface AddModalProps {
  action: string;
}

interface IAddState {
  value: string;
  error: string;
}

export const AddModal: FC<AddModalProps> = ({ action }) => {
  const dispatch = useAppDispatch();
  const { setCurrentModal } = useAppContext();
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setCurrentModal("BASE_STATE"));

  const [addState, setAddState] = useState<IAddState>({
    value: "",
    error: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddState({ ...addState, value: e.target.value, error: "" });
  };

  const handleSubmit = () => {
    if (addState.value.trim() === "") {
      setAddState({ ...addState, error: "Name cannot be empty" });
      return;
    }
    if (action === "ADD_COLUMN") {
      dispatch(addColumn(addState.value));
    }
    if (action === "ADD_BOARD") {
      dispatch(addBoard(addState.value));
    }
    setCurrentModal("BASE_STATE");
  };

  return (
    <div className="modal-layout">
      <div className="modal add-modal" ref={modalRef}>
        <h3 className="modal-title-black mb-24">
          {action === "ADD_COLUMN" ? "Add New Column" : "Add New Board"}
        </h3>
        <ModalInput
          onChange={handleChange}
          title="Name"
          name=""
          value={addState.value}
          error={addState.error}
        />
        <Button className="btn-primary" onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </div>
  );
};
