import React, { useState } from 'react';
import CalendarCompanent from '../Calendar-component';
import InputComponent from '../Input-component';
import './style.scss';

const AdvanceComponent: React.FC = () => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div>
      <InputComponent
        calssName="advance-input"
        labelName="Birthday"
        onFocus={() => setIsOpenDatePicker(true)}
        value={selectedDate}
        // onBlur={(e) => console.log(e)}
      />
      {isOpenDatePicker && (
        <CalendarCompanent
          okAndCancel={(type, date) => {
            if (type === 'ok') {
              setSelectedDate(date);
            }
            setIsOpenDatePicker(false);
          }}
        />
      )}
    </div>
  );
};

export default AdvanceComponent;
