
            //Imports//

import { useState } from "react";            


import styles from "./forgot-password.module.css";

import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const ForgotPasswordPage = () => {
  const [password, setPassword] = useState(null)
  const [code, setCode] = useState(null)

  return (
    <form className={styles.box}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Восстановление пароля</h2>
        <PasswordInput placeholder="Введите новый пароль" value={password} onChange={e => setPassword(e.target.value)} extraClass='mb-6 mt-6'/>
        <Input placeholder="Введите код из письма" value={code} onChange={e => setCode(e.target.value)}  />
        <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20 mt-6'>Сохранить</Button>
        <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль? <Link to='#' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default ForgotPasswordPage;
