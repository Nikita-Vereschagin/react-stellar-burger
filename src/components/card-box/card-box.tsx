
            //Imports//

import Card from '../card/card';
import { useSelector } from '../..';

import styles from './card-box.module.css'
import { FC } from 'react';
import { IBurgerIngredient } from '../burger-constructor/burger-constructor';

interface ICardBox {
    text: string,
    type: string
}

const CardBox: FC<ICardBox> = (props) => {

            //Facilities//

    const ingredientsList = useSelector(store => store.ingredients.ingredientsList)
    const { text, type } = props

    return (
        <li className={styles.container}>
            <h3 className='text text_type_main-medium'>{text}</h3>
            <div className={styles.cardBox}>
                {ingredientsList.map((item: IBurgerIngredient) => {
                    if (item.type === type) {
                        return <Card key={item._id} arr={item} />
                    } return null
                })}
            </div>
        </li>
    )
}


export default CardBox

