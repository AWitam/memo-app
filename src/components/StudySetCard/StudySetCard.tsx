import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useRef, useState } from 'react';
import type { StudySet } from '../../common/types';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import './studySetCard.scss';
import { Button } from '../Button/Button';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { getTermsFormat } from '../../utils/getTermsFormat';
import { useDeleteStudySet } from '../../hooks/useDeleteStudySet';
import { getDayMonthFormat, getNextRepetitionDate } from '../../firebase/utils/dateUtils';
import { Badge } from '../Badge/Badge';
import { IconRepeat } from '@tabler/icons';

interface StudySetCardProps {
  studySet: StudySet;
  displayAsLink?: boolean;
}

export const StudySetCard = ({ studySet, displayAsLink }: StudySetCardProps) => {
  const {
    summary: { title, termsId },
    studySetId,
  } = studySet;
  const { handleDelete } = useDeleteStudySet();
  const navigate = useNavigate();

  return (
    <div className="study-set__card" key={title}>
      {displayAsLink ? (
        <Link to={`/${ROUTES.studySet}/${studySetId}`}>{renderStudySetCardContent(studySet)}</Link>
      ) : (
        renderStudySetCardContent(studySet)
      )}

      <SettingsModal
        onDelete={() => handleDelete(studySetId, termsId)}
        onEdit={() => navigate(`/${ROUTES.studySet}/${studySetId}/edit`)}
      />
    </div>
  );
};

const SettingsModal = ({ onDelete, onEdit }: any) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const handleOutsideClick = () => setOpen(false);
  useOutsideClick(optionsRef, handleOutsideClick);

  return (
    <div ref={optionsRef}>
      <Button className="options__button" onClick={() => setOpen(!isOpen)}>
        <DotsIcon />
      </Button>

      {isOpen && (
        <div className="study-set__card--options">
          <Button className="options__item" onClick={onDelete}>
            <TrashIcon />
            <span>Delete</span>
          </Button>
          <Button className="options__item" onClick={onEdit}>
            <EditIcon />
            <span>Edit</span>
          </Button>
        </div>
      )}
    </div>
  );
};

const renderStudySetCardContent = (studySet: StudySet) => {
  const {
    summary: { title, description, numberOfItems },
    progress,
  } = studySet;

  const nextRepetition =
    progress?.interval && progress.interval > 0 ? getDayMonthFormat(getNextRepetitionDate(progress.interval)) : null;

  return (
    <div className="study-set__card--content">
      <div className="study-set__card--header">
        <h2>{title}</h2>
        {nextRepetition && <Badge icon={<IconRepeat />} content={nextRepetition} />}
      </div>
      <div className="study-set__card--summary">
        {description && <div className="summary--description">{studySet.summary.description}</div>}
        <div className="summary--items-num">{getTermsFormat(numberOfItems)}</div>
      </div>
    </div>
  );
};
