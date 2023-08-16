
            //Imports/       

import styles from "./profile-nav.module.css";

import { Link, Outlet, useLocation } from "react-router-dom";
import { logout } from "../../services/actions/authActions";
import { useDispatch } from "react-redux";
import { FC } from "react";


const ProfileNav: FC = () => {

    const location = useLocation()
    const path = location.pathname 

    let navOne
    let navTwo

    if (path === '/profile') {
        navOne = 'white'
        navTwo = undefined
    }else {
        navOne = undefined
        navTwo = 'white'
    }

  const dispatch = useDispatch()
  
  return (
    <div className={styles.box}>
      <nav className={styles.nav}>
        <Link to='/profile' className={`text text_type_main-medium ${styles.link}`} style={{color: navOne}}>
          Профиль
        </Link>
        <Link to='/profile/orders' className={`text text_type_main-medium ${styles.link}` } style={{color: navTwo}}>
          История заказов
        </Link>
        <Link to='/' onClick={() => {dispatch(logout())}} className={`text text_type_main-medium ${styles.link}`}>
          Выход
        </Link>
        <p className={`text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете
изменить свои персональные данные</p>
      </nav>
      <Outlet />
    </div>
    
  );
}

export default ProfileNav;
