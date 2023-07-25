
            //Imports//

import styles from "./app.module.css";

import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header"

import { SET_APIDATA } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";

import { Routes, Route, useNavigate } from 'react-router-dom';

import HomePage from "../../pages/home/home";
import NotFoundPage from "../../pages/not-found/not-found";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import { ProvideAuth } from "../../services/auth";
import { ProtectedRouteElement } from "../protectedRouteElement";


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
  const navigate = useNavigate()

              //Functions//

  useEffect(() => {
    fetch(`${domain}ingredients`)
      .then(res => isOk(res))
      .then(res => dispatch(SET_APIDATA(res.data)))
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }, [dispatch])

  let accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!accessToken){
      navigate({to: '/login', replace: true})
    }
  }, [accessToken])

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
    <ProvideAuth>
      <div className={styles.app}>

        <AppHeader />
        

        <main className={styles.content}>
          <Routes>

            
            
            <Route path="/login" element={<ProtectedRouteElement element={<LoginPage/>} />} />

            <Route path="/register" element={<ProtectedRouteElement element={<RegistrationPage/>} />}/>

            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage/>} />} />

            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage/>} />}/>

            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />

            <Route path="*"  element={<NotFoundPage />} />

            <Route path="/" element={<ProtectedRouteElement element={<HomePage subOrder={subOrder} />} />} />
            
          </Routes>
        </main>

      </div>
    </ProvideAuth>
  );
}

export default App;
