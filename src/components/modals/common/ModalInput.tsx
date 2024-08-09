import { ChangeEvent, FC } from "react";

interface ModalInputProps {
  title: string;
  name:string;
  value:string;
  error: string;
  onChange: (event:ChangeEvent<HTMLInputElement>) => void;
}

export const ModalInput: FC<ModalInputProps> = ({ title , name, onChange,value,error}) => {
  return (
    <div className="modal-input">
      <label htmlFor="title" className="modal-text">
        {title}
      </label>
      <div className={`modal-input-item ${error ? "error" : ""}`}>
        <input type="text" name={name} value={value} onChange={(event:ChangeEvent<HTMLInputElement>) => onChange(event)}/>
        {error ? <span className="error-message">Can’t be empty</span> : ""}
      </div>
    </div>
  );
};