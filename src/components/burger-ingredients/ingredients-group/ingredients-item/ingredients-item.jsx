import React from 'react';
import styles from "./ingredients-item.module.sass"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
// import PropTypes from "prop-types";
import { ingredientsProtoTypes } from "../../../../utils/types"

function IngredientsItem(props) {

  const { data } = props;

  return (
    <div className={`${styles.ingredientsItem}`}>
      <div className={`mb-1 ${styles.ingredientsItem__img}`}>
        <img src={data.image_large} alt={data.name}/>
      </div>
      <div className={`${styles.ingredientsItem__info}`}>
        <div className={`mb-1 ${styles.ingredientsItem__price}`}>
          <p className={`text text_type_main-medium`}>{data.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.ingredientsItem__name}`}>{data.name}</p>
        <div>
          <Counter count={1} size="default" extraClass="m-1"/>
        </div>
      </div>
    </div>
  );
}

IngredientsItem.propTypes = {
  data: ingredientsProtoTypes,
}

export default IngredientsItem;