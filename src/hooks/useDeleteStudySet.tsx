import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../app/routes';
import type { AppDispatch } from '../app/store';
import { deleteStudySetThunk } from '../state/studySet/studySetsSlice';

export const useDeleteStudySet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = (studySetId: string, termsId: string) => {
    dispatch(deleteStudySetThunk({ studySetId, termsId }));
    navigate(`/${ROUTES.collection}`);
  };

  return { handleDelete };
};
