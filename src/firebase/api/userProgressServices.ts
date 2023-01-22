import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebaseValue } from '..';

export interface ProgressRecord {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

export const getPreviousStudySetProgress = async (uid: string, studySetId: string) => {
  const userDocRef = doc(firebaseValue.db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  const progress = await userDoc.data()?.progress;

  if (!progress) {
    await updateDoc(userDocRef, { progress: {} });
  }

  const progressRecord = progress[studySetId];

  if (!progressRecord) {
    const defaultProgressRecord: ProgressRecord = {
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    };

    await updateDoc(userDocRef, { [`progress.${studySetId}`]: defaultProgressRecord });
  }

  return progress[studySetId];
};

export const updateUserProgressForStudySet = async (uid: string, studySetId: string, newProgressRecord: ProgressRecord) => {
  const userDocRef = doc(firebaseValue.db, 'users', uid);
  return await updateDoc(userDocRef, { [`progress.${studySetId}`]: newProgressRecord });
};
