import { useState } from "react";
import DateProvider from "../hoc/DateProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { endOfWeek, format, startOfWeek, addDays } from "date-fns";
import { WeekProps } from "../../views/Week";
import { LocaleArrow } from "../common/LocaleArrow";
import { useAppState } from "../../hooks/useAppState";

interface WeekDateBtnProps {
  selectedDate: Date;
  onChange(value: Date, key: "selectedDate"): void;
  weekProps: WeekProps;
}

const WeekDateBtn = ({
  selectedDate,
  onChange,
  weekProps,
}: WeekDateBtnProps) => {
  const { locale } = useAppState();
  const [open, setOpen] = useState(false);
  const { weekStartOn } = weekProps;
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: weekStartOn });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: weekStartOn });

  const toggleDialog = () => setOpen(!open);

  const handleChange = (e: Date | null, k?: string) => {
    onChange(e || new Date(), "selectedDate");
  };

  const handlePrev = () => {
    const ladtDayPrevWeek = addDays(weekStart, -1);
    onChange(ladtDayPrevWeek, "selectedDate");
  };
  const handleNext = () => {
    const firstDayNextWeek = addDays(weekEnd, 1);
    onChange(firstDayNextWeek, "selectedDate");
  };
  return (
    <div>
      <LocaleArrow type="prev" onClick={handlePrev} />
      <DateProvider>
        <DatePicker
          open={open}
          onClose={toggleDialog}
          openTo="day"
          views={["month", "day"]}
          value={selectedDate}
          onChange={handleChange}
          renderInput={(params) => (
            <Button
              ref={params.inputRef}
              style={{ padding: 4 }}
              onClick={toggleDialog}
            >{`${format(weekStart, "dd", { locale: locale })} - ${format(
              weekEnd,
              "dd MMMM yyyy",
              {
                locale: locale,
              }
            )}`}</Button>
          )}
        />
      </DateProvider>
      <LocaleArrow type="next" onClick={handleNext} />
    </div>
  );
};

export { WeekDateBtn };
