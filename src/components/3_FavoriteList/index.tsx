import { FC, useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import CocktailCard from '../CocktailCard'
import { useAppSelector } from '../../redux/hooks'
import { Cocktail } from '../../types/cocktails'

const FavoriteList: FC = () => {

  const [ingredients, setIngredients] = useState<string[]>([]);
  const favoriteCocktails = useAppSelector((state) => state.favorites);

  const showIngredientList = (): void => {
    const allIngredients : string[] = [];

    favoriteCocktails.forEach((cocktail) => {
      allIngredients.push(
        cocktail.strIngredient1,
        cocktail.strIngredient2,
        cocktail.strIngredient3,
        cocktail.strIngredient4,
        cocktail.strIngredient5
      );

    });
    
    const uniqueIngredients = allIngredients.filter((ingredient) => ingredient);
    setIngredients(uniqueIngredients);
  }

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="h5">List des cocktails choisis</Typography>
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          {favoriteCocktails.map((cocktail: Cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              cocktail={cocktail}
              hideTitles={true}
            />
          ))}
        </Stack>
        <Button variant="outlined" onClick={showIngredientList}>
          Obtenir la liste des ingrédients à acheter
        </Button>
        <Stack direction={'column'}>
          {ingredients.map((ingredient,index)=>(
            <Typography key={index}>{ingredient}</Typography>            
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FavoriteList
