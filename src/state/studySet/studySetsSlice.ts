import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { StudySetsState } from '../types';
import { firebaseValue } from '../../firebase';
import type { StudySet } from '../../common/types';
import { termsAdded } from './termsSlice';
import type { ProgressRecord } from '../../firebase/api/userProgressServices';

const initialState: StudySetsState = {
  studySets: [],
  isLoading: true,
  isError: false,
};

export const fetchUserStudySets = createAsyncThunk('studySetsSlice/fetchUserStudySets', async (userId: string) => {
  const response = (await firebaseValue.api.fetchUserStudySets(userId)) as StudySet[];
  return response;
});

export const addStudySet = createAsyncThunk('studySetsSlice/addStudySet', async ({ studySet, terms }: any, { dispatch }) => {
  await firebaseValue.api.addStudySet(studySet, terms);
  dispatch(termsAdded({ termsId: studySet.summary.termsId, terms }));
  return studySet;
});

type AsyncThunkConfig = {
  state: RootState;
};

export const editStudySetSummary = createAsyncThunk<StudySet, StudySet, AsyncThunkConfig>(
  'studySetSlice/editStudySetSummary',
  async (studySet, { getState }) => {
    const state = getState();
    const existingStudySet = state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySet.studySetId);

    if (
      existingStudySet?.summary.title !== studySet.summary.title ||
      existingStudySet?.summary.description !== studySet.summary.description
    ) {
      await firebaseValue.api.editStudySetSummary(studySet);
    }

    return studySet;
  }
);

export const deleteStudySetThunk = createAsyncThunk(
  'studySetsSlice/deleteStudySet',
  async ({ studySetId, termsId }: { studySetId: string; termsId: string }) => {
    await firebaseValue.api.deleteStudySet(studySetId, termsId);
    return studySetId;
  }
);

export const getUserStudySetProgress = createAsyncThunk(
  'studySetsSlice/getUserStudySetProgress',
  async ({ userId, studySetId }: { userId: string; studySetId: string }) => {
    return await firebaseValue.api.getPreviousStudySetProgress(userId, studySetId);
  }
);

export const updateUserStudySetProgress = createAsyncThunk(
  'studySetsSlice/recordUserStudySetProgress',
  async ({ userId, studySetId, newProgressRecord }: { userId: string; studySetId: string; newProgressRecord: ProgressRecord }) => {
    await firebaseValue.api.updateUserProgressForStudySet(userId, studySetId, newProgressRecord);
    return { userId, studySetId, newProgressRecord };
  }
);

export const StudySetSlice = createSlice({
  name: 'studySetsSlice',
  initialState,
  reducers: {
    reset: () => initialState,
    updateTermsCount: (state, action) => {
      const { termsId, count } = action.payload;
      const countToUpdate = state.studySets.find((studySet) => studySet.summary.termsId === termsId);
      if (countToUpdate) {
        countToUpdate.summary.numberOfItems = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudySet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudySet.fulfilled, (state, action) => {
        state.studySets.push(action.payload);
        state.isLoading = false;
      })
      .addCase(fetchUserStudySets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserStudySets.fulfilled, (state, action) => {
        action.payload.forEach((item: StudySet) => state.studySets.push(item));
        state.isLoading = false;
      })
      .addCase(fetchUserStudySets.rejected, (state, action) => {
        state.isError = true;
        state.status = action.error.message;
      })

      .addCase(deleteStudySetThunk.fulfilled, (state, action) => {
        const studySetIndex = state.studySets.findIndex((studySet: StudySet) => studySet.studySetId === action.payload);
        state.studySets.splice(studySetIndex, 1);
      })
      .addCase(editStudySetSummary.fulfilled, (state, action) => {
        const { studySetId, summary } = action.payload;
        const existingStudySet = state.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId);
        if (existingStudySet) {
          existingStudySet.summary = {
            termsId: existingStudySet.summary.termsId,
            numberOfItems: existingStudySet.summary.numberOfItems,
            title: summary.title,
            description: summary.description,
          };
        }
      })
      .addCase(updateUserStudySetProgress.fulfilled, (state, action) => {
        const { studySetId, newProgressRecord } = action.payload;
        const existingStudySet = state.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId);
        if (existingStudySet) {
          existingStudySet.progress = newProgressRecord;
        }
      });
  },
});

export const { reset, updateTermsCount } = StudySetSlice.actions;

export const selectStudySets = (state: RootState) => state.collections;

export default StudySetSlice.reducer;
