import { Cocktail, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createCocktail,
  deleteCocktail,
  fetchCocktails,
  fetchCocktailsByUser,
  fetchOneCocktail,
  publishedCocktail
} from './cocktailsThunks';

interface CocktailsState {
  items: Cocktail[],
  fetchLoading: boolean;
  oneCocktail: Cocktail | null;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createCocktailError: ValidationError | null;
  publishedLoading: string | false;
  deleteLoading: string | false;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  oneCocktail: null,
  fetchOneLoading: false,
  createLoading: false,
  createCocktailError: null,
  publishedLoading: false,
  deleteLoading: false
};

const CocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
      state.fetchLoading = false;
      state.items = cocktails;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchCocktailsByUser.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCocktailsByUser.fulfilled, (state, {payload: cocktails}) => {
      state.fetchLoading = false;
      state.items = cocktails;
    });
    builder.addCase(fetchCocktailsByUser.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktail}) => {
      state.fetchOneLoading = false;
      state.oneCocktail = cocktail;
    });
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createCocktail.pending, (state) => {
      state.createCocktailError = null;
      state.createLoading = true;
    });
    builder.addCase(createCocktail.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createCocktail.rejected, (state, {payload: error}) => {
      state.createCocktailError = error || null;
      state.createLoading = false;
    });

    builder.addCase(publishedCocktail.pending, (state, {meta: {arg: id}}) => {
      state.publishedLoading = id;
    });
    builder.addCase(publishedCocktail.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedCocktail.rejected, (state) => {
      state.publishedLoading = false;
    });

    builder.addCase(deleteCocktail.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const cocktailsReducer = CocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectOneCocktailFetching = (state: RootState) => state.cocktails.fetchOneLoading;
export const selectCocktailCreating = (state: RootState) => state.cocktails.createLoading;
export const selectCreateCocktailError = (state: RootState) => state.cocktails.createCocktailError;
export const selectCocktailPublishing = (state: RootState) => state.cocktails.publishedLoading;
export const selectCocktailDeleting = (state: RootState) => state.cocktails.deleteLoading;