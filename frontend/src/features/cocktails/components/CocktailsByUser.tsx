import React, {useEffect} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import CocktailItem from "./CocktailItem";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCocktails, selectCocktailsFetching} from "../cocktailsSlice";
import {fetchCocktailsByUser} from "../cocktailsThunks";

const CocktailsByUser = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsFetching);

  useEffect(() => {
    dispatch(fetchCocktailsByUser());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          My Cocktails
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

export default CocktailsByUser;