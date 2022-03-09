import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { StudySetItemPayload, StudySetsState, UserStudySetPayload } from '../types'
import { firebaseValue } from '../../firebase'
import { DocumentData } from 'firebase/firestore'
import { StudySet } from '../../common/types'

const initialState: StudySetsState = {
  studySets: [],
  isLoading: true,
}

export const fetchUserStudySets = createAsyncThunk(
  'studySetsSlice/fetchUserStudySets',
  async ({ userId }: UserStudySetPayload): Promise<Array<DocumentData>> => {
    const response = await firebaseValue.api.fetchUserStudySets(userId)
    return response
  }
)

export const fetchStudySetData = createAsyncThunk(
  'studySetsSlice/getStudySetData',
  async (studySetId: string): Promise<DocumentData> => {
    const response = await firebaseValue.api.getStudySetData(studySetId)
    return response
  }
)

export const addStudySet = createAsyncThunk('studySetsSlice/addStudySet', async (studySet: any): Promise<any> => {
  await firebaseValue.api.addStudySet(studySet)
  console.log(studySet)
  return studySet
})

export const StudySetSlice = createSlice({
  name: 'studySetsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudySet.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addStudySet.fulfilled, (state, action) => {
        state.studySets.push(action.payload)
        state.isLoading = false
      })
      .addCase(fetchUserStudySets.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUserStudySets.fulfilled, (state, action) => {
        action.payload.forEach((item: DocumentData) => state.studySets.push(item))
        state.isLoading = false
      })
      .addCase(fetchStudySetData.fulfilled, (state, action) => {
        const { studySetId, terms } = action.payload
        const existingStudySet = state.studySets.find((studySet: DocumentData) => studySet.id === studySetId)

        if (existingStudySet) {
          existingStudySet.terms = terms
        }
        state.isLoading = false
      })
  },
})

export const {} = StudySetSlice.actions

export const selectStudySets = (state: RootState) => state.collections

export default StudySetSlice.reducer
