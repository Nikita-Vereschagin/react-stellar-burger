
            //Imports//

import { useMemo, useState, useEffect } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';

            //Constants//

const OrderInfoPage = () => {
    const location = useLocation()

    const [rusStatus, setStatus] = useState(null)
    const [ingredients, setIngredients] = useState([])

    const [arr, setArr] = useState([])

    const ingredientsList = useSelector(store => store.ingredients.ingredientsList)

    useEffect(() => { 
        api.getOrderRequest(location.pathname.split('/')[2]).then((res) => {
            setArr(res)
            console.log(res)
        })
    }, [location.pathname])

    useEffect(() => { 
        arr.ingredients.map(id => {
            ingredientsList.map((el,i) => {
                if (el._id === id) {
                    setIngredients([...ingredients, {...el, unicId: i}])
                }else {
                    return null
                }
            })
        })
    }, [ingredientsList, arr.ingredients, ingredients])

    useEffect(() => { 
        arr.status === 'done' ? setStatus('Выполнен') : arr.status === 'pending' ? setStatus('Готовится') : setStatus('Заказ отправлен')
    }, [arr.status])

    const totalPrice = useMemo(() => {
        let inredientsPrice = 0
        ingredients.forEach(el => inredientsPrice += el.price)
        return inredientsPrice
    }, [ingredients])

    
    
            //Facilities//

    return (
        <div className={styles.box}>
            <p className='text text_type_digits-default'>{`#${arr.number}`}</p>
            <h3 className='text text_type_main-medium mt-10 mb-3'>{arr.name}</h3>
            <p className={`text text_type_main-small ${styles.status}`}>{rusStatus}</p>
            <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
            <li className={styles.list}>
                {
                    ingredients.map(el => {
                        return <OrderCard arr={el}/>
                    })
                }

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