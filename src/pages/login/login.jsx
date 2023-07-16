
            //Imports//

import { useState, useCallback } from "react";            


import styles from "./login.module.css";

import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../../services/auth";


const LoginPage = () => {
  let auth = useAuth()

  const [form, setValue] = useState({email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    e => {
      e.preventDefault();
      auth.signIn(form);
    },
    [auth, form]
  );

  console.log(auth)

  if (auth.user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }


  return (
    <form className={styles.box} onSubmit={login}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Вход</h2>
        <EmailInput name="email" isIcon={false} placeholder="E-mail" value={form.email} onChange={onChange} extraClass='mb-6 mt-6' required/>
        <PasswordInput placeholder="Пароль" name="password" value={form.password} onChange={onChange} required/>
        <Button htmlType="submit" size="medium" extraClass={`mb-20 mt-6 ${styles.btn}`}>Войти</Button>
        <p className={`text text_type_main-default mb-4 ${styles.text}`}>Вы — новый пользователь? <Link to='/register' className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link></p>
        <p className={`text text_type_main-default ${styles.text}`}>Забыли пароль? <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link></p>
    </form>
  );
}

export default LoginPage;
