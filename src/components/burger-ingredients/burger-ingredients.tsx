
            //Imports//

import { useState, useRef, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardBox from '../card-box/card-box';

import styles from './burger-ingredients.module.css'

const BurgerIngredients: FC = () => {

            //Facilities//

    const [current, setCurrent] = useState<string>('one')

    const bunRef = useRef<HTMLElement>(null)
    const sauceRef = useRef<HTMLElement>(null)
    const mainRef = useRef<HTMLElement>(null)

            //Functions//

    const navigate = () => {
        const bunTop:number | undefined = bunRef.current?.getBoundingClientRect().top
        const sauceTop:number | undefined = sauceRef.current?.getBoundingClientRect().top
        const mainTop:number | undefined = mainRef.current?.getBoundingClientRect().top

        if (bunTop && bunTop >= 0 && bunTop <= 300) {
            setCurrent('one')
        } else if (sauceTop && sauceTop >= 0 && sauceTop <= 540) {
            setCurrent('two')
        } else if (mainTop && mainTop >= 0 && mainTop <= 260) {
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