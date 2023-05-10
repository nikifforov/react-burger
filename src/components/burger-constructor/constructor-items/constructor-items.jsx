import React from 'react';
import styles from "./constructor-items.module.sass"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import ConstructorItem from "./constructor-item/constructor-item";
import PropTypes from "prop-types";
// import { ingredientsProtoTypes } from "../../../utils/types";

function ConstructorItems( { card } ) {

  return (
    <div className={`mb-10  ${styles.constructorItems}`}>
      <ConstructorElement
        extraClass={`ml-8 mr-4`}
        type="top"
        isLocked={true}
        text={`${card.bun.name} (верх)`}
        price={card.bun.price}
        thumbnail={card.bun.image}/>

      <div className={`custom-scroll ${styles.constructorItems__scroll}`}>
        { card.ingredients.map((item) => {
          if (item.type !== "bun") {
            return (
              <ConstructorItem key={item._id} name={item.name} image={item.image} price={item.price}/>
            )
          }
        }) }
      </div>

      <ConstructorElement
        extraClass={`ml-8 mr-4`}
        type="bottom"
        isLocked={true}
        text={`${card.bun.name} (низ)`}
        price={card.bun.price}
        thumbnail={card.bun.image}/>
    </div>
  );
}


ConstructorItems.propTypes = {
  card: PropTypes.object.isRequired,
}

export default ConstructorItems;