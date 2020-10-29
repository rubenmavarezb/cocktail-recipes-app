import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({children}) => {

    const [recipes, saveRecipes] = useState([]);
    const [searchRecipe, setSearchRecipe] = useState({
        name: '',
        category: ''
    });
    const [consult, saveConsult] = useState(false)

    const { name, category } = searchRecipe;

    useEffect(() => {

        if(consult){
            const APIget = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;
                const result = await axios.get(url);

                saveRecipes(result.data.drinks);
            }
            APIget();
        }

    }, [searchRecipe, category, consult, name])
    return ( 
        <RecipeContext.Provider
            value={{
                recipes,
                setSearchRecipe,
                saveConsult
            }}
        >
            {children}
        </RecipeContext.Provider>
     );
}
 
export default RecipeProvider;