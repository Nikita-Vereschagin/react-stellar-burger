
            //Imports//

import styles from "./app.module.css";

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../app-header/app-header"

import { SET_APIDATA } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import HomePage from "../../pages/home/home";
import NotFoundPage from "../../pages/not-found/not-found";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import { checkUserAuth } from "../../services/actions/authActions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { SET_INGREDIENT_DETAILS } from "../../services/ingredientDetailsSlice";

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
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const user = useSelector(state => state.user.user)

              //Functions//

  useEffect(() => {
    dispatch(checkUserAuth());
    fetch(`${domain}ingredients`)
      .then(res => isOk(res))
      .then(res => dispatch(SET_APIDATA(res.data)))
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }, [dispatch])

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
      .then(res => {
        if (!user) {
          navigate('/login')
        } 
        else if (user && res.success) {
          dispatch(SET_ORDER_NUMBER(res.order.number))
        }else {navigate('/not-founded')}
      })
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }

  const handleModalClose = () => {
    dispatch(SET_INGREDIENT_DETAILS(null))
    navigate(-1);
  };


  return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.content}>
          <Routes location={background || location}>
          
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />

            <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage/>} />}/>

            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>} />} />

            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>} />}/>

            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
            
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />

            <Route path="*"  element={<NotFoundPage />} />

            <Route path="/" element={<HomePage subOrder={subOrder} />} />
            
          </Routes>
          {background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal closePopup={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}

        </main>

      </div>
  );
}

export default App;
