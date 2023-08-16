
            //Imports//

import { useLocation } from 'react-router-dom';
import styles from './feed.module.css';
import FeedCard, { IFeedCard } from '../../components/feed-card/feed-card';
import { useSelector } from '../..';
import { FC, useEffect, useMemo, useState } from 'react';

            //Constants//

const FeedPage: FC = () => {

    const location = useLocation()
    
    const data = useSelector((state) => state.liveTable.table);
    const profileData = useSelector((state) => state.profileLiveTable.table);

    const [done, setDone] = useState<number[]>([])
    const [pending, setPending] = useState<number[]>([])

    const finishData = useMemo(() =>{
        if (location.pathname === '/feed'){
            return data
        } else {
            return profileData
        }
    },[location.pathname, data, profileData])

    const { total, totalToday, orders } = finishData

    useEffect(() => {
        orders && orders.map((el: IFeedCard)  => {
            if (el.status === 'done' && !done.includes(el.number)) {
                
                setDone([...done, el.number])
            } else if (el.status === 'pending' && !pending.includes(el.number)){
                setPending([...pending, el.number])
            }else {
                return null
            }
        })
    }, [orders])

    return ( orders ?
        <>
            {location.pathname.includes('/feed') && <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>}
            <div className={styles.box}>
                <li className={`${styles.list} custom-scroll`}>
                    {
                        orders && orders.map((el: IFeedCard) => {
                            if (el) {
                               return <FeedCard arr={el} />   
                            }else {
                                return null
                            }
                                
                        })
                    }
                   
                </li> 
                {location.pathname.includes('/feed') && <div className={styles.orderBox}>
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
                    </div>}
            </div>
            
        </> : <h1>'Загрузка...'</h1>
    )
}

export default FeedPage