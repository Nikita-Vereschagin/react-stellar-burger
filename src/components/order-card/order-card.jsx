
            //Imports//

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';

            //Constants//

const OrderCard = (arr) => {

    const {image_mobile, name, count, price} = arr

            //Facilities//

    return (
        <ul className={styles.box}>
            <div className={styles.icon}><img className={styles.img} src={image_mobile}/></div>
            <p className='text text_type_main-default'>{name}</p>
            <div className={styles.totalPrice}>
                <p className='text text_type_digits-default'>{`${count} x ${price}`}</p>
                <CurrencyIcon />
            </div>
        </ul>
    )
}

export default OrderCard