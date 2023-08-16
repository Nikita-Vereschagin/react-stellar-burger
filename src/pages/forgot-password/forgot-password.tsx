
            //Imports//

import { useCallback } from "react";            

import styles from "./forgot-password.module.css";

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { api } from "../../utils/api";
import { FC } from 'react';



const ForgotPasswordPage: FC = () => {
  const { values, handleChange } = useForm({email: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let sub = useCallback(
    e => {
      e.preventDefault();
      api.forgotPasswordRequest(values)
        .then(res => {
          if (res.success) {
              localStorage.setItem('enterFlag', res.success)
              navigate('/reset-password')
          }else {
              localStorage.removeItem('enterFlag')
          }
        })
    },
    [values, dispatch, navigate]
  );

  return (
    <form className={styles.box} onSubmit={sub}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Восстановление пароля</h2>
        <EmailInput isIcon={false} placeholder="Укажите e-mail" name="email" value={values.email} onChange={handleChange} extraClass='mb-6 mt-6'/>
        <Button htmlType="submit" size="medium" extraClass={`mb-20 ${styles.btn}`}>Восстановить</Button>
        <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default ForgotPasswordPage;


