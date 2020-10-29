import React, { useContext, useState } from 'react';
import {CategoryContext} from '../context/CategoryContext';
import {RecipeContext} from '../context/RecipeContext';

const Form = () => {

    const [search, saveSearch] = useState({
        name: '',
        category: ''
    })

    const { categories } = useContext(CategoryContext);
    const { setSearchRecipe, saveConsult } = useContext(RecipeContext);

    const getRecipeData = (e) => {
        saveSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <form 
            className='col-12'
            onSubmit={e => {
                e.preventDefault();
                setSearchRecipe(search);
                saveConsult(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Find cocktails by category or ingredient</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Search by ingredient..."
                        onChange={getRecipeData}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={getRecipeData}
                    >
                        <option value="">--Select a category--</option>
                        {categories.map(opt => (
                            <option
                                key={opt.strCategory}
                                value={opt.strCategory}
                            >{opt.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-block btn-primary" 
                        value="Find recipes"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Form;