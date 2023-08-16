
            //Imports//

import styles from "./not-found.module.css";
import error from '../../images/404-error.svg'
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
      <div className={styles.content}>
        <img src={error} className={styles.image} alt="Что-то пошло не так"/>
        <p className={`text text_type_main-large ${styles.text}`}>Страница не найдена ;(</p>
      </div>
  );
}

export default NotFoundPage;
