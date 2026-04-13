import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  ...(selected && {
    backgroundColor: '#000 !important', 
    color: '#fff',           
    '&:hover': {
        backgroundColor: '#000 !important',
    },
  }),
}));

export default function CalendarPicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const handleChange = (newDate) => {
    setSelectedDate(newDate);
    onDateChange(newDate.format("YYYY-MM-DD"));
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <StaticDatePicker
          value={selectedDate}
          onChange={handleChange}
          slotProps={{
            toolbar: { toolbarTitle: '' }
          }}
          slots={{
            day: CustomPickersDay,
            actionBar:()=> null
          }}
          sx={{
            backgroundColor: '#B6DDE1',
            borderRadius: 2,
            p: 2
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

