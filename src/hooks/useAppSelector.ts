import { useSelector } from "react-redux";
import type { RootState } from "../store/index";

export const useAppSelector = useSelector.withTypes<RootState>()