import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';


export const CategoryContext = createContext();

const CategoryProvider = ({children}) => {

    const [categories, saveCategories] = useState([]);

    useEffect(() => {
        const APIget = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const result = await axios.get(url);
            saveCategories(result.data.drinks);
        }
        APIget()
    }, [])


    return (
        <CategoryContext.Provider
            value={{
                categories
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider