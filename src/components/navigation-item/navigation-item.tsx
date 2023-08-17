
            //Imports//

import { FC, ReactNode } from 'react';
import navStyles from './navigation-item.module.css';

interface INavigationItem {
    class: string,
    text: string,
    children?: ReactNode
}

const NavigationItem: FC<INavigationItem> = (props) => {
    return (
        <div className={navStyles.container}>
            {props.children}
            <p className={props.class}>{props.text}</p>
        </div>
    )
}


export default NavigationItem