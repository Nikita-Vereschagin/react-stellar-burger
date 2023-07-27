
            //Imports//

import { useState, useCallback } from "react";            


import styles from "./profile.module.css";

import { EmailInput, PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { patchUser } from "../../services/actions/authActions";


const ProfilePage = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [form, setValue] = useState({...user, password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let subPatch = useCallback(
    e => {
      e.preventDefault();
      dispatch(patchUser(form))
    },
    [form]
  );

  const [disabled, setDisabled] = useState(true)
  
  return (
      <ProfileNav>
        <form className={styles.inputBox} onSubmit={subPatch}>
          <Input icon="EditIcon" placeholder="Имя" name="name" value={form.name} onChange={onChange} onIconClick={() => setDisabled(false)} onBlur={() => {setDisabled(true)}} disabled={disabled}/>
          <EmailInput isIcon={true} placeholder="Логин" name="email" value={form.email} onChange={onChange} extraClass='mb-6 mt-6'/>
          <PasswordInput icon="EditIcon" placeholder="Пароль" name="password" value={form.password} onChange={onChange}/>
          <div className={styles.btnBox}>
            <Button htmlType="reset" type="primary" size="medium" onClick={() => {setValue({...user, password: '' })}}>Отмена</Button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>          
          </div>
        </form>
      </ProfileNav>
  );
}

export default ProfilePage;
