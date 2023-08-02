
            //Imports//

import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = (props) => {

            //Functions//

    useEffect(() => {
        const close = (e) => {
            if (e.key === 'Escape') {
                props.closePopup()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [props, props.visible])

    return (
        <>
            {props.visible && createPortal(
                <div className={styles.container}>
                    <ModalOverlay visible={props.visible} closePopup={props.closePopup}></ModalOverlay>
                    <div className={`${styles.popup} ${props.className}`}>
                        <div className={styles.close}><CloseIcon onClick={props.closePopup} /></div>
                        {props.children}
                    </div>
                </div>
                ,
                document.getElementById('modals'))}
        </>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
    closePopup: PropTypes.func
}

export default Modal