import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserStudySets } from '../../state/studySet/studySetsSlice';
import { getUserStreakData } from '../../state/user/userSlice';
import { StreakBox } from '../../components/StreakBox/StreakBox';
import './home.scss';
import { StudySet } from '../../common/types';
import { StudySetCard } from '../../components/StudySetCard/StudySetCard';
import { Button, ButtonType } from '../../components/Button/Button';
import { ReactComponent as ArrowRight } from '../../assets/icons/short-right.svg';
import { AppDispatch } from '../../app/store';

export const Home = () => {
  const isLoading = useAppSelector((state) => state.auth.authState.isLoading);
  const studySets = useAppSelector((state) => state.collections.studySets);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user && !user.streakData) {
      dispatch(getUserStreakData(user.uid));
    }
  }, [user]);

  useEffect(() => {
    if (studySets.length < 1) {
      user && dispatch(fetchUserStudySets(user.uid));
    }
  }, [studySets]);

  return (
    <section id="home">
      <div className="section__title">
        <h1>Home</h1>
      </div>
      <div className="section__column">
        <article>
          <h2>Your collection</h2>
          {isLoading && 'Loading...'}
          {studySets && studySets.length > 0 ? (
            <>
              {studySets.slice(0, 3).map((studySet: StudySet) => (
                <StudySetCard key={studySet.studySetId} studySet={studySet} displayAsLink={true} />
              ))}
              <div className="article__end">
                <Link to={ROUTES.collection}>
                  <span className="icon-link">
                    See all <ArrowRight />
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {!isLoading && studySets.length === 0 && (
                <div>
                  <h4>You dont have any study sets yet !</h4>
                  <Link to={ROUTES.newStudySet}>
                    <Button type={ButtonType.primary}>create new</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </article>
      </div>
      <div className="section__sidebar">
        <article>
          <h2>Your activity</h2>
          {user?.streakData && <StreakBox data={user.streakData} />}
        </article>
      </div>
    </section>
  );
};
