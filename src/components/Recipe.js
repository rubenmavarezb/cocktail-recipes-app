import React, { useContext, useState } from 'react';
import {ModalContext} from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {

    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const {recipeInfo, saveIdRecipe, saveRecipeInfo} = useContext(ModalContext);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const showIngredients = (info) => {
        let ingredients = [];
        for (let i = 1; i < 16; i++) {
            //if it's true and not empty or null
            if(info[`strIngredient${i}`]){
                ingredients.push(
                    <li key={info[`strIngredient${i}`]}>{ info[`strIngredients${i}`] } { info[`strMeasure${i}`] }</li>
                )
            }
        }

        return ingredients;
    }

    return ( 
        <div className='col-md-4 mb-3'>
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>
                <img src={recipe.strDrinkThumb} alt={recipe.strDrink} className="card-img-top"/>

                <div className="card-body">
                    <button 
                        className="btn btn-block btn-primary" 
                        type="button"
                        onClick={() => {
                            saveIdRecipe(recipe.idDrink);
                            handleOpen();
                        }}
                    >See recipe...</button>

                    <Modal
                        open={open}
                        onClose={() => {
                            saveIdRecipe(null);
                            saveRecipeInfo({});
                            handleClose();
                        }}
                    >
                        <div className={classes.paper} style={modalStyle}>
                            <h2>{recipeInfo.strDrink}</h2>
                            <h3 className="mt-4">Instructions</h3>
                            <p>{recipeInfo.strInstructions}</p>
                            <img 
                                src={recipeInfo.strDrinkThumb} 
                                alt={recipeInfo.strDrink} 
                                className="img-fluid my-4"
                            />

                            <h3>Ingredients and quantities</h3>
                            <ul>
                                {showIngredients(recipeInfo)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Recipe;