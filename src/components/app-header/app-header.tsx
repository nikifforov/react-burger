import React from 'react';
import styles from "./app-header.module.sass"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { NavLink } from "react-router-dom";


function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <NavLink to="/"
            className={({ isActive }) =>
              isActive ? styles.buttonActive : styles.buttonDisable
            }
          >
            <BurgerIcon type="primary"/>
            <span className={`text text_type_main-default`}>Конструктор</span>
          </NavLink>

          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? styles.buttonActive : styles.buttonDisable
            }
          >
            <ListIcon type="primary"/>
            <span className={`text text_type_main-default`}>Лента заказов</span>
          </NavLink>
        </nav>
        <NavLink
          to="/"
          className={styles.header__logo}>
          <Logo/>
        </NavLink>
        <div className={styles.header__lk}>
          <NavLink to="/profile"
             className={({ isActive }) =>
                 isActive ? styles.buttonActive : styles.buttonDisable
             }
          >
            <ProfileIcon type="primary"/>
            <span className={`text text_type_main-default`}>Личный кабинет</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;