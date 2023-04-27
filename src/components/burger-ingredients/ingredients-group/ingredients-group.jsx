import React from 'react';
import styles from "./ingredients-group.module.sass"
import IngredientsItem from "./ingredients-item/ingredients-item";
import PropTypes from "prop-types";


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

IngredientsGroup.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default IngredientsGroup;