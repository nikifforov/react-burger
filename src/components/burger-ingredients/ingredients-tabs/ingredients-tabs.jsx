import React from 'react';
import styles from "./ingredients-tabs.module.sass"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

function IngredientsTabs(props) {
  const { currentTab, setCurrentTab } = props;

  const handleScroll = (e) => {
    setCurrentTab(e)
    const el = document.querySelector("#" + e);
    el.scrollIntoView({behavior: "smooth"})
  }

  return (
    <div className={styles.ingredientsTabs}>
      <Tab active={currentTab === "bun"} value="bun" onClick={handleScroll}>Булки</Tab>
      <Tab active={currentTab === "sauce"} value="sauce" onClick={handleScroll}>Соусы</Tab>
      <Tab active={currentTab === "main"} value="main" onClick={handleScroll}>Начинки</Tab>
    </div>
  );
}

export default IngredientsTabs;