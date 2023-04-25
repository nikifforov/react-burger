import React from 'react';
import styles from "./constructor-items.module.sass"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import {data} from "../../../utils/data";
import ConstructorItem from "./constructor-item/constructor-item";


function ConstructorItems() {

  return (
    <div className={`mb-10  ${styles.constructorItems}`}>
      <ConstructorElement
        extraClass={`ml-8 mr-4`}
        type="top"
        isLocked={true}
        text={data[0].name}
        price={data[0].price}
        thumbnail={data[0].image}/>




      <div className={`custom-scroll ${styles.constructorItems__scroll}`}>
        { data.map((item) => {
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
        text={data[0].name}
        price={data[0].price}
        thumbnail={data[0].image}/>
    </div>
  );
}

export default ConstructorItems;