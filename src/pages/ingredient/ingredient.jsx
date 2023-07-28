
            //Imports//

import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

            //Constants//

const IngredientPage = () => {

            //Facilities//

    const arr = useSelector(state => state.ingredientDetails)
    
    return (
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

IngredientDetails.propTypes = {
    arr: PropTypes.object
}

export default IngredientPage