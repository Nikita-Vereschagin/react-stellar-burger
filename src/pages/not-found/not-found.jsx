
            //Imports//

import styles from "./not-found.module.css";
import error from '../../images/404-error.svg'

const NotFoundPage = () => {
  return (
      <div className={styles.content}>
        <img src={error} className={styles.image}/>
        <p className={`text text_type_main-large ${styles.text}`}>Страница не найдена ;(</p>
      </div>
  );
}

export default NotFoundPage;
