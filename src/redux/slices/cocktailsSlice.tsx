import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cocktail } from '../../types/cocktails'

// Type definition of the cocktail slice state
export interface ICocktailState {
  cocktail: Cocktail | undefined,
  favorites: Cocktail[]; 
}

// Initial state
const initialState: ICocktailState = {
  cocktail: undefined,
  favorites: [],
}

const getRandomCocktail = createAsyncThunk('getRandomCocktail', async () => {
  // TODO: fetch data from API
  await Promise.reject()
  return null
})

// Cocktails Slice definition
const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const payload = action.payload
      state.favorites.push(payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((fav) => fav.idDrink !== action.payload);
    },
  },  extraReducers(builder) {
    builder.addCase(getRandomCocktail.fulfilled, (state, action) => {
      const payload = action.payload
      // TODO: Update state according to payload
    })
  },
})

// Export reducer
export default cocktailSlice.reducer

export const { addToFavorites, removeFromFavorites } = cocktailSlice.actions;
export const cocktailAction = { getRandomCocktail }
