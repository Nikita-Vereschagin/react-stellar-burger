
            //Imports//

import styles from "./burger-constructor.module.css";
import { CurrencyIcon, Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useState, useMemo, useCallback, FC } from 'react';
import OrderDetails from "../order-details/order-details"
import { useDispatch, useSelector } from "../..";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, SET_BUN, SWAP_INGREDIENT } from "../../services/constructorSlice";
import { INCREASE } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";
import ConstructorCard from "../constructor-card/constructor-card";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export interface IBurgerIngredient {
    _id: string,
    name: string,
    type: string,
    proteins:number,
    fat:number,
    carbohydrates:number,
    calories:number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    unicId?: number,
    count?: number
}

const BurgerConstructor: FC = () => {

            //Facilities//

    const dispatch = useDispatch()
    const [vis, setVis] = useState<boolean>(false)
    const [btnText, setBtnText] = useState<string>('Оформить заказ')
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user)

            //Constants//

    const burgerData = useSelector(state => state.burgerConstructor)

    const order = useSelector(state => state.orderDetails)

    const bun = burgerData.bun
    const ingredients = burgerData.ingredients
    
            //DnD//

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: IBurgerIngredient) {
            if (item.type === 'bun') {
                dispatch(SET_BUN(item))
                dispatch(INCREASE(item))
            } else {
                dispatch(ADD_INGREDIENT(item))
                dispatch(INCREASE(item))
            }
        }
    })

            //Functions//

    const totalPrice = useMemo(() => {
        let inredientsPrice = 0
        ingredients.forEach((el: IBurgerIngredient) => inredientsPrice += el.price)
        if (bun && inredientsPrice) {
            return bun.price * 2 + inredientsPrice
        }
        else if (!(bun || inredientsPrice)) {
            return 'Добавьте ингредиенты'
        } else if (!bun) {
            return 'Не хватает булок'
        } else if (!inredientsPrice) {
            return 'Не хватает начинки'
        }

    }, [bun, ingredients])

    const subClick = (burgerList: ReadonlyArray<IBurgerIngredient>) => {
        setBtnText('Заказ обрабатывается...')
        if (!user) {
            navigate('/login')
            } 
        api.orderRequest(burgerList)
            .then(res => {
                if (user && res.success) {
                    dispatch(SET_ORDER_NUMBER(res.order.number))
                }
            })
            .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
            .finally(() => setBtnText('Оформить заказ'))
    }


    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(SWAP_INGREDIENT({ dragIndex, hoverIndex }))
    }, [dispatch])

            //Facilities for styles etc//

    const isNumber = typeof totalPrice === 'number'

    const priceStyle = isNumber ? 'text text_type_digits-default' : 'text text_type_main-default'
    const disabled = isNumber ? false : true

    return (
        <form className={styles.content}>
            <ul className={styles.list} ref={dropRef}>

                {bun && <div className={styles.right}><ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} /></div>}

                <ul className={`${styles.ul} custom-scroll`}>
                    {ingredients.map((el: IBurgerIngredient, i: number) => {
                        if (el.type !== "bun") {
                            return <ConstructorCard el={el} key={el.unicId} moveCard={moveCard} index={i} />
                        } return console.error
                    })
                    }
                </ul>

                {bun && <div className={styles.right}><ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} /></div>}

            </ul>

            <div className={`${styles.btnBox} ${styles.right}`}>
                
                <p className={`${priceStyle} ${styles.p}`}>{totalPrice}</p>
                {isNumber && <CurrencyIcon type="primary"/>}
                <div className={styles.btn}>
                    <Button onClick={() => {
                        if (bun && ingredients){
                            subClick([bun, ...ingredients, bun])
                            setVis(true)
                        }
                    }}
                        htmlType="button" size="medium" disabled={disabled}>{btnText}</Button>
                </div>

                {vis && order && (<Modal visible={vis} closePopup={() => {
                    setVis(false)
                    dispatch(SET_ORDER_NUMBER(0))
                }}><OrderDetails /></Modal>)}

            </div>

        </form>
    );
}

export default BurgerConstructor;
