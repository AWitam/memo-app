export const getWeekRange = () => {
  const today = new Date()
  const first = today.getDate() - today.getDay() + 1
  const last = first + 6

  const firstDay = new Date(today.setDate(first)).toISOString().slice(0, 10) // yyyy-mm-dd
  const lastDay = new Date(today.setDate(last)).toISOString().slice(0, 10)

  return { firstDay, lastDay }
}
