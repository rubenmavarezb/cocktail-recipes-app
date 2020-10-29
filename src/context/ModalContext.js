import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = ({children}) => {

    const [idRecipe, saveIdRecipe] = useState(null);
    const [recipeInfo, saveRecipeInfo] = useState({})

    useEffect(() => {
        const APIget = async () => {
            if(!idRecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
            const result = await axios.get(url);

            saveRecipeInfo(result.data.drinks[0])
        }
        APIget();
    }, [idRecipe])

    return ( 
        <ModalContext.Provider
            value={{
                recipeInfo,
                saveIdRecipe,
                saveRecipeInfo
            }}
        >
            {children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
