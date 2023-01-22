import { useUserStreakData } from '../../hooks/useUserData';
import './streakBox.scss';

export const StreakBox = () => {
  const { isLoadingData, user } = useUserStreakData();
  const today = new Date().getDay();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="streak-box">
      <div className="streak-box__header">
        <h4>This week</h4>
      </div>
      {isLoadingData ? (
        'Loading...'
      ) : (
        <div className="streak-box__content">
          <div className="week-summary">
            <span>{user?.streakData.length} / 7 days</span>
          </div>
          <div className="week-container">
            {days.map((day, i) => {
              const dayInStreak = user?.streakData.includes(i + 1);

              return (
                <div
                  key={day + i}
                  className={`day${dayInStreak ? '__streak' : ''}`}
                  id={i + 1 === today ? 'today' : ''}
                >
                  <span>{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
