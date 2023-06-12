import React from 'react';
import styles from "./profile.module.sass";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendLogout } from "../../services/actions/auth-actions";



function Profile () {

  const dispatch = useDispatch()

const handleLogout = (e) => {
  e.preventDefault();
  dispatch(sendLogout())
}


  return (
    <div className={styles.profile}>
      <div className={styles.profile__wrapper}>
        <ul>
          <li className="text text_type_main-medium">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text_color_primary" : "text_color_inactive"
              }
              end
            >
              Профиль
            </NavLink>
          </li>
          <li className="text text_type_main-medium">
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                isActive ? "text_color_primary" : "text_color_inactive"
              }
              end
            >
              История Заказов
            </NavLink>
          </li>
          <li className="text text_type_main-medium">
            <button
              className={ "text text_type_main-medium"}
              onClick={handleLogout}
            >
              Выход
            </button>
          </li>
        </ul>
        <p className={`${styles.profile__wrapper__note} text text_type_main-default`}>В этом разделе вы можете
          изменить свои персональные данные</p>
      </div>
      <div className={styles.profile__main}>
        <Outlet/>
      </div>
    </div>
  );
}

export default Profile;