import React from 'react';
import styles from "./ingredients-group.module.sass"
import IngredientsItem from "./ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import {ingredientsProtoTypes} from "../../../utils/types"


function IngredientsGroup(props) {
  const { type, title, data } = props

  return (
    <div id={type} className={`${styles.ingredientsGroup}`}>
      <p className={`text text_type_main-medium`}>{title}</p>
      <div  className={`${styles.ingredientsGroup__items}`}>
        {data.map((item) => {
          return <IngredientsItem key={item._id} data={item} />
        })}
      </div>
    </div>
  );
}

IngredientsGroup.prototype = {
  type: ingredientsProtoTypes,
  title: PropTypes.string.isRequired,
  data: ingredientsProtoTypes,
}

export default IngredientsGroup;