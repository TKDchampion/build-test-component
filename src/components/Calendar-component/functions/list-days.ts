import moment from 'moment';

// GLobal Vars
const SEVENDAYS = 7; // a week

// Process weekly information
const processWeekDays = (mmt: any, isFirstWeek = false) => {
  const totalDays = mmt.daysInMonth();

  // isFirstDay=true, Get the first day of the first week, on what day of the week
  // isFirstDay=false, Start from Sunday
  const startDay = isFirstWeek ? mmt.startOf('month').day() : 0;

  const weekDays = Array(SEVENDAYS).fill(0); // a week array
  let isFinished = false; 
  for (let d = startDay; d < SEVENDAYS; d++) {
    weekDays[d] = mmt.date(); // Starting from what day of the week

    if (mmt.date() !== totalDays) mmt.add(1, 'day');
    else {
      isFinished = true; //last day
      break;
    }
  }

  return { weekDays, isFinished };
};

export const getWeeksInMonth = (monthYear: string) => {
  const mmt = new (moment as any)(monthYear);
  const weekDayList = [];

  // first week
  const { weekDays } = processWeekDays(mmt, true);
  weekDayList.push(...weekDays);

  // other week
  let loopStatus = false;
  while (!loopStatus) {
    const result = processWeekDays(mmt);
    weekDayList.push(...result.weekDays);
    loopStatus = result.isFinished;
  }

  return weekDayList; // Full days
};