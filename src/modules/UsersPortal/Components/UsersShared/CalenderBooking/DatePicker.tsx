import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import { Box, Button, Popover, TextField } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { useState } from "react";
import type { RangeKeyDict } from "react-date-range";

interface DatePickerProps {
  dateRange: { startDate: Date | null; endDate: Date | null; key: string };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ startDate: Date | null; endDate: Date | null; key: string }>
  >;
}

export default function DatePicker({ dateRange, setDateRange }: DatePickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    // تحويل undefined → null قبل تعيين state
    setDateRange({
      startDate: selection.startDate ?? null,
      endDate: selection.endDate ?? null,
      key: selection.key ?? "selection",
    });

    if (selection.startDate && selection.endDate) {
      handleClose();
    }

    localStorage.setItem(
      "dateRange",
      JSON.stringify({
        startDate: selection.startDate?.toISOString() ?? null,
        endDate: selection.endDate?.toISOString() ?? null,
      })
    );
  };

  const pickerRange = {
    startDate: dateRange.startDate ?? undefined,
    endDate: dateRange.endDate ?? undefined,
    key: dateRange.key ?? "selection",
  };

  return (
    <Box>
      <Button
        sx={{ padding: "15px 20px", borderRadius: "12px", marginInlineEnd: "10px" }}
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
        aria-controls={id}
        aria-haspopup="dialog"
      >
        <CalendarMonth />
      </Button>

      <TextField
        onClick={handleButtonClick}
        label={`Pick Start & End Date`}
        value={
          dateRange.startDate && dateRange.endDate
            ? `${dayjs(dateRange.startDate).format("YYYY-MM-DD")} - ${dayjs(
                dateRange.endDate
              ).format("YYYY-MM-DD")}`
            :"Pick Start & End Date"
        }
        InputProps={{ readOnly: true }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <DateRangePicker
          ranges={[pickerRange]}
          onChange={handleDateChange}
          minDate={dayjs().startOf("day").toDate()}
        />
      </Popover>
    </Box>
  );
}
