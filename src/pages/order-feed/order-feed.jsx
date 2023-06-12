import React from 'react';
import styles from "./order-feed.module.sass";

function OrderFeed () {
  return (
    <div className={styles.feed}>
      <p className={`text text_type_main-medium`}>Тут будет лента заказов</p>
    </div>
  );
}

export default OrderFeed;