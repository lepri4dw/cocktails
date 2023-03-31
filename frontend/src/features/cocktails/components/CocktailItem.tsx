import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteCocktail, fetchCocktails, publishedCocktail} from '../cocktailsThunks';
import {selectCocktailDeleting, selectCocktailPublishing} from '../cocktailsSlice';
import {LoadingButton} from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  image: string;
  isPublished: boolean;
}

const CocktailItem: React.FC<Props> = ({name, image, _id, isPublished}) => {
  const dispatch = useAppDispatch();
  let cardImage = apiURL + '/' + image;
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectCocktailDeleting);
  const publishLoading = useAppSelector(selectCocktailPublishing);

  const togglePublished = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(publishedCocktail(_id));
    dispatch(fetchCocktails());
  }


  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(deleteCocktail(_id));
    dispatch(fetchCocktails());
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card component={Link} to={'/cocktails/' + _id} style={{display: 'block', textDecoration: "none",  border: "1px solid #ccc", borderRadius: "4px"}}>
        <CardActionArea>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!isPublished && user && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                  {user.role === 'admin' &&<LoadingButton loading={publishLoading ? publishLoading === _id : false} loadingIndicator="Loading…"  variant="contained" color="primary" onClick={togglePublished}>Publish</LoadingButton>}
                </div>
              )}
              {user && user.role === 'admin' && (
                <IconButton disabled={deleteLoading ? deleteLoading === _id : false} style={{marginLeft: 'auto'}} onClick={handleDelete}>
                  <DeleteIcon/>
                </IconButton>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CocktailItem;
