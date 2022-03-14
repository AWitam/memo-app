import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { StudySetsState, UserStudySetPayload } from '../types'
import { firebaseValue } from '../../firebase'
import { StudySet } from '../../common/types'

const initialState: StudySetsState = {
  studySets: [],
  isLoading: true,
}

export const fetchUserStudySets = createAsyncThunk('studySetsSlice/fetchUserStudySets', async (userId: string) => {
  const response = (await firebaseValue.api.fetchUserStudySets(userId)) as StudySet[]
  return response
})

export const fetchStudySetData = createAsyncThunk('studySetsSlice/getStudySetData', async (termsId: string) => {
  const data = (await firebaseValue.api.getStudySetData(termsId)) as StudySet

  return { termsId, data }
})

export const addStudySet = createAsyncThunk('studySetsSlice/addStudySet', async (studySet: StudySet) => {
  await firebaseValue.api.addStudySet(studySet)
  return studySet
})

type AsyncThunkConfig = {
  state: RootState
}

export const editStudySet = createAsyncThunk<StudySet, StudySet, AsyncThunkConfig>(
  'studySetSlice/editStudySet',
  async (studySet, { getState }) => {
    const state = getState()
    const existingStudySet = state.collections.studySets.find((studySet: StudySet) => studySet.studySetId === studySet.studySetId)

    if (
      existingStudySet?.summary.title !== studySet.summary.title ||
      existingStudySet?.summary.description !== studySet.summary.description
    ) {
      await firebaseValue.api.editStudySetSummary(studySet)
    }

    if (existingStudySet?.terms !== studySet.terms) {
      await firebaseValue.api.editStudySetTerms(studySet)
    }

    return studySet
  }
)

export const deleteStudySetThunk = createAsyncThunk(
  'studySetsSlice/deleteStudySet',
  async ({ studySetId, termsId }: { studySetId: string; termsId: string }) => {
    await firebaseValue.api.deleteStudySet(studySetId, termsId)
    return studySetId
  }
)

export const StudySetSlice = createSlice({
  name: 'studySetsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudySet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addStudySet.fulfilled, (state, action) => {
        state.studySets.push(action.payload)
        state.isLoading = false
      })
      .addCase(fetchUserStudySets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserStudySets.fulfilled, (state, action) => {
        action.payload.forEach((item: StudySet) => state.studySets.push(item))
        state.isLoading = false
      })
      .addCase(fetchStudySetData.fulfilled, (state, action) => {
        const { termsId, data } = action.payload
        let existingStudySet = state.studySets.findIndex((studySet: StudySet) => studySet.summary.termsId === termsId)
        if (!state.studySets[existingStudySet].terms) {
          state.studySets[existingStudySet].terms = []
        }
        state.studySets[existingStudySet].terms = data.terms
      })
      .addCase(deleteStudySetThunk.fulfilled, (state, action) => {
        let studySetIndex = state.studySets.findIndex((studySet: StudySet) => studySet.studySetId === action.payload)
        state.studySets.splice(studySetIndex, 1)
      })
      .addCase(editStudySet.fulfilled, (state, action) => {
        const { studySetId, summary, terms } = action.payload
        const existingStudySet = state.studySets.find((studySet: StudySet) => studySet.studySetId === studySetId)
        if (existingStudySet) {
          existingStudySet.summary = {
            termsId: existingStudySet.summary.termsId,
            numberOfItems: summary.numberOfItems,
            title: summary.title,
            description: summary.description,
          }
          existingStudySet.terms = terms
        }
      })
  },
})

export const {} = StudySetSlice.actions

export const selectStudySets = (state: RootState) => state.collections

export default StudySetSlice.reducer
