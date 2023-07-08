
            //Imports//

import styles from "./app.module.css";

import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { SET_APIDATA } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

            //Constants//

const domain = 'https://norma.nomoreparties.space/api/';
const isOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}


const App = () => {

              //Facilities//

  const dispatch = useDispatch()

              //Functions//

  useEffect(() => {
    fetch(`${domain}ingredients`)
      .then(res => isOk(res))
      .then(res => dispatch(SET_APIDATA(res.data)))
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }, [])

  const subOrder = (burgerList) => {
    fetch(`${domain}orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: burgerList.map(el => el._id)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => isOk(res))
      .then(res => res.success ? dispatch(SET_ORDER_NUMBER(res.order.number)) : null)
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }

  return (
    <div className={styles.app}>

      <AppHeader />

      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor subClick={subOrder} />
        </DndProvider>
      </main>

    </div>
  );
}

export default App;
