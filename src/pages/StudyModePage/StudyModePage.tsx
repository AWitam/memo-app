import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ROUTES } from '../../app/routes';
import type { StudySet } from '../../common/types';
import { FlashCardsSlider } from '../../components/FlashcardsSlider/FlashCardsSlider';
import { Quiz } from '../../components/quiz/Quiz'
import type  { Terms } from '../../state/types';
import { capitalize } from '../../utils/capitalize';

export const StudyModePage = ({ mode, onlyFavorites }: { mode: string; onlyFavorites?: boolean }) => {
  const { studySetId } = useParams();
  const isLoading = useAppSelector((state) => state.collections.isLoading);

  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  );

  const termsInCurrentStudySet = useAppSelector(
    (state) =>
      state.termsData.terms.find((termsData: Terms) => termsData.termsId === currentStudySet?.summary.termsId)
        ?.termItems
  );
  const navigate = useNavigate();
  const redirectOnFinish = () => navigate(`/${ROUTES.studySet}/${studySetId}`);

  const filteredItems = termsInCurrentStudySet!.filter((item) => item.isFavorite);

  return (
    <section>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="section__title">
          <h1>{currentStudySet?.summary.title}</h1>
          <h3>{capitalize(mode)}</h3>
        </div>
      )}
      <div className="content">
        {termsInCurrentStudySet && mode === 'flashcards' && (
          <FlashCardsSlider terms={onlyFavorites ? filteredItems : termsInCurrentStudySet} finish={redirectOnFinish} />
        )}
        {termsInCurrentStudySet && mode === 'quiz' && (
          <Quiz terms={onlyFavorites ? filteredItems : termsInCurrentStudySet} finish={redirectOnFinish} />
        )}
      </div>
    </section>
  );
};
