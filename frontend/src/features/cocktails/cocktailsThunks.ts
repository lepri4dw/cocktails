import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Cocktail, CocktailMutationSend, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchAll',
  async () => {
    const response = await axiosApi.get<Cocktail[]>('/cocktails');
    return response.data;
  }
);

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
  'cocktails/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/cocktails/' + id);
    return response.data;
  }
);

export const fetchCocktailsByUser = createAsyncThunk(
  'cocktails/fetchByUser',
  async () => {
    const response = await axiosApi.get<Cocktail[]>('/cocktails/byUser');
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<void, CocktailMutationSend, {rejectValue: ValidationError}>(
  'cocktails/create',
  async (CocktailMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(CocktailMutation) as (keyof CocktailMutationSend)[];

      keys.forEach(key => {
        const value = CocktailMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/cocktails', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const publishedCocktail = createAsyncThunk<void, string>(
  'cocktails/published',
  async (id) => {
    await axiosApi.patch('/cocktails/' + id + '/togglePublished');
  }
);

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktails/delete',
  async (id) => {
    await axiosApi.delete('/cocktails/' + id);
  }
);