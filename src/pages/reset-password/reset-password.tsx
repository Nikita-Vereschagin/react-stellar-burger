            //Imports//

import { useCallback, FC } from "react";            


import styles from "./reset-password.module.css";

import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "../../utils/types";
import { useForm } from "../../hooks/useForm";
import { api } from "../../utils/api";


const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { values, handleChange } = useForm({password: '', token: '' })

  let sub = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      api.resetPasswordRequest(values)
        .then(res => {
          if (res.success) {
            localStorage.removeItem('enterFlag')
            navigate('/')
        }
      })
    },
    [values, dispatch, navigate]
  );

  if (localStorage.getItem('enterFlag') === null){
    return <Navigate to='/' replace/>
  }

  return (
    <form className={styles.box} onSubmit={sub}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Восстановление пароля</h2>
        <PasswordInput placeholder="Введите новый пароль" name="password" value={values.password} onChange={handleChange} extraClass='mb-6 mt-6'/>
        <Input placeholder="Введите код из письма" name='token'value={values.token} onChange={handleChange}  />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mb-20 mt-6 ${styles.btn}`}>Сохранить</Button>
        <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default ResetPasswordPage;