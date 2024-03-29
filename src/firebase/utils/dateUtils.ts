export const getWeekRange = () => {
  const today = new Date();
  const todayDayNum = today.getDay();
  // day of month - day of week (-6 if Sunday), otherwise +1
  const first = today.getDate() - todayDayNum + (todayDayNum == 0 ? -6 : 1);
  const last = first + 6;

  const firstDay = new Date(today.setDate(first)).toLocaleDateString().slice(0, 10); // yyyy-mm-dd
  const lastDay = new Date(today.setDate(last)).toLocaleDateString().slice(0, 10);

  return { firstDay, lastDay };
};


export const getNextRepetitionDate = (nextRepetition: number) => {
  const now = new Date().getDate()
  return new Date().setDate(now + nextRepetition)
}

export const getDayMonthFormat = (time: number) => {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' });
  return `${day} ${month}`
}