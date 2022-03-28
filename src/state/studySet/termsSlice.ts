import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { firebaseValue } from '../../firebase'
import { TermItem } from '../../common/types/index'
import { Terms, TermsState } from '../types'
import { updateTermsCount } from './studySetsSlice'

export const fetchTerms = createAsyncThunk('termsSlice/fetchTerms', async (termsId: string) => {
  const items = await firebaseValue.api.getStudySetTerms(termsId)
  const preparedData = []
  for (const key in items) {
    if (key !== 'studySetId') {
      preparedData.push({ id: key, ...items[key] })
    }
  }

  return { termsId, items: preparedData }
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

export const toggleFavorite = createAsyncThunk<any, any, AsyncThunkConfig>(
  'termsSlice/toggleFavorite',
  async ({ termsId, termId, value }: any, { dispatch }) => {
    await firebaseValue.api.toggleFavorite(termsId, termId, value)

    dispatch(toggledFavorite({ termsId, termId }))
  }
)

const initialState: TermsState = {
  terms: [],
  isLoading: false,
}

export const TermsSlice = createSlice({
  name: 'termsSlice',
  initialState,
  reducers: {
    toggledFavorite: (state, action) => {
      const { termsId, termId } = action.payload
      const termsById = state.terms.find((terms: Terms) => terms.termsId === termsId)
      if (termsById) {
        const itemToUpdate = termsById?.termItems.findIndex((term: TermItem) => term.id === termId)
        termsById.termItems[itemToUpdate].isFavorite = !termsById.termItems[itemToUpdate].isFavorite
      }
    },
    termsAdded: (state, action) => {
      const { termsId, terms } = action.payload
      state.terms.push({ termsId, termItems: terms })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerms.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        const { termsId, items } = action.payload
        state.terms.push({ termsId, termItems: items })
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

export const { toggledFavorite, termsAdded } = TermsSlice.actions

export const selectTermsData = (state: RootState) => state.termsData

export default TermsSlice.reducer
