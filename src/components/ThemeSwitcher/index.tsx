import { FC } from "react";
import { useAppContext } from "../../hooks";
import { IconMoon, IconSun } from "../../icons"
import { localStorageServive } from "../../services/LocalStorageService";

export const ThemeSwitcher:FC = () => {
  const {appTheme,setAppTheme} = useAppContext();  

  const toggleTheme = () => {
    const newTheme = appTheme === "light" ? "dark" : "light";
    setAppTheme(newTheme);
    localStorageServive.setItem("theme",newTheme);
  };

  return (
    <div className={`theme-switcher ${appTheme === "light" ? "" : "dark"}`}>
      <IconSun/>
      <div className={`toggle`} onClick={toggleTheme}>
        <span></span>
      </div>
      <IconMoon />
    </div>
  );
};
