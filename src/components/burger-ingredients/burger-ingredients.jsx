
            //Imports//

import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardBox from '../card-box/card-box';

import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {

            //Facilities//

    const [current, setCurrent] = useState('one')

    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)

            //Functions//

    const navigate = () => {
        const bunTop = bunRef.current.getBoundingClientRect().top
        const sauceTop = sauceRef.current.getBoundingClientRect().top
        const mainTop = mainRef.current.getBoundingClientRect().top

        if (bunTop >= 0 && bunTop <= 300) {
            setCurrent('one')
        } else if (sauceTop >= 0 && sauceTop <= 540) {
            setCurrent('two')
        } else if (mainTop >= 0 && mainTop <= 260) {
            setCurrent('three')
        }
    }

    return (

        <div className={styles.content}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <ul className={`${styles.container} custom-scroll`} onScroll={navigate}>
                <section ref={bunRef}><CardBox type="bun" text='Булки' /></section>
                <section ref={sauceRef}><CardBox type="sauce" text='Соусы' /></section>
                <section ref={mainRef}><CardBox type="main" text='Начинки' /></section>
            </ul>

        </div>

    )
}

export default BurgerIngredients