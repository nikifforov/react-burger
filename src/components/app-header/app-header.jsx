import React from 'react';
import styles from "./app-header.module.sass"
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"


function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <Button htmlType="button" type="secondary" size="medium" extraClass={`pr-4 pl-4 ${styles.active}`}>
            <BurgerIcon type="primary"/>
            <span className={`text text_type_main-default`}>Конструктор</span>
          </Button>
          <Button htmlType="button" type="secondary" size="medium" extraClass="pr-4 pl-4">
            <ListIcon type="primary"/>
            <span className={`text text_type_main-default`}>Лента заказов</span>
          </Button>
        </nav>
        <div className={styles.header__logo}>
          <Logo/>
        </div>
        <div className={styles.header__lk}>
          <Button htmlType="button" type="secondary" size="medium" extraClass="pr-4 pl-4">
            <ProfileIcon type="primary"/>
            <span className={`text text_type_main-default`}>Личный кабинет</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;