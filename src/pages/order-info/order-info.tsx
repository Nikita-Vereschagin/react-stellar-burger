
            //Imports//

import { useMemo, useState, useEffect, FC } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/types';
import { api } from '../../utils/api';
import { IBurgerIngredient } from '../../components/burger-constructor/burger-constructor';
import { IFeedCard } from '../../components/feed-card/feed-card';

            //Constants//

const OrderInfoPage: FC = () => {
    const location = useLocation()

    const [rusStatus, setStatus] = useState<string | null>(null)
    const [dateFromServer, setDateFromServer] = useState<string | null>(null)
    const [arr, setArr] = useState<IFeedCard | null>(null)
    const [statusStyle, setStatusStyle] = useState('white')
    let finishIngredients;

    const ingredientsList = useSelector(store => store.ingredients.ingredientsList)
    useEffect(() => { 
        
        if (location.pathname.includes('/feed')) {
            api.getOrderRequest(location.pathname.split('/')[2]).then((res) => {
                setArr(res.orders[0])
            })
        } else {
            api.getOrderRequest(location.pathname.split('/')[3]).then((res) => {  
                setArr(res.orders[0])
            })
        }
    }, [location.pathname])

    const ingredients = useMemo(() => {
        let orderIngredients: IBurgerIngredient[] = []
        ingredientsList.map(listIngredient => {
            arr && arr.ingredients.map((arrayIngredient) => {
                if (arrayIngredient === listIngredient._id){
                    orderIngredients.push({...listIngredient, count: 1})
                }else {
                    return null
                }
            })
        })

        return orderIngredients
    }, [ingredientsList, arr])

    const arrayWithCounters = ingredients && ingredients.map((el) => {
        const count = ingredients.filter(item => item._id === el._id).length;
        return { ...el, count: count }
      })

      if (arr) {
        const set = new Set(arr.ingredients);
        const uniqueId = [...set];
        finishIngredients = uniqueId.map(item => arrayWithCounters.find(i => item == i._id));
      }
    

    useEffect(() => {

        if (arr && arr.status === 'done')  {
            setStatus('Выполнен')
            setStatusStyle('#00CCCC')
        } else if (arr && arr.status === 'pending') {
            setStatus('Готовится')
            setStatusStyle('')
        } else {
            setStatus('Заказ отправлен')
            setStatusStyle('red')
        }
        
    }, [arr])

    const totalPrice = useMemo(() => {
        let inredientsPrice = 0
        ingredients && ingredients.forEach(el => inredientsPrice += el.price)
        return inredientsPrice
    }, [ingredients])

    useEffect(() => {
        arr && setDateFromServer(arr.createdAt)
    }, [arr])


    return (arr && dateFromServer ? 
        <div className={styles.box}>
            <p className='text text_type_digits-default' style={{textAlign: 'center'}}>{`#${arr.number}`}</p>
            <h3 className='text text_type_main-medium mt-10 mb-3'>{arr.name}</h3>
            <p className={`text text_type_main-small`} style={{color: statusStyle}}>{rusStatus}</p>
            <h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>
            <li className={`${styles.list} custom-scroll`}>
                {
                    finishIngredients && finishIngredients.map(el => {
                        return <OrderCard arr={el}/>
                    })
                }

            </li>
            <FormattedDate className='text text_type_main-default text_color_inactive mt-10' date={new Date(dateFromServer)}/>
            <div className={styles.totalPrice}>
                <p className='text text_type_digits-default'>{totalPrice}</p>
                <CurrencyIcon type='primary'/>
            </div>
        </div>
        :  <h1>'Загрузка...'</h1>
    )
}

export default OrderInfoPage