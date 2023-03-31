import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktailCreating, selectCreateCocktailError } from '../cocktailsSlice';
import { CocktailMutation } from '../../../types';
import { createCocktail } from '../cocktailsThunks';
import {Button, Grid, IconButton, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import ClearIcon from '@mui/icons-material/Clear';

const CocktailForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateCocktailError);
  const creating = useAppSelector(selectCocktailCreating);
  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [{
      name: '',
      amount: '',
    }, {
      name: '',
      amount: '',
    }],
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  const addIngredientHandler = () => {
    setState(prevState => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {
          name: '',
          amount: '',
        }
      ]
    }));
  };

  const deleteIngredientHandler = (index: number) => {
    setState(prevState => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients.slice(0, index),
        ...prevState.ingredients.slice(index + 1)
      ]
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createCocktail({
        ...state,
        ingredients: JSON.stringify(state.ingredients),
      })).unwrap();
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

  const ingInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const {name, value} = e.target;
    setState(prevState => {
      const ingredients = [...prevState.ingredients];
      ingredients[index] = { ...ingredients[index], [name]: value };
      return { ...prevState, ingredients };
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
            name="recipe" required
            error={Boolean(getFieldError('recipe'))}
            helperText={getFieldError('recipe')}
          />
        </Grid>

        <Grid item container direction="column" xs spacing={2}>
          <Grid item>
            <Typography variant="h6">Ingredients</Typography>
          </Grid>
          <Grid item container direction="column" xs spacing={2}>
            {state.ingredients.map((ing, index) => (
              <Grid container item xs spacing={1} key={index}>
                <Grid item xs={6}>
                  <TextField
                    id="name" label="Ingredient name"
                    value={ing.name}
                    onChange={(e) => ingInputChangeHandler(e, index)}
                    name="name" required
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="amount" label="Amount"
                    value={ing.amount}
                    onChange={(e) => ingInputChangeHandler(e, index)}
                    name="amount" required
                  />
                </Grid>
                <Grid item xs={2}>
                  {index !== 0 && <IconButton size="large" onClick={() => deleteIngredientHandler(index)}>
                    <ClearIcon />
                  </IconButton> }
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs>
            <Button color="primary" variant="contained" onClick={addIngredientHandler}>Add ingredient</Button>
          </Grid>
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image" required={true}
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')}
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
