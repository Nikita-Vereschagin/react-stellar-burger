
            //Imports//

import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item/navigation-item'

import appHeader from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={appHeader.header}>
            <nav className={appHeader.container}>
                <NavigationItem class={`text text_type_main-default ${appHeader.color}`} text='Конструктор'>
                    <BurgerIcon type="primary" />
                </NavigationItem>
                <NavigationItem class='text text_type_main-default text_color_inactive' text='Лента заказов'>
                    <ListIcon type="secondary" />
                </NavigationItem>
            </nav>
            <div className={appHeader.logo}><Logo /></div>
            <NavigationItem class='text text_type_main-default text_color_inactive' text='Личный кабинет'>
                <ProfileIcon type="secondary" />
            </NavigationItem>
        </header>
    )
}

export default AppHeader