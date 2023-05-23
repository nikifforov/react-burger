import React from 'react';
import styles from "./ingredients-tabs.module.sass";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN, SAUCE, MAIN } from "../../../utils/constants";

function IngredientsTabs(props) {
  const { currentTab, setCurrentTab } = props;

  const handleScroll = (e) => {
    setCurrentTab(e)
    const el = document.querySelector("#" + e);
    el.scrollIntoView({behavior: "smooth"})
  }

  return (
    <div className={styles.ingredientsTabs}>
      <Tab active={currentTab === BUN} value={BUN} onClick={handleScroll}>Булки</Tab>
      <Tab active={currentTab === SAUCE} value={SAUCE} onClick={handleScroll}>Соусы</Tab>
      <Tab active={currentTab === MAIN} value={MAIN} onClick={handleScroll}>Начинки</Tab>
    </div>
  );
}

export default IngredientsTabs;