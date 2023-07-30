
            //Imports//

import { useCallback } from "react";            


import styles from "./register.module.css";

import { EmailInput, Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../../services/actions/authActions";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

const RegistrationPage = () => {
  const { values, handleChange } = useForm({name: '', email: '', password: '' })
  const dispatch = useDispatch()

  let registerSub = useCallback(
    e => {
      e.preventDefault();
      dispatch(register(values))
    },
    [values,dispatch]
  );
  
  const nameValidate = /^[A-ZА-ЯЁ]+$/i.test(values.name)

  const nameErr = values.name && values.name.length < 2 && nameValidate ? 'Имя слишком короткое, минимальная длина: 2' : "Имя может содержать только буквы латинского и русского алфавита"

  return (
    <form className={styles.box} onSubmit={registerSub}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Регистрация</h2>
        <Input placeholder="Имя" value={values.name} name="name" onChange={handleChange} extraClass='mb-6 mt-6' errorText={nameErr} error={values.name? values.name.length < 2 || !nameValidate : null} minLength={2} maxLength={30} required/>
        <EmailInput isIcon={false} placeholder="E-mail" name="email" value={values.email} onChange={handleChange} required/>
        <PasswordInput placeholder="Пароль" name="password" value={values.password} onChange={handleChange} extraClass='mb-6 mt-6' required/>
        <Button htmlType="submit" size="medium" extraClass={styles.btn}>Зарегистрироваться</Button>
        <p className={`text text_type_main-default mt-20 ${styles.text}`}>Уже зарегистрированы? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default RegistrationPage;
