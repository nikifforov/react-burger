import React from 'react';
import styles from "./ingredients-group.module.sass"
import IngredientsItem from "./ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import { ingredientsProtoTypes } from "../../../utils/types";

function IngredientsGroup(props) {
  const { type, title, data, openModal } = props

  return (
    <div id={type} className={`${styles.ingredientsGroup}`}>
      <p className={`text text_type_main-medium`}>{title}</p>
      <div  className={`${styles.ingredientsGroup__items}`}>
        {data.map((item) => {
          return <IngredientsItem key={item._id} ingredient={item} openModal={openModal}/>
        })}
      </div>
    </div>
  );
}

IngredientsGroup.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientsProtoTypes).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default IngredientsGroup;