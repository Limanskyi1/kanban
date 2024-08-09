import { ReactNode } from "react";
import { useWindowSize } from "../hooks";
interface MainLayoutProps {
    aside: ReactNode,
    table: ReactNode,
}
export const MainLayout = ({ aside, table }: MainLayoutProps) => {

  const windowSize = useWindowSize();

  return (
    <div className="main-layout">
        {windowSize.width > 768 ? aside : null}
        {table}
    </div>
  );
};