import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import type { TermItem, StudySet } from '../../common/types';
import { fetchTerms, toggleFavorite } from '../../state/studySet/termsSlice';
import { ReactComponent as RightArrowIcon } from '../../assets/icons/short-right.svg';
import { ReactComponent as StarIconOutlined } from '../../assets/icons/star-outline.svg';
import { ReactComponent as StarIconFilled } from '../../assets/icons/star-filled.svg';
import './studySetPage.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { StudySetCard } from '../../components/StudySetCard/StudySetCard';
import type { Terms } from '../../state/types';
import type { AppDispatch } from '../../app/store';

export const StudySetPage = () => {
  const { studySetId } = useParams();

  const isLoading = useAppSelector((state) => state.collections.isLoading);
  const termsLoading = useAppSelector((state) => state.termsData.isLoading);
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  );
  const termsInCurrentStudySet = useAppSelector(
    (state) =>
      state.termsData.terms.find((termsData: Terms) => termsData.termsId === currentStudySet?.summary.termsId)
        ?.termItems
  );

  const dispatch = useDispatch<AppDispatch>();
  const [filteredItems, setFilteredItems] = useState<TermItem[] | null>(null);
  const [selected, setSelected] = useState('all');

  useEffect(() => {
    if (!termsLoading && !termsInCurrentStudySet) {
      currentStudySet && dispatch(fetchTerms(currentStudySet.summary.termsId));
    }
  }, [termsLoading]);

  const handleToggleFavorite = (termId: string, value: boolean) => {
    dispatch(
      toggleFavorite({
        termsId: currentStudySet?.summary.termsId,
        termId,
        value,
      })
    );
  };

  const handleSelectItems = (e: React.ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value);

  useEffect(() => {
    if (selected == 'favorites' && termsInCurrentStudySet) {
      setFilteredItems(termsInCurrentStudySet.filter((item: TermItem) => item.isFavorite));
    }

    if (selected == 'all' && termsInCurrentStudySet) {
      setFilteredItems(null);
    }
  }, [selected, termsInCurrentStudySet]);

  return (
    <section id="study-set-page">
      <div className="section__title">
        <h1>Study set overview</h1>
      </div>
      <div className="section__study-set-overview">
        {isLoading ? <div>Loading...</div> : currentStudySet && <StudySetCard studySet={currentStudySet} />}
      </div>
      {renderStudyModes(!!filteredItems)}
      <div className="section__article">
        <div className="terms__header">
          <h3>Terms in this set:</h3>
          {renderTermsFilter(selected, handleSelectItems)}
        </div>

        <div className="terms__container">
          {!termsInCurrentStudySet
            ? 'loading'
            : renderStudySetTerms(filteredItems ?? termsInCurrentStudySet, handleToggleFavorite)}
        </div>
      </div>
    </section>
  );
};

const renderStudyModes = (onlyFavorites: boolean) => {
  return (
    <div className="section__sidebar">
      <h3>Choose study mode:</h3>
      {onlyFavorites && <span className="selection-badge">Favorites selected</span>}
      <ul className="study-mode__list">
        <li className="study-mode__list--item">
          <Link to={onlyFavorites ? `${ROUTES.flashcardMode}/fav` : ROUTES.flashcardMode}>
            <RightArrowIcon />
            Flashcards
          </Link>
        </li>
        <li className="study-mode__list--item">
          <Link to={onlyFavorites ? `${ROUTES.quizMode}/fav` : ROUTES.quizMode}>
            <RightArrowIcon />
            Quiz
          </Link>
        </li>
      </ul>
    </div>
  );
};

const renderStudySetTerms = (terms: TermItem[], onToggleFavorite: (id: string, option: boolean) => void) => {
  return (
    <>
      {terms.map((item: TermItem) => (
        <div className="terms__item" key={item.id}>
          <div>
            <div className="terms__item--term">{item.term}</div>
            <div className="terms__item--definition">{item.definition}</div>
          </div>
          <div>
            {item.isFavorite ? (
              <StarIconFilled onClick={() => onToggleFavorite(item.id, false)} />
            ) : (
              <StarIconOutlined onClick={() => onToggleFavorite(item.id, true)} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

const renderTermsFilter = (selected: string, selectItems: (e: React.ChangeEvent<HTMLSelectElement>) => void) => {
  return (
    <div className="terms__filter">
      <select name="terms-filter" id="terms-filter" value={selected} onChange={selectItems}>
        <option value="all">All</option>
        <option value="favorites">Favorites</option>
      </select>
    </div>
  );
};
