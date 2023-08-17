
            //Imports//

import styles from './card.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useState, FC } from 'react';
import { useDispatch } from '../..';
import { SET_INGREDIENT_DETAILS } from '../../services/ingredientDetailsSlice';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IBurgerIngredient } from '../burger-constructor/burger-constructor';

interface ICard { key?: string; arr: IBurgerIngredient }

const Card: FC<ICard> = ({arr}) => {

            //Facilities//

    const [modalVisibility, setModalVisibility] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation()

    const ingredientId = arr._id

                //DnD//

    const [, cardRef] = useDrag({
        type: 'ingredient',
        item: arr
    })

            //Functions//

    const seeDetails = () => {
        dispatch(SET_INGREDIENT_DETAILS(arr))
        setModalVisibility(true)
    }

    return (arr &&
        <Link key={ingredientId} to={`/ingredients/${ingredientId}`} state={{ background: location }} className={styles.link}>
            <div ref={cardRef} className={styles.container} onClick={seeDetails}>
                {arr.count && arr.count > 0 && <Counter size="default" extraClass="m-1" count={arr.count} />}
                <img className={styles.img} src={arr.image} alt={arr.name} />
                <div className={`p-1 ${styles.price}`}>
                    <p className='text text_type_digits-default'>{arr.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default'>{arr.name}</p>
            </div>
            {modalVisibility && (<Modal visible={modalVisibility} closePopup={() => {
                setModalVisibility(false)
                dispatch(SET_INGREDIENT_DETAILS(undefined))
            }}><IngredientDetails /></Modal>)}
        </Link>
    )
}

export default Card