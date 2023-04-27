import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.sass"
import { ingredientsProtoTypes } from "../../../../utils/types";
import PropTypes from "prop-types";


function ConstructorItem ( props ) {

  const { name, price, image } = props;

  return (
        <div className={styles.constructorItem}>
          <DragIcon type="primary"/>
          <ConstructorElement text={name} thumbnail={image} price={price}/>
        </div>
  );
}

export default ConstructorItem;



ConstructorItem.propsTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}
