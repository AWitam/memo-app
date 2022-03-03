import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { query, where, getDocs, DocumentData } from 'firebase/firestore'
import { StudySetItemPayload, StudySetsState, UserStudySetPayload } from '../types'

const initialState: StudySetsState = {
  studySets: [],
  isLoading: true,
}

export const fetchUserStudySets = createAsyncThunk(
  'studySetsSlice/fetchUserStudySets',
  async ({ userId, studySetsRef }: UserStudySetPayload): Promise<Array<DocumentData>> => {
    const q = query(studySetsRef, where('creator', '==', userId))
    const querySnapshot = await getDocs(q)
    const userStudySetsData: Array<DocumentData> = []
    querySnapshot.forEach((doc) => {
      userStudySetsData.push({ id: doc.id, summary: doc.data() })
    })
    return userStudySetsData
  }
)

export const fetchStudySetsItems = createAsyncThunk(
  'studySetsSlice/fetchStudySetItems',
  async ({ userId, studySetsItemsRef }: StudySetItemPayload): Promise<Array<DocumentData>> => {
    const q = query(studySetsItemsRef, where('', '==', userId))
    const querySnapshot = await getDocs(q)
    const userStudySetsData: Array<any> = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
      userStudySetsData.push(doc.data())
    })
    return userStudySetsData
  }
)

export const StudySetSlice = createSlice({
  name: 'studySetsSlice',
  initialState,
  reducers: {
    addStudySet: (state, action) => {
      state.studySets.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserStudySets.fulfilled, (state, action) => {
      action.payload.forEach((item) => state.studySets.push(item))
    })
  },
})

export const { addStudySet } = StudySetSlice.actions

export const selectStudySets = (state: RootState) => state.collections

export default StudySetSlice.reducer
