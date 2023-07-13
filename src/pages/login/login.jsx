
            //Imports//

import { useState } from "react";            


import styles from "./login.module.css";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";


const LoginPage = () => {
  const [value, setValue] = useState(null)
  return (
    <div className={styles.box}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input type="text" placeholder="E-mail" value={value} onChange={e => setValue(e.target.value)}/>
    </div>
  );
}

export default LoginPage;
