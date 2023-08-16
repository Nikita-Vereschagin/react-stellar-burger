
            //Imports//

import { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

interface IModalProps {
    visible: boolean,
    closePopup: () => void,
    children?: ReactNode
  }

const ModalOverlay: FC<IModalProps> = (props) => {

            //Facilities for styles etc//

    const visibility = props.visible ? 'flex' : 'none'
    
    return (
        <div className={styles.overlay} style={{ display: `${visibility}` }} onMouseUp={(e) => {
            props.closePopup()
            e.stopPropagation()
        }}>
            {props.children}
        </div>)
}


export default ModalOverlay