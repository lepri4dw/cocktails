import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsFetching } from './cocktailsSlice';
import CocktailItem from './components/CocktailItem';
import { fetchCocktails } from './cocktailsThunks';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsFetching);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Cocktails
        </Typography>
      </Grid>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {cocktails.map(cocktail => (
          <CocktailItem isPublished={cocktail.isPublished} key={cocktail._id} name={cocktail.name} _id={cocktail._id} image={cocktail.image}/>
        ))}
      </Grid>}
    </Grid>
  );
};

export default Cocktails;