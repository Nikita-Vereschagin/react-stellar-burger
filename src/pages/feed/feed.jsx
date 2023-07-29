
            //Imports//

import { useLocation } from 'react-router-dom';
import styles from './feed.module.css';
import FeedCard from '../../components/feed-card/feed-card';

            //Constants//

const FeedPage = () => {

            //Facilities//

    return (
        <>
            <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
            <div className={styles.box}>
                <li className={`${styles.list} custom-scroll`}>
                    <FeedCard />    
                </li> 
                <div className={styles.orderBox}>
                    <div className={`${styles.orderNumbers} mb-15`}>
                        <div>
                            <h3 className='text text_type_main-default mb-6'>Готовы:</h3>
                            <li className={`text text_type_digits-default ${styles.done} ${styles.li}`}>
                                <ul></ul>
                            </li>
                        </div>
                        <div>
                            <h3 className='text text_type_main-default mb-6'>В работе:</h3>
                            <li className={`text text_type_digits-default ${styles.li}`}>
                                <ul></ul>
                            </li>
                        </div>
                    </div>
                    <h3 className='text text_type_main-default'>Выполнено за все время:</h3>
                    <p className={`text text_type_digits-large mb-15 ${styles.total}`}>total</p>
                    <h3 className='text text_type_main-default'>Выполнено за сегодня:</h3>
                    <p className={`text text_type_digits-large ${styles.total}`}>totalToday</p>
                </div>
            </div>
            
        </>
    )
}

export default FeedPage