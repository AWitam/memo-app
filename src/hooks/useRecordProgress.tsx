import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import type { AppDispatch } from '../app/store';
import type { StudySet } from '../common/types';
import { getUserStudySetProgress, updateUserStudySetProgress } from '../state/studySet/studySetsSlice';
import { calcQuality } from '../utils/sm-2/calcQuality';
import { sm2 } from '../utils/sm-2/sm2';

export const useRecordProgress = (numberOfTerms: number, score: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { studySetId } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const currentStudySet = useAppSelector((state) =>
    state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
  );
  const quality = calcQuality(numberOfTerms, score);

  useEffect(() => {
    (async () => {
      if (user && currentStudySet) {
        const { payload } = await dispatch(
          getUserStudySetProgress({ userId: user?.uid, studySetId: currentStudySet?.studySetId })
        );

        const { easeFactor, interval, repetitions } = sm2({
          quality,
          previousEaseFactor: payload?.easeFactor,
          previousInterval: payload?.interval,
          repetitions: payload?.repetitions,
        });

        await dispatch(
          updateUserStudySetProgress({
            userId: user?.uid,
            studySetId: currentStudySet?.studySetId,
            newProgressRecord: {
              easeFactor,
              interval,
              repetitions,
            },
          })
        );
      }
    })();
  }, []);
};
