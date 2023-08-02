
            //Imports//

import styles from "./app.module.css";

import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header"

import { SET_APIDATA } from "../../services/ingredientsSlice";

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
import { api } from "../../utils/api";
import IngredientPage from "../../pages/ingredient/ingredient";
import FeedPage from "../../pages/feed/feed";
import OrderInfoPage from "../../pages/order-info/order-info";
import { connect, disconnect } from "../../services/live-table/actions";
import ProfileNav from "../profile-nav/profile-nav";
import { profileConnect, profileDisconnect } from "../../services/profile-live-table/actions";

const App = () => {

              //Facilities//

  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
              //Functions//

  useEffect(() => {
    dispatch(checkUserAuth());
    api.getIngredientsRequest()
      .then(res => dispatch(SET_APIDATA(res.data)))
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }, [dispatch])

  useEffect(() => {
    if (location.pathname.includes('/feed')){
      dispatch(profileDisconnect())
      dispatch(connect('wss://norma.nomoreparties.space/orders/all'))
    } else if (location.pathname.includes('/profile/orders')){
      dispatch(disconnect())
      dispatch(profileConnect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken').replace('Bearer ', '')}`))
    }  
    return () => {
      dispatch(disconnect())
      dispatch(profileDisconnect)
    }
  }, [location.pathname, dispatch])


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

            <Route path="/profile" element={<OnlyAuth component={<ProfileNav />} />} >
              <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} index/>
              <Route path="/profile/orders" element={<OnlyAuth component={<FeedPage />} />}/>
            </Route>
            <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderInfoPage />} />}/>
            
            <Route path='/ingredients/:ingredientId' element={<IngredientPage />} />
            
            <Route path='/feed' element={<FeedPage />} />
            <Route path="/feed/:id" element={<OrderInfoPage />} />
            <Route path="*"  element={<NotFoundPage />} />

            <Route path="/" element={<HomePage />} />
            
          </Routes>
          {background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal visible='true' closePopup={handleModalClose} className='pt-5 pb-5'>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:id'
                element={
                  <Modal visible='true' closePopup={handleModalClose} className='pt-5 pb-5'>
                    <OrderInfoPage />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:id'
                element={
                  <OnlyAuth component={
                    <Modal visible='true' closePopup={handleModalClose} className='pt-5 pb-5'>
                      <OrderInfoPage />
                    </Modal>} />
                }
              />
            </Routes>
          )}

        </main>

      </div>
  );
}

export default App;
