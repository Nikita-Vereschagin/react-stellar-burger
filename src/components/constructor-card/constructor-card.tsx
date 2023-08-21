
            //Imports//

import styles from "./constructor-card.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from 'react';
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../utils/types";
import { useDrop, useDrag } from "react-dnd";
import { DELETE_INGREDIENT } from "../../services/constructorSlice";
import { DECREASE } from "../../services/ingredientsSlice";
import { IBurgerIngredient } from "../burger-constructor/burger-constructor";

interface IConstructorCard {
  el: IBurgerIngredient,
  index: number,
  moveCard: (i: number, index: number) => void
}

interface IIndex extends IBurgerIngredient {
  index: number
}

const ConstructorCard: FC<IConstructorCard> = (props) => {

            //Facilities//

  const { el, index, moveCard } = props

  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)

            //DnD//

  const [, drop] = useDrop({
    accept: 'swapedCard',
    hover(item: IIndex , monitor) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) { return }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()

      if (!hoverBoundingRect || !clientOffset) { return }

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }

      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

      moveCard(item.index, index)

      item.index = hoverIndex

    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'swapedCard',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

            //Facilities for styles etc//  

  drag(drop(ref))

  const opacity = !isDragging ? 1 : 0

  return (
    <div className={styles.card} key={el.unicId} ref={ref} style={{ opacity: opacity }}>
      <div style={{ cursor: 'pointer' }} ><DragIcon type="primary"/></div>
      <ConstructorElement text={el.name} price={el.price} thumbnail={el.image_mobile} handleClose={() => {
        dispatch(DECREASE(el))
        dispatch(DELETE_INGREDIENT(el.unicId))
      }} />
    </div>
  );
}

export default ConstructorCard;
