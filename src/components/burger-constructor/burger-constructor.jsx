import React from 'react';
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";


function BurgerConstructor() {
  return (
    <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
      <ConstructorItems/>
      <ConstructorTotal/>
    </section>
  );
}

export default BurgerConstructor;