import { FC, ReactNode } from "react";
interface ButtonProps {
    className: string,
    children: string | ReactNode,
    onClick: () => void,

}
export const Button:FC<ButtonProps> = ({className,children,onClick}) => {
  return (
    <button type="button" onClick={onClick} className={className}>{children}</button>
  );
}
