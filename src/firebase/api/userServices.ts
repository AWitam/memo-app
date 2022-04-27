import { FirebaseError } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseValue } from '..';
import { getWeekRange } from '../utils/dateUtils';

export const signUpWithEmail = async (email: string, password: string) => {
  const auth = firebaseValue.auth;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential) {
    const user = userCredential.user;
    await addUserInfoToDb(user.uid);
    await updateLoginStreak(user.uid);
    return user;
  }
};

export const signInWithGoogle = async () => {
  const auth = firebaseValue.auth;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await addUserInfoToDb(user.uid);
  await updateLoginStreak(user.uid);
  return user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const auth = firebaseValue.auth;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await updateLoginStreak(userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    return error as FirebaseError;
  }
};

export const logOut = async (auth: Auth) => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  const auth = firebaseValue.auth;
  try {
    await sendPasswordResetEmail(auth, email);
    return 'Email sent';
  } catch (error) {
    return error as FirebaseError;
  }
};

export const getUserStreakData = async (uid: string) => {
  const userDoc = doc(firebaseValue.db, 'users', uid);
  const docRef = await getDoc(userDoc);

  return docRef.data()?.loginDaysThisWeek;
};

const addUserInfoToDb = async (uid: string) => {
  const userDoc = doc(firebaseValue.db, 'users', uid);

  await setDoc(userDoc, {
    loginDaysThisWeek: [],
  });
};

const updateLoginStreak = async (uid: string) => {
  await checkPreviousData(uid);
  const loginTime = new Date();

  const weekDay = loginTime.getDay() === 0 ? 7 : loginTime.getDay();
  const userDocRef = doc(firebaseValue.db, 'users', uid);

  await updateDoc(userDocRef, {
    loginDaysThisWeek: arrayUnion(weekDay),
  });
};

const checkPreviousData = async (uid: string) => {
  const { firstDay } = getWeekRange();
  const userDocRef = doc(firebaseValue.db, 'users', uid);
  const docRef = await getDoc(userDocRef);

  const data = docRef.data();

  if (data?.startDay !== firstDay) {
    await updateDoc(userDocRef, {
      startDay: firstDay,
      loginDaysThisWeek: [],
    });
  }
};
