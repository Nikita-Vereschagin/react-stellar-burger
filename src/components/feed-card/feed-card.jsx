
            //Imports//

import { useEffect, useMemo, useState } from 'react';
import styles from './feed-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

            //Constants//

const FeedCard = ({arr}) => {
    const location = useLocation()
    const [dateFromServer, setDateFromServer] = useState(null)

    const id = arr.number
    const ingredientsList = useSelector(store => store.ingredients.ingredientsList)

    const url = useMemo(() => {
        if (location.pathname.includes('/feed') && id){
            return `/feed/${id}`
          } else if (location.pathname.includes('/profile/orders') && id){
            return `/profile/orders/${id}`
          } else {
             return null
          }

    }, [location.pathname])


    const orderIngredients = useMemo(() => {
        let orderIngredients = []
        ingredientsList.map(listIngredient => {
            arr.ingredients && arr.ingredients.map((arrayIngredient, id) => {
                if (arrayIngredient === listIngredient._id){
                    orderIngredients.push({...listIngredient, id: id})
                } else {
                    return null
                }
            })
        })

        return orderIngredients
    }, [ingredientsList, arr.ingredients])

    const totalPrice = useMemo(() => {
        let inredientsPrice = 0
        orderIngredients && orderIngredients.forEach(el => inredientsPrice += el.price)
        return inredientsPrice
    }, [orderIngredients])

    useEffect(() => {
        setDateFromServer(arr.createdAt)
    }, [arr.createdAt])
    return (
        url && <Link key={id} to={url} state={{ background: location }} className={styles.link}>
            <ul className={`${styles.box} pb-6 pt-6 pr-6 pl-6`}>
                <FormattedDate className={`text text_type_main-default text_color_inactive ${styles.date}`} date={new Date(dateFromServer)} />
                <h3 className='text text_type_digits-default mb-6'>{`#${arr.number}`}</h3>
                <h2 className='text text_type_main-medium'>{arr.name}</h2>
                <li className={`${styles.list} mt-6`}>
                    { 
                        orderIngredients && orderIngredients.map(el => {
                            if (orderIngredients.length >= 7 && orderIngredients.indexOf(el) === 5) {
                                return <ul style={{zIndex: `${orderIngredients.length-orderIngredients.indexOf(el)}`, position: 'relative'}} className={styles.icon}><p className={`text text_type_digits-default ${styles.number}`}>{`+${orderIngredients.length - 6}`}</p><img className={styles.img} alt={el.name} src={el.image_mobile}/></ul>
                            } else if (orderIngredients.indexOf(el) > 5) {
                                return null
                            }else if (orderIngredients.indexOf(el) === 0) {
                                return <ul style={{zIndex: `${orderIngredients.length-orderIngredients.indexOf(el)}`, margin: 0}} className={styles.icon}><img className={styles.img} alt={el.name} src={el.image_mobile}/></ul>
                            }return <ul style={{zIndex: `${orderIngredients.length-orderIngredients.indexOf(el)}`}} className={styles.icon}><img className={styles.img} alt={el.name} src={el.image_mobile}/></ul>
                        })
                    }
                    
                </li>
                <div className={styles.totalPrice}>
                    <p className='text text_type_digits-default'>{totalPrice}</p>
                    <CurrencyIcon />
                </div>
            </ul>
        </Link>
    )
}

export default FeedCard