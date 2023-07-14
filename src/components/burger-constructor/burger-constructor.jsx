
            //Imports//

import styles from "./burger-constructor.module.css";
import { CurrencyIcon, Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useState, useMemo, useCallback } from 'react';
import OrderDetails from "../order-details/order-details"
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, SET_BUN, SWAP_INGREDIENT } from "../../services/constructorSlice";
import { INCREASE } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";
import ConstructorCard from "../constructor-card/constructor-card";

const BurgerConstructor = (props) => {

            //Facilities//

    const dispatch = useDispatch()
    const { subClick } = props
    const [vis, setVis] = useState(false)

            //Constants//

    const burgerData = useSelector(state => state.burgerConstructor)

    const order = useSelector(state => state.orderDetails)

    const bun = burgerData.bun
    const ingredients = burgerData.ingredients
    
            //DnD//

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
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
        ingredients.forEach(el => inredientsPrice += el.price)
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
                    {ingredients.map((el, i) => {
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
                {isNumber && <CurrencyIcon />}
                <div className={styles.btn}>
                    <Button onClick={() => {
                        subClick([bun, ...ingredients, bun])
                        setVis(true)
                    }}
                        htmlType="button" size="medium" disabled={disabled}>Оформить заказ</Button>
                </div>

                {vis && order && (<Modal visible={vis} closePopup={() => {
                    setVis(false)
                    dispatch(SET_ORDER_NUMBER(null))
                }}><OrderDetails /></Modal>)}

            </div>

        </form>
    );
}

BurgerConstructor.propTypes = {
    subClick: PropTypes.func
}

export default BurgerConstructor;
