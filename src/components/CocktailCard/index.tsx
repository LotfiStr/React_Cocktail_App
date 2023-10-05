import { FC, useState } from 'react'
import { Button, Card, Stack, Typography } from '@mui/material'
import { Cocktail } from '../../types/cocktails'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToFavorites, removeFromFavorites } from '../../redux/slices/cocktailsSlice'

interface IProps {
  cocktail: Cocktail
  hideTitles: boolean;
}

const CocktailCard: FC<IProps> = ({cocktail, hideTitles}) => {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(favorites.some((fav) => fav.idDrink === cocktail.idDrink));
  
  const handleAddToFavorites = () => {
    if(isFavorite) {
      dispatch(removeFromFavorites(cocktail.idDrink)); 
    } else {
      dispatch(addToFavorites(cocktail)); 
    }
    setIsFavorite(!isFavorite)
  };

  return (
    <Card style={{ padding: '10px', maxWidth: '400px' }}>
      <Stack direction={'column'} alignItems="center" spacing={4}>
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h5">{cocktail.strDrink}</Typography>
          {!hideTitles &&(
            <>
          <Typography variant="h5">Ingrédients:</Typography>
          {cocktail.strIngredient1} <br/>
          {cocktail.strIngredient2} <br/>
          {cocktail.strIngredient3} <br/>
          {cocktail.strIngredient4} <br/>
          {cocktail.strIngredient5} <br/>
          <Typography variant="h5">Instructions:</Typography>
          {cocktail.strInstructions}
          </>
)}
          <img
            src={cocktail.strDrinkThumb}
            style={{ width: 200, height: 200 }}
          />
            <Button variant="outlined" onClick={handleAddToFavorites}>
              {isFavorite? 'RETIRER' : 'CHOISIR'}</Button>        
        </Stack>
      </Stack>
    </Card>
  )
}

export default CocktailCard
