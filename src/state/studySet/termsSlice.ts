import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { firebaseValue } from '../../firebase'
import { TermItem } from '../../common/types/index'
import { Terms, TermsState } from '../types'
import { updateTermsCount } from './studySetsSlice'

export const fetchTerms = createAsyncThunk('termsSlice/fetchTerms', async (termsId: string) => {
  const data = (await firebaseValue.api.getStudySetTerms(termsId)) as TermItem[]

  return { termsId, data }
})

type AsyncThunkConfig = {
  state: RootState
}

export const editTerms = createAsyncThunk<any, any, AsyncThunkConfig>(
  'termsSlice/editTerms',
  async ({ termsId, termsToUpdate }, { getState, dispatch }) => {
    const state = getState()
    const existingTermItems = state.termsData.terms.find((terms: Terms) => terms.termsId === termsId)

    if (existingTermItems?.termItems !== termsToUpdate) {
      await firebaseValue.api.editStudySetTerms(termsId, termsToUpdate)
      dispatch(updateTermsCount({ termsId, count: termsToUpdate.length }))
    }

    return { termsId, termsToUpdate }
  }
)

const initialState: TermsState = {
  terms: [],
  isLoading: false,
}

export const TermsSlice = createSlice({
  name: 'termsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        const { termsId, data } = action.payload
        state.terms.push({ termsId, termItems: data })
        state.isLoading = false
      })
      .addCase(editTerms.fulfilled, (state, action) => {
        const { termsId, termsToUpdate } = action.payload
        const existingTermItems = state.terms.find((terms: Terms) => terms.termsId === termsId)

        if (existingTermItems) {
          existingTermItems.termItems = termsToUpdate
        }
      })
  },
})

export const {} = TermsSlice.actions

export const selectTermsData = (state: RootState) => state.termsData

export default TermsSlice.reducer
