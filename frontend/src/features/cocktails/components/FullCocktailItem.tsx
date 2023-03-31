import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import {selectOneCocktail, selectOneCocktailFetching} from "../cocktailsSlice";
import {fetchOneCocktail} from "../cocktailsThunks";
import {apiURL} from "../../../constants";

const FullCocktailItem = () => {
  const dispatch = useAppDispatch();
  const id = (useParams()).id as string;
  const cocktail = useAppSelector(selectOneCocktail);
  const fetchLoading = useAppSelector(selectOneCocktailFetching);

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md" sx={{mb: 5}}>
      {fetchLoading ? <CircularProgress/> : cocktail && <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xs>
            {cocktail.image && <img src={apiURL + '/' + cocktail.image} alt={cocktail.name} style={{width: '100%', maxWidth: '400px'}}/>}
          </Grid>
          <Grid item xs>
            <Typography variant="h4">{cocktail.name}</Typography>
            <Typography variant="h5">Ingredients</Typography>
            <ul>
              {cocktail.ingredients.map((ing, index) => (
                <li key={index}><Typography variant="h6">{ing.name} - {ing.amount}</Typography></li>
              ))}
            </ul>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Typography variant="h5"><b>Recipe:</b></Typography>
          <Typography variant="h6">{cocktail.recipe}</Typography>
        </Grid>
      </Grid>}
    </Container>

  );
};

export default FullCocktailItem;