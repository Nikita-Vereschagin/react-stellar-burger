
            //Imports//

import styles from "./app.module.css";

import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header"

import { SET_APIDATA } from "../../services/ingredientsSlice";
import { SET_ORDER_NUMBER } from "../../services/orderSlice";

import { Routes, Route } from 'react-router-dom';

import HomePage from "../../pages/home/home";
import NotFoundPage from "../../pages/not-found/not-found";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";


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
      .then(res => res.success ? dispatch(SET_ORDER_NUMBER(res.order.number)) : null)
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }

  const signIn = (data) => {
    const {email, password} = data
    fetch(`${domain}auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => isOk(res))
      .then(res => res.success ? console.log('all good') : null)
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }

  const register = (data) => {
    const {email, password, name} = data
    fetch(`${domain}auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => isOk(res))
      .then(res => res.success ? console.log('all good') : null)
      .catch(err => console.log(`Что-то пошло не так :( Ошибка: ${err}`))
  }


  return (
      <div className={styles.app}>

        <AppHeader />
        

        <main className={styles.content}>
          <Routes>

            
            
            <Route path="/login" element={<LoginPage sub={signIn}/>} />

            <Route path="/register" element={<RegistrationPage sub={register}/>}/>

            <Route path="/forgot-password" element={<ForgotPasswordPage/>} />

            <Route path="/reset-password" element={<ResetPasswordPage/>}/>

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="*"  element={<NotFoundPage />} />

            <Route path="/" element={<HomePage subOrder={subOrder} />} />
            
          </Routes>
        </main>

      </div>
  );
}

export default App;
