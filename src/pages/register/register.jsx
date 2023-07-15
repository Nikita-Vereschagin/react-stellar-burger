
            //Imports//

import { useState } from "react";            


import styles from "./register.module.css";

import { EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const RegistrationPage = (sub) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)

  const nameValidate = /^[A-ZА-ЯЁ]+$/i.test(name)

  const nameErr = name && name.length < 2 && nameValidate ? 'Имя слишком короткое, минимальная длина: 2' : "Имя может содержать только буквы латинского и русского алфавита"

  return (
    <form className={styles.box}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Регистрация</h2>
        <Input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} extraClass='mb-6 mt-6' errorText={nameErr} error={name? name.length < 2 || !nameValidate : null} minLength={2} maxLength={30} required/>
        <EmailInput isIcon={false} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
        <PasswordInput placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} extraClass='mb-6 mt-6' required/>
        <Button onClick={() =>{
          sub({email, password, name})
        }} htmlType="submit" type="primary" size="medium" extraClass={styles.btn}>Зарегистрироваться</Button>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>Уже зарегистрированы? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default RegistrationPage;
