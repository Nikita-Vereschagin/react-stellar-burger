
            //Imports//

import { useState } from "react";            


import styles from "./login.module.css";

import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const LoginPage = (sub) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  return (
    <form className={styles.box}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Вход</h2>
        <EmailInput isIcon={false} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} extraClass='mb-6 mt-6' required/>
        <PasswordInput placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required/>
        <Button onClick={e =>{
          e.preventDefault()
          sub({email, password})
        }} htmlType="submit" type="primary" size="medium" extraClass={`mb-20 mt-6 ${styles.btn}`}>Войти</Button>
        <p className={`text text_type_main-default mb-4 ${styles.text}`}>Вы — новый пользователь? <Link to='/register' className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link></p>
        <p className={`text text_type_main-default ${styles.text}`}>Забыли пароль? <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link></p>
    </form>
  );
}

export default LoginPage;
