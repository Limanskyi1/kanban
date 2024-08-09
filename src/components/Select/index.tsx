import { Dispatch, FC, SetStateAction, useState } from "react";
import './Select.scss';
import { IconArrow } from "../../icons";

interface SelectProps {
    options: string[];
    selectedOption: string;
    setSelectedOption: Dispatch<SetStateAction<string>> | any;
}

export const Select: FC<SelectProps> = ({options,selectedOption,setSelectedOption}) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const toogleSelectVisible = () => {
    setIsOpen(!isOpen);
  }
  const onClickSelectValue = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOption(option);
    setIsOpen(false);  
  } 

  return (
    <div className={`select ${isOpen ? "open" : ""}`} onClick={toogleSelectVisible}>
      <div className="selected-value">
        <span>{selectedOption}</span>
        <IconArrow/>
        </div>
      <ul className="select-menu">
        {options.map(option => (
            <li key={option} onClick={(e) => onClickSelectValue(option,e)}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

