import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

//https://www.npmjs.com/package/react-datepicker
//https://reactdatepicker.com/

const Datepicker = ({date, setDate}:any) => {
  return (
    <DatePicker locale={ko} selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd"/>
  );
};

export default Datepicker;