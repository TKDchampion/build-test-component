import React, { useEffect, useState } from 'react';
import { getWeeksInMonth } from './list-days';
import './style.scss';
import moment from 'moment';
import classNames from 'classnames';

const nowMonthYear = new (moment as any)().format('MMMM YYYY');
const nowDay = new (moment as any)().format('DD');

const CalendarCompanent: React.FC = () => {
  const [days, setDays] = useState<number[]>([]);
  const [monthYear, setMonthYear] = useState('');
  const [selectDate, setSelectDate] = useState({ monthYear: nowMonthYear, day: nowDay });
  const [isOpenYearPicker, setIsOpenYearPicker] = useState(false);

  useEffect(() => {
    setMonthYear(nowMonthYear);
    const daysList: number[] = getWeeksInMonth(nowMonthYear);
    setDays(daysList);
  }, []);

  const prev = () => {
    const newMonthYear = (moment as any)(monthYear).subtract(1, 'months').format('MMMM YYYY');
    setMonthYear(newMonthYear);
    const daysList: number[] = getWeeksInMonth(newMonthYear);
    setDays(daysList);
  };

  const next = () => {
    const newMonthYear = (moment as any)(monthYear).add(1, 'months').format('MMMM YYYY');
    setMonthYear(newMonthYear);
    const daysList: number[] = getWeeksInMonth(newMonthYear);
    setDays(daysList);
  };

  return (
    <div className="calendar-component-box">
      <div className='calendar-txt'>Text</div>
      <div className="calendar-title">{(moment as any)(monthYear).format('MMM, YYYY')}</div>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <div className="calendar-arrow" onClick={prev}>
          {'<'}
        </div>
        <div className="calendar-sub-title" onClick={() => setIsOpenYearPicker((value) => !value)}>
          {isOpenYearPicker ? monthYear.split(' ')[1] : monthYear}
        </div>
        <div className="calendar-arrow" onClick={next}>
          {'>'}
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-body-week-day">
          <div className="calendar-body-week-item">Su</div>
          <div className="calendar-body-week-item">Mo</div>
          <div className="calendar-body-week-item">Tu</div>
          <div className="calendar-body-week-item">We</div>
          <div className="calendar-body-week-item">Th</div>
          <div className="calendar-body-week-item">Fr</div>
          <div className="calendar-body-week-item">Sa</div>
        </div>
        <div className="calendar-body-days">
          {days.map((day, index) => {
            const style = classNames(
              'calendar-body-days-item',
              { fixed: nowMonthYear === monthYear && day === parseInt(nowDay) },
              { active: selectDate?.monthYear === monthYear && selectDate?.day === day },
            );
            return (
              <div
                key={index}
                className={style}
                onClick={() => day !== 0 && setSelectDate({ day, monthYear: monthYear })}>
                {day === 0 ? '' : day}
              </div>
            );
          })}
        </div>
        {isOpenYearPicker && (
          <div className="calendar-body-year-picker">
            {Array(20)
              .fill(2021)
              .map((year: number, index: number) => {
                const style = classNames('calendar-body-year-picker-item', {
                  active: `${year + index}` === monthYear.split(' ')[1],
                });
                return (
                  <div
                    className={style}
                    onClick={() => {
                      setMonthYear(`${monthYear.split(' ')[0]} ${year + index}`);
                      setIsOpenYearPicker(false);
                    }}>
                    {year + index}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className='d-flex mt-3 justify-content-end'>
        <div className='calendar-button'>Cancel</div>
        <div className='calendar-button ok'>Ok</div>
      </div>
    </div>
  );
};

export default CalendarCompanent;
