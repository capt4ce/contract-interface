import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = (props: any) => {
  return (
    <DatePicker
      {...props}
      showTimeSelect
      selected={props.value}
      onChange={(date) =>
        props.onChange({ target: { name: props.name, value: date } })
      }
    />
  );
};

export default Datepicker;
