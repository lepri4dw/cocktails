import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktailCreating, selectCreateCocktailError } from '../cocktailsSlice';
import { CocktailMutation } from '../../../types';
import { createCocktail } from '../cocktailsThunks';
import { Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';

const CocktailForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateCocktailError);
  const creating = useAppSelector(selectCocktailCreating);
  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [],
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createCocktail(state)).unwrap();
      navigate('/');
    } catch (e) {

    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New artist</Typography>
        </Grid>

        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name" required
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="recipe" label="Recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            name="recipe"
            error={Boolean(getFieldError('recipe'))}
            helperText={getFieldError('recipe')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CocktailForm;
