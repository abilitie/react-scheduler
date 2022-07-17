/// <reference types="react" />
import { onClickCell } from "../../types";
interface CellProps {
    start: Date;
    end: Date;
    resourceKey: string;
    resourceVal: string | number;
    children?: JSX.Element;
    onClickCell?: onClickCell;
    disableCellClick?: boolean;
}
declare const Cell: ({ start, end, resourceKey, resourceVal, onClickCell, disableCellClick, children, }: CellProps) => JSX.Element;
export { Cell };
