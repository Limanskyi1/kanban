import { FC, useRef, useState, ChangeEvent } from "react";
import { ModalInput } from "./common/ModalInput";
import {
  useAppContext,
  useAppDispatch,
  useAppSelector,
  useOutsideClick,
  useCurrentColumn,
} from "../../hooks";
import { Button } from "../../ui-components/Button";
import { changeBoardName, changeColumnName } from "../../store/boardsSlice";
import { ModalWrapper } from "./common/ModalWrapper";

interface EditModalProps {
  action: string;
}

interface IEditState {
  value: string;
  error: string;
}
export const EditModal: FC<EditModalProps> = ({ action }) => {
  const dispatch = useAppDispatch();
  const { setCurrentModal } = useAppContext();
  const currentColumn = useCurrentColumn();
  const { activeBoard } = useAppSelector((state) => state.boards);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => setCurrentModal("BASE_STATE"));

  const initialName =
    action === "EDIT_COLUMN" ? currentColumn?.name : activeBoard?.name;

  const [editState, setEditState] = useState<IEditState>({
    value: initialName as string,
    error: "",
  });

  const createTitle = () => {
    if (action === "EDIT_COLUMN") {
      return "Edit Column";
    }
    if (action === "EDIT_BOARD") {
      return "Edit Board";
    }
    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...editState, value: e.target.value, error: "" });
  };

  const handleSubmit = () => {
    if (editState.value.trim() === "") {
      setEditState({ ...editState, error: "Name cannot be empty" });
      return;
    }
    if (action === "EDIT_COLUMN") {
      const payload = {
        id: currentColumn?.id as string | number,
        value: editState.value,
      };
      dispatch(changeColumnName(payload));
    }
    if (action === "EDIT_BOARD") {
      const payload = editState.value;
      dispatch(changeBoardName(payload));
    }
    setCurrentModal("BASE_STATE");
  };

  return (
    <div className="modal-layout edit-modal">
      <ModalWrapper>
        <div ref={modalRef}>
          <h3 className="modal-title-black mb-24">{createTitle()}</h3>
          <form onSubmit={handleSubmit}>
            <ModalInput
              title="Name"
              name="col-name"
              value={editState.value}
              error={editState.error}
              onChange={handleChange}
            />
            <Button className="btn-primary" onClick={handleSubmit}>
              Save
            </Button>
          </form>
        </div>
      </ModalWrapper>
    </div>
  );
};
