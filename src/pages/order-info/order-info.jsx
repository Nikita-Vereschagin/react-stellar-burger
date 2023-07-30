
            //Imports//

import { useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './order-info.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

            //Constants//

const OrderInfoPage = () => {

    const {name, number} = arr

    const [rusStatus, setStatus] = useState(null)

    status === 'done' ? setStatus('Выполнен') : setStatus('Готовится')
    
            //Facilities//

    return (
        <div className={styles.box}>
            <p className='text text_type_digits-default'>{`#${number}`}</p>
            <h3 className='text text_type_main-medium'>{name}</h3>
            <p className={`text text_type_main-small ${styles.status}`}>{rusStatus}</p>
            <h3 className='text text_type_main-medium'></h3>
            <li className={styles.list}>
                <OrderCard />
            </li>
            <FormattedDate />
            <div className={styles.totalPrice}>
                <p className='text text_type_digits-default'>{totalPrice}</p>
                <CurrencyIcon />
            </div>
        </div>
    )
}

export default OrderInfoPage