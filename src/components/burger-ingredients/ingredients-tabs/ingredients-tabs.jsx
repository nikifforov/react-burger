import React from 'react';
import styles from "./ingredients-tabs.module.sass"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

function IngredientsTabs() {
  const [current, setCurrent] = React.useState('bun')

  const handleScroll = (e) => {
    setCurrent(e)
    const el = document.querySelector("#" + e);
    el.scrollIntoView({behavior: "smooth"})
  }

  return (
    <div className={styles.ingredientsTabs}>
      <Tab active={current === "bun"} value="bun" onClick={handleScroll}>Булки</Tab>
      <Tab active={current === "sauce"} value="sauce" onClick={handleScroll}>Соусы</Tab>
      <Tab active={current === "main"} value="main" onClick={handleScroll}>Начинки</Tab>
    </div>
  );
}

export default IngredientsTabs;