
            //Imports//

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';

            //Constants//

const IngredientPage = () => {

            //Facilities//

    const location = useLocation()
    const [arr, setArr] = useState(null)

    const ingredientsList = useSelector(store => store.ingredients.ingredientsList)

    useEffect(() => { 
        ingredientsList.map(el => {
            if (el._id === location.pathname.split('/')[2]) {
                setArr(el)
            } else {
                return null
            }})
    }, [ingredientsList, location.pathname])


    return (arr &&
        <div className={styles.popup}>
            <h2 className={`text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
            <img src={arr.image_large} alt={arr.name} className={styles.img} />
            <h3 className="text text_type_main-medium">{arr.name}</h3>
            <ul className={styles.nutritions}>
                <li className='text text_type_main-default text_color_inactive'>{`Калории,ккал ${arr.calories}`}</li>
                <li className='text text_type_main-default text_color_inactive'>{`Белки, г ${arr.proteins}`}</li>
                <li className='text text_type_main-default text_color_inactive'>{`Жиры, г ${arr.fat}`}</li>
                <li className='text text_type_main-default text_color_inactive'>{`Углеводы, г ${arr.carbohydrates}`}</li>
            </ul>
        </div>
    )
}

export default IngredientPage