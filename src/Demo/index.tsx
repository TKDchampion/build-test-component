import React from 'react';
import CalendarCompanent from '../components/Calendar-component';
import InputComponent from '../components/Input-component';

const Demo: React.FC = () => {
  return (
    <div>
      <h1>Demo</h1>
      <div className='row'>
        <div className='col-4'>
          <h2>Password Input</h2>
          <InputComponent />
        </div>
        <div className='col-4'>
          <h2>Calendar</h2>
          <CalendarCompanent />
        </div>
      </div>
    </div>
  );
};

export default Demo;
