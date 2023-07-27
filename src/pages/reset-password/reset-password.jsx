            //Imports//

import { useState, useCallback } from "react";            


import styles from "./reset-password.module.css";

import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/actions/authActions";


const ResetPasswordPage = () => {
  const dispatch = useDispatch()
  const [form, setValue] = useState({password: '', token: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let sub = useCallback(
    e => {
      e.preventDefault();
      dispatch(resetPassword(form))
    },
    [form]
  );

  return (
    <form className={styles.box} onSubmit={sub}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Восстановление пароля</h2>
        <PasswordInput placeholder="Введите новый пароль" name="password" value={form.password} onChange={onChange} extraClass='mb-6 mt-6'/>
        <Input placeholder="Введите код из письма" value={form.code} onChange={onChange}  />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mb-20 mt-6 ${styles.btn}`}>Сохранить</Button>
        <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default ResetPasswordPage;