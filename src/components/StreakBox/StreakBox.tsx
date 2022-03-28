import './streakBox.scss'

interface StreakBoxProps {
  data: number[]
}

export const StreakBox = ({ data }: StreakBoxProps) => {
  const today = new Date().getDay()
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div className="streak-box">
      <div className="streak-box__header">
        <h4>This week</h4>
      </div>
      <div className="streak-box__content">
        <div className="week-summary">
          <span>{data.length} / 7 days</span>
        </div>
        <div className="week-container">
          {days.map((day, i) => {
            const dayInStreak = data.includes(i + 1)

            return (
              <div key={day + i} className={`day${dayInStreak ? '__streak' : ''}`} id={i + 1 === today ? 'today' : ''}>
                <span>{day}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
