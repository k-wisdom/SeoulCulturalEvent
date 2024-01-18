import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

//https://www.npmjs.com/package/react-datepicker
//https://reactdatepicker.com/

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
const Datepicker = ({ date, setDate }: Props) => {
  return (
    <DatePicker
      locale={ko}
      selected={date}
      onChange={(date) => setDate(date as Date)}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default Datepicker;
