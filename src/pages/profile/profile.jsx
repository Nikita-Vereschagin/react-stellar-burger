
            //Imports//

import { useState, useCallback, useEffect } from "react";            


import styles from "./profile.module.css";

import { EmailInput, PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { patchUser } from "../../services/actions/authActions";
import { useForm } from "../../hooks/useForm";


const ProfilePage = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const { values, handleChange, setValues } = useForm({...user, password: '' })
  const [formEdited, setFormEdited] = useState(false);

  let subPatch = useCallback(
    e => {
      e.preventDefault();
      dispatch(patchUser(values))
    },
    [values, dispatch]
  );

  useEffect(() => {
    if (values.name !== user.name || values.email !== user.email || values.password !== ''){
      setFormEdited(true)
    }else {setFormEdited(false)}
  },[values, user.name, user.email])

  const [disabled, setDisabled] = useState(true)
  
  return (
      <ProfileNav>
        <form className={styles.inputBox} onSubmit={subPatch}>
          <Input icon="EditIcon" placeholder="Имя" name="name" value={values.name} onChange={handleChange} onIconClick={() => setDisabled(false)} onBlur={() => {setDisabled(true)}} disabled={disabled}/>
          <EmailInput isIcon={true} placeholder="Логин" name="email" value={values.email} onChange={handleChange} extraClass='mb-6 mt-6'/>
          <PasswordInput icon="EditIcon" placeholder="Пароль" name="password" value={values.password} onChange={handleChange}/>
          {formEdited && <div className={styles.btnBox}>
            <Button htmlType="reset" type="primary" size="medium" onClick={() => {setValues({...user, password: '' })}}>Отмена</Button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>          
          </div>}
        </form>
      </ProfileNav>
  );
}

export default ProfilePage;
