
            //Imports//

import { FC, ReactNode } from 'react';
import navStyles from './navigation-item.module.css';

interface INavigationItem {
    class: string,
    text: string,
    link: string,
    children?: ReactNode
}

const NavigationItem: FC<INavigationItem> = (props) => {
    return (
        <div className={navStyles.container}>
            {props.children}
            <a className={props.class} href={props.link}>{props.text}</a>
        </div>
    )
}


export default NavigationItem