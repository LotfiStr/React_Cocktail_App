import { FC, useState, useEffect } from 'react'
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material'
import { Cocktail } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'
import API from '../../client/api'

interface IProps {
  ingredients?: string[]
}



const FindCocktail: FC<IProps> = ({ ingredients }) => {
  const [List, setList] = useState<Cocktail[]>([]);
  const [Cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [isAlcoholic, setIsAlcoholic] = useState(false);
  const [isNonAlcoholic, setIsNonAlcoholic] = useState(false); 

  const fetchAlcoCocktails = async () => {
    try {
      let url = 'filter.php?a=';
  
      if (isAlcoholic) {
        url += 'Alcoholic';
      } else if (isNonAlcoholic) {
        url += 'Non_Alcoholic';
      } else {
        url += ''; 
      }
  
      const response = await API.get(url);
      setCocktails(response.data.drinks.slice(0, 5));
      console.log(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  }
  

  const fetchCocktailSelected = async() => {
  try {
    const response = await API.get(`filter.php?i=${selectedIngredient}`)
    setCocktails(response.data.drinks.slice(0, 5));
  } catch (error) {
    throw (error);  
  }  
}
  const fetchIngredientsList = async() => {
  try {
    const response = await API.get('list.php?i=list')
    setList(response.data.drinks)

  } catch (error) {
    throw (error);  
  }  
}




    useEffect(() => {
      fetchIngredientsList()
    }, [])

    const handleIngredientSelect = (ingredient: string) => {
      setSelectedIngredient(ingredient);
    }

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">
        Entrez les informations pour trouver un cocktail selon vos goûts
      </Typography>
      <Button variant={'outlined'} color="secondary" onClick={() => {fetchCocktailSelected();fetchAlcoCocktails();}}>
        Valider
      </Button>

      {/* List of ingredients */}
      <Stack direction={'row'} alignItems="flex-start" spacing={2}>
        <Card style={{ padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
          <Typography variant="h6">Sélectionnez un ingrédient</Typography>
          <FormGroup>
            {List.map((obj, index) => {
                const ingredient = obj.strIngredient1
                return (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox checked={ingredient === selectedIngredient} />}
                    label={ingredient}
                    onClick={() => handleIngredientSelect(ingredient)}                    
                  />
                )
              })}
          </FormGroup>
        </Card>
        <Card style={{ padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
          <Typography variant="h6">Avec ou sans alcool</Typography>
            <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isAlcoholic} onChange={() => setIsAlcoholic(!isAlcoholic)} />}
              label="Avec"
            />
            <FormControlLabel
              control={<Checkbox checked={isNonAlcoholic} onChange={() => setIsNonAlcoholic(!isNonAlcoholic)} />}
              label="Sans"
            />
            </FormGroup>
        </Card>
      </Stack>

      {/* List of cocktails */}
      <Stack direction={'row'} spacing={2}>
       {Cocktails.map((cocktail) => (
          <CocktailCard cocktail={cocktail} hideTitles={true} />
        ))}
      </Stack>
    </Stack>
  )
}

export default FindCocktail
