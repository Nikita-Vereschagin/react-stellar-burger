
            //Imports//

import { useState,useCallback } from "react";            


import styles from "./register.module.css";

import { EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../../services/auth";


const RegistrationPage = () => {
  let auth = useAuth()

  const [form, setValue] = useState({name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let register = useCallback(
    e => {
      e.preventDefault();
      auth.register(form);
    },
    [auth, form]
  );

  if (auth.user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  const nameValidate = /^[A-ZА-ЯЁ]+$/i.test(form.name)

  const nameErr = form.name && form.name.length < 2 && nameValidate ? 'Имя слишком короткое, минимальная длина: 2' : "Имя может содержать только буквы латинского и русского алфавита"

  return (
    <form className={styles.box} onSubmit={register}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Регистрация</h2>
        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} extraClass='mb-6 mt-6' errorText={nameErr} error={form.name? form.name.length < 2 || !nameValidate : null} minLength={2} maxLength={30} required/>
        <EmailInput isIcon={false} placeholder="E-mail" name="email" value={form.email} onChange={onChange} required/>
        <PasswordInput placeholder="Пароль" name="password" value={form.password} onChange={onChange} extraClass='mb-6 mt-6' required/>
        <Button htmlType="submit" size="medium" extraClass={styles.btn}>Зарегистрироваться</Button>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>Уже зарегистрированы? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default RegistrationPage;
