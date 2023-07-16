
            //Imports//

import { useState } from "react";            


import styles from "./profile.module.css";

import { EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


const ProfilePage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  const [disabled, setDisabled] = useState(true)
  
  return (
    <div className={styles.box}>
      <nav className={styles.nav}>
        <Link to='/profile' className={`text text_type_main-medium ${styles.link}`} style={{color: 'white'}}>
          Профиль
        </Link>
        <Link to='/profile/orders' className={`text text_type_main-medium ${styles.link}`}>
          История заказов
        </Link>
        <Link className={`text text_type_main-medium ${styles.link}`}>
          Выход
        </Link>
        <p className={`text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете
изменить свои персональные данные</p>
      </nav>
      <div className={styles.inputBox}>
        <Input icon="EditIcon" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} onIconClick={() => setDisabled(false)} onBlur={() => {setDisabled(true)}} disabled={disabled}/>
        <EmailInput isIcon={true} placeholder="Логин" value={email} onChange={e => setEmail(e.target.value)} extraClass='mb-6 mt-6'/>
        <PasswordInput icon="EditIcon" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>

    </div>
    
  );
}

export default ProfilePage;
