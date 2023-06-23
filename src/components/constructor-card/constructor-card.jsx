import styles from "./constructor-card.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { DELETE_INGREDIENT } from "../../services/constructorSlice";
import { DECREASE } from "../../services/ingredientsSlice";


const ConstructorCard = (props) => {
    const {el, index, moveCard} = props

    const ingredients = useSelector(state => state.burgerConstructor.ingredients)
    
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [, drop] = useDrop({
      accept: 'swapedCard',
      hover(item, monitor) {
        const dragIndex = item.index
        const hoverIndex = index
        
        if (dragIndex === hoverIndex) { return }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()

        if (!hoverBoundingRect || !clientOffset) { return }

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

        moveCard(item.index, index)

        item.index = hoverIndex

        //Всё в точности, как у вас на скриншоте. Так же сравнил с примером из react-dnd.
        //Возможно где-то здесь ошибка, но я не понимаю, где она может быть.
        //Так же, в вашем примере кода moveCard(index, item.index), но по суте мы передаем элементы наоборот,
        //опять же опираясь на пример из react-dnd. Это, конечно влияет на процесс, но так как он не работает, 
        //ни с вашим примером, ни с моим, то дело не в этом. Проверил все константы, всё в порядке, всё считается.
        //Что касается индексов, то всё работает, опять же оно и меняется и передается.
      }
    })
    const [{ isDragging }, drag] = useDrag({
      type: 'swapedCard',
      item: () => {
        return {index: ingredients.indexOf(el)}
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    drag(drop(ref))

    const opacity = !isDragging ? 1 : 0

    return (
        <div className={styles.card} key={el.unicId} ref={ref} style={{opacity: opacity}}>
            <div style={{cursor: 'pointer'}} ><DragIcon/></div>
            <ConstructorElement text={el.name} price={el.price} thumbnail={el.image_mobile} handleClose={()=>{
                dispatch(DECREASE(el))
                dispatch(DELETE_INGREDIENT(el.unicId))
                }}/>
        </div>
    );
}

export default ConstructorCard;
