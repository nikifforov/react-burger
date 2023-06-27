import React from 'react';
import styles from "./preloader.module.sass"
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";


function Preloader () {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <div className={styles.preloader__logo}>
          <Logo />
        </div>
      </div>
    </div>
  );
}

export default Preloader;