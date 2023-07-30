
            //Imports//

import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item/navigation-item'

import appHeader from './app-header.module.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className={appHeader.header}>
            <nav className={appHeader.container}>
                <NavLink style={{textDecoration: 'none'}} to='/' className={({ isActive }) =>  isActive ? appHeader.active : "text_color_inactive"}>
                    {({isActive})=> 
                        <NavigationItem class='text text_type_main-default' text='Конструктор'>
                            <BurgerIcon type={isActive ? "primary" : "secondary" } />
                        </NavigationItem>}
                </NavLink>
                <NavLink style={{textDecoration: 'none'}} to='/feed' className={({ isActive }) =>  isActive ? appHeader.active : "text_color_inactive"} >
                    {({isActive})=>
                        <NavigationItem class='text text_type_main-default' text='Лента заказов'>
                            <ListIcon type={isActive ? "primary" : "secondary"} />
                        </NavigationItem>}
                </NavLink>
            </nav>
            <Link to='/' className={appHeader.logo}><Logo /></Link>
            <NavLink style={{textDecoration: 'none'}} to='/profile' className={({ isActive }) =>  isActive ? appHeader.active : "text_color_inactive"}>
                {({isActive})=>
                    <NavigationItem class='text text_type_main-default' text='Личный кабинет'>
                        <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    </NavigationItem>
                }
            </NavLink>

        </header>
    )
}

export default AppHeader