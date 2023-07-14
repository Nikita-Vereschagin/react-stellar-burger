
            //Imports//

import { useState } from "react";            


import styles from "./register.module.css";

import { EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const RegistrationPage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  return (
    <form className={styles.box}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Регистрация</h2>
        <Input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} extraClass='mb-6 mt-6' />
        <EmailInput isIcon={false} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
        <PasswordInput placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} extraClass='mb-6 mt-6'/>
        <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>Уже зарегистрированы? <Link to='#' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default RegistrationPage;
