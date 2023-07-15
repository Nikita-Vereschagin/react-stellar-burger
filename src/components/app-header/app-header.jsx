
            //Imports//

import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item/navigation-item'

import appHeader from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';

const AppHeader = () => {

    const location = useLocation()
    const path = location.pathname 

    let navOne
    let navTwo
    let navThree

    if (path === '/profile') {
        navOne = null
        navTwo = null
        navThree = 'white'
    }else if (path === '/orders') {
        navOne = null
        navTwo = 'white'
        navThree = null
    }else {
        navOne = 'white'
        navTwo = null
        navThree = null
    }


    return (
        <header className={appHeader.header}>
            <nav className={appHeader.container}>
                <Link to='/' className={appHeader.link}>
                    <NavigationItem class='text text_type_main-default text_color_inactive' text='Конструктор' style={navOne}>
                        <BurgerIcon type={navOne ? "primary" : "secondary"} />
                    </NavigationItem>
                </Link>
                <Link to='#' className={appHeader.link}>
                    <NavigationItem class='text text_type_main-default text_color_inactive' text='Лента заказов' style={navTwo}>
                        <ListIcon type={navTwo ? "primary" : "secondary"} />
                    </NavigationItem>
                </Link>
            </nav>
            <Link to='/login' className={appHeader.logo}><Logo /></Link>
            <Link to='/profile' className={appHeader.link}>
                <NavigationItem class='text text_type_main-default text_color_inactive' text='Личный кабинет' style={navThree}>
                    <ProfileIcon type={navThree ? "primary" : "secondary"} />
                </NavigationItem>
            </Link>
        </header>
    )
}

export default AppHeader