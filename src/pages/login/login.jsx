
            //Imports//

import { useState, useCallback } from "react";            


import styles from "./login.module.css";
import { login } from "../../services/actions/authActions";
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const LoginPage = () => {
  const dispatch = useDispatch()
  const [form, setValue] = useState({email: '', password: '' });
  
  const user = useSelector(state => state.user.user)


  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let subLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(login(form))
    },
    [form]
  );

  return (
    <form className={styles.box} onSubmit={subLogin}>
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
