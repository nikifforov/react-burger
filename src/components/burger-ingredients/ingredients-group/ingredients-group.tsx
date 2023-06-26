import React from 'react';
import styles from "./ingredients-group.module.sass"
import IngredientsItem from "./ingredients-item/ingredients-item";
import { IIngredients } from "../../../utils/types";

interface IIngredientsGroup {
  type: string;
  title: string;
  data: IIngredients[];
}

function IngredientsGroup(props: IIngredientsGroup) {
  const { type, title, data } = props

  return (
    <div id={type} className={`${styles.ingredientsGroup}`}>
      <p className={`text text_type_main-medium`}>{title}</p>
      <div  className={`${styles.ingredientsGroup__items}`}>
        {data.map((item: IIngredients) => {
          return <IngredientsItem key={item._id} ingredient={item}/>
        })}
      </div>
    </div>
  );
}


export default IngredientsGroup;