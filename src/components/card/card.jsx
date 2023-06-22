import styles from './card.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_INGREDIENT_DETAILS } from '../../services/ingredientDetailsSlice';
import { useDrag } from 'react-dnd';

const Card = (props) => {
    const [modalVisibility, setModalVisibility] = useState(false)

    const {arr} = props

    const [ , cardRef] = useDrag({
        type: 'ingredient',
        item: arr
    })

    const dispatch = useDispatch()

    const seeDetails = () => {
        dispatch(SET_INGREDIENT_DETAILS(arr))
        setModalVisibility(true)
    }

        return (arr &&
            <>
            <div ref={cardRef} className={styles.container} onClick={() => {
                    if (arr.type === 'bun') {
                        seeDetails()
                    }else{
                        seeDetails()
                    }
                }}>
                {arr.count > 0 && <Counter size="default" extraClass="m-1" count={arr.count}/>}
                <img className={styles.img} src={arr.image} alt={arr.name}/>
                <div className={`p-1 ${styles.price}`}>
                    <p className='text text_type_digits-default'>{arr.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className='text text_type_main-default'>{arr.name}</p>
            </div>
            {modalVisibility &&  (<Modal visible={modalVisibility} closePopup={() => {
                setModalVisibility(false)
                dispatch(SET_INGREDIENT_DETAILS(null))
                }}><IngredientDetails/></Modal>)}
            </>
        )
}

Card.propTypes = {
    arr: PropTypes.object
}

export default Card