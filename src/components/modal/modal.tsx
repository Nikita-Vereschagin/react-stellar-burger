
            //Imports//

import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
    visible: boolean,
    closePopup: () => void,
    className?: string,
    children?: FC<PropsWithChildren<IModalProps>> | ReactNode
  }

const Modal: FC<IModalProps> = (props) => {

            //Functions//

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
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
                        <div className={styles.close}><CloseIcon type='primary' onClick={props.closePopup} /></div>
                        {props.children}
                    </div>
                </div>
                ,
                document.getElementById('modals')!)}
        </>
    )
}

export default Modal