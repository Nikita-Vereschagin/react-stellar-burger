
            //Imports//

import navStyles from './navigation-item.module.css';
import PropTypes from 'prop-types';

const NavigationItem = (props) => {
    return (
        <div className={navStyles.container}>
            {props.children}
            <a className={`${props.class} ${navStyles.a}`} href='#'>{props.text}</a>
        </div>
    )
}

NavigationItem.propTypes = {
    class: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.element
}

export default NavigationItem