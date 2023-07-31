
            //Imports//

import { useLocation } from 'react-router-dom';
import styles from './feed.module.css';
import FeedCard from '../../components/feed-card/feed-card';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

            //Constants//

const FeedPage = () => {

    const { total, totalToday, orders } = useSelector((state) => state.liveTable.table);

    const [done, setDone] = useState([])
    const [pending, setPending] = useState([])

    useEffect(() => {
        orders && orders.map(el => {
            if (el.status === 'done') {
                setDone([...done, el.number])
            } else if (el.status === 'pending'){
                setPending([...pending, el.number])
            }
        })
    }, orders)

    return (
        <>
            <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
            <div className={styles.box}>
                <li className={`${styles.list} custom-scroll`}>
                    {
                        orders && orders.map(el => {
                            if (el) {
                               return <FeedCard arr={el} />   
                            }else {
                                return null
                            }
                                
                        })
                    }
                   
                </li> 
                <div className={styles.orderBox}>
                    <div className={`${styles.orderNumbers} mb-15`}>
                        <div>
                            <h3 className='text text_type_main-default mb-6'>Готовы:</h3>
                            <li className={`text text_type_digits-default ${styles.done} ${styles.li}`}>
                                {
                                    done && done.map(el => { 
                                        if (done.indexOf(el) > 10) {
                                            return null
                                        } else {
                                            return <ul className='text text_type_digits-default'>{el}</ul>
                                        }
                                    })
                                }
                                
                            </li>
                        </div>
                        <div>
                            <h3 className='text text_type_main-default mb-6'>В работе:</h3>
                            <li className={`text text_type_digits-default ${styles.li}`}>
                            {
                                    pending && pending.map(el => { 
                                        if (pending.indexOf(el) > 10) {
                                            return null
                                        } else {
                                            return <ul className='text text_type_digits-default'>{el}</ul>
                                        }
                                    })
                                }
                            </li>
                        </div>
                    </div>
                    <h3 className='text text_type_main-default'>Выполнено за все время:</h3>
                    <p className={`text text_type_digits-large mb-15 ${styles.total}`}>{total}</p>
                    <h3 className='text text_type_main-default'>Выполнено за сегодня:</h3>
                    <p className={`text text_type_digits-large ${styles.total}`}>{totalToday}</p>
                </div>
            </div>
            
        </>
    )
}

export default FeedPage