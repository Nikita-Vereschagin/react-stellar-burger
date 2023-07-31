
            //Imports//

import { useMemo, useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

            //Constants//

const OrderInfoPage = (arr) => {

    const {name, number, status} = arr

    const [rusStatus, setStatus] = useState(null)

    const totalPrice = useMemo(() => {
        let inredientsPrice = 0
/*         orderIngredients.forEach(el => inredientsPrice += el.price) */
        return inredientsPrice
    }, [/* orderIngredients */])

    status === 'done' ? setStatus('Выполнен') : setStatus('Готовится')
    
            //Facilities//

    return (
        <div className={styles.box}>
            <p className='text text_type_digits-default'>{`#${number}`}</p>
            <h3 className='text text_type_main-medium mt-10 mb-3'>{name}</h3>
            <p className={`text text_type_main-small ${styles.status}`}>{rusStatus}</p>
            <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
            <li className={styles.list}>
                <OrderCard />
            </li>
            <FormattedDate className='text text_type_main-default text_color_inactive mt-10' />
            <div className={styles.totalPrice}>
                <p className='text text_type_digits-default'>{totalPrice}</p>
                <CurrencyIcon />
            </div>
        </div>
    )
}

export default OrderInfoPage