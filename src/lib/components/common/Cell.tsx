import { alpha, Button, useTheme } from "@mui/material";
import { useAppState } from "../../hooks/useAppState";
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

const Cell = ({
  start,
  end,
  resourceKey,
  resourceVal,
  onClickCell,
  disableCellClick,
  children,
}: CellProps) => {
  const { triggerDialog, onDrop } = useAppState();
  const theme = useTheme();

  return (
    <Button
      className={disableCellClick ? "disabledCell" : ""}
      style={
        disableCellClick ? { cursor: "default", backgroundColor: "white" } : {}
      }
      disableRipple={disableCellClick}
      fullWidth
      onClick={() => {
        if (disableCellClick) {
          return;
        }
        if (onClickCell) {
          onClickCell(start, end, resourceKey, resourceVal, () =>
            triggerDialog(true, {
              start,
              end,
              [resourceKey]: resourceVal,
            })
          );
        } else {
          triggerDialog(true, {
            start,
            end,
            [resourceKey]: resourceVal,
          });
        }
      }}
      onDragOver={(e) => {
        e.currentTarget.style.backgroundColor = alpha(
          theme.palette.secondary.main,
          0.3
        );
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.currentTarget.style.backgroundColor = alpha(
          theme.palette.secondary.main,
          0.3
        );
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.backgroundColor = "";
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "";
        const eventId = e.dataTransfer.getData("text");
        onDrop(eventId, start, resourceKey, resourceVal);
      }}
    >
      {children}
    </Button>
  );
};

export { Cell };
