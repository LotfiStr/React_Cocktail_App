import { FC, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { Cocktail } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'
import API from '../../client/api'
import axios from 'axios'

const RandomCocktail: FC = () => {
  const [data, setdata] = useState()


  const cocktail: Cocktail | undefined = undefined

const fetchData = async () => {
  await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(reponse => {
      setdata(reponse.data.drinks[0])
      console.log(reponse.data.drinks[0]);
    }) 
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">En panne d'inspiration ?</Typography>
      <Button variant={'outlined'} color="secondary" onClick={fetchData}>
        Trouve moi un cocktail
      </Button>
      {data && (<CocktailCard cocktail={data} />)}
    </Stack>
  )
}

export default RandomCocktail
