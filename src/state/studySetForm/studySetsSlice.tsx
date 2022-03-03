import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FlashCardField } from '../../components/StudySetForm/StudySetForm'
import { RootState } from '../../app/store'
import { ref, onValue } from 'firebase/database'
import { collection, query, where, getDocs } from 'firebase/firestore'

export interface FlashcardField {
  id: string
  term: string
  definition: string
}

export interface StudySet {
  id: string
  summary: StudySetSummary
  items?: Array<FlashcardField>
}

interface StudySetSummary {
  title: string
  description: string
  numberOfItems?: number
}

interface StudySetsState {
  studySets: StudySet[]
  isLoading: boolean
}

const initialState: StudySetsState = {
  studySets: [],
  isLoading: true,
}

export const fetchUserStudySets = createAsyncThunk(
  'studySetsSlice/fetchUserStudySets',
  async ({ userId, studySetsRef }: any): Promise<Array<any>> => {
    const q = query(studySetsRef, where('creator', '==', userId))
    const querySnapshot = await getDocs(q)
    const userStudySetsData: any = []
    querySnapshot.forEach((doc) => {
      userStudySetsData.push({ id: doc.id, summary: doc.data() })
    })
    return userStudySetsData
  }
)

export const fetchStudySetsItems = createAsyncThunk(
  'studySetsSlice/fetchStudySetItems',
  async ({ userId, studySetsItemsRef }: any): Promise<Array<any>> => {
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
