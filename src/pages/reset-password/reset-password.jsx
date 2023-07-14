
            //Imports//

import { useState } from "react";            


import styles from "./reset-password.module.css";

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const ResetPasswordPage = () => {
  const [email, setEmail] = useState(null)


  return (
    <form className={styles.box}>
        <h2 className={`text text_type_main-medium ${styles.text}`}>Восстановление пароля</h2>
        <EmailInput isIcon={false} placeholder="Укажите e-mail" value={email} onChange={e => setEmail(e.target.value)} extraClass='mb-6 mt-6'/>
        <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>Восстановить</Button>
        <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль? <Link to='#' className={`text text_type_main-default ${styles.link}`}>Войти</Link></p>
    </form>
  );
}

export default ResetPasswordPage;
