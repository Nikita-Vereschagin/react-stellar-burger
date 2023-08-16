
            //Imports//

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { FC } from 'react';
import { IBurgerIngredient } from '../burger-constructor/burger-constructor';

interface IIngredientCount extends IBurgerIngredient{
    count: number;
}

            //Constants//

const OrderCard: FC<{arr: IIngredientCount | undefined}> = (arr) => {

    const array = arr.arr

            //Facilities//

    return (array ?
        <ul className={styles.box}>
            <div className={styles.icon}><img className={styles.img} alt={array.name} src={array.image_mobile}/></div>
            <p className='text text_type_main-default'>{array.name}</p>
            <div className={styles.totalPrice}>
                <p className='text text_type_digits-default'>{`${array.count} x ${array.price}`}</p>
                <CurrencyIcon type='primary'/>
            </div>
        </ul>
        :  <h1>'Загрузка...'</h1>
    )
}

export default OrderCard