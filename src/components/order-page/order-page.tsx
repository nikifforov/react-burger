import React, { useEffect, useState, useMemo } from 'react';
import styles from "./order-page.module.sass"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getOrder} from "../../services/actions/order-details-actions";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {CREATED, DONE, PENDING} from "../../utils/constants";
import {IIngredients} from "../../utils/types";

interface IOrderState {
  _id: string;
  status: string;
  ingredients: string[];
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

function OrderPage() {
  const dispatch = useAppDispatch();
  const { orderDetails } = useAppSelector((store) => store.orderDetails);
  const { ingredients} = useAppSelector((store) => store.burgerIngredients)

  const { id } = useParams();

  const [order, setOrder] = useState<IOrderState>({
    _id: "",
    status: "",
    ingredients: [],
    name: "",
    number: 0,
    createdAt: "",
    updatedAt: ""
  });


  useEffect(() => {
    if (id) {
      dispatch(getOrder(id))
    }

  }, [id, dispatch]);

  useEffect(() => {
    if (orderDetails) {
      setOrder({
        _id: orderDetails._id,
        status: orderDetails.status,
        ingredients: orderDetails.ingredients,
        name: orderDetails.name,
        number: orderDetails.number,
        createdAt: orderDetails.createdAt,
        updatedAt: orderDetails.updatedAt
      })
    }
  }, [orderDetails]);

  const orderStatus = () => {
    if (order.status === CREATED) {
      return "Создан";
    } else if (order.status === PENDING) {
      return "Готовится";
    } else if (order.status === DONE) {
      return "Выполнен";
    }
  };

  const orderIngredients: IIngredients[] = useMemo(() => {
      const isIngredient = (
        ingredient: IIngredients | undefined
      ): ingredient is IIngredients => ingredient !== undefined;
      return order.ingredients
        .map((id) => {
          return ingredients.find(
            (ingredient: IIngredients) => ingredient._id === id
          );
        })
        .filter(isIngredient);
  }, [ingredients, order]);

  const orderIngredientsUniq = useMemo(() => {
    return Array.from(new Set<IIngredients>(orderIngredients));
  }, [orderIngredients]);

  const countIngredients = useMemo(() => {
    const count = order.ingredients.reduce(
      (acc: { [a: string]: number }, i) => {
        // eslint-disable-next-line no-prototype-builtins
        if (acc.hasOwnProperty(i)) {
          acc[i] += 1;
        } else {
          acc[i] = 1;
        }
        return acc;
      },
      {}
    );
    return count;
  }, [order.ingredients]);

  const orderSum = useMemo(() => {
    let totalSum = 0;
    order?.ingredients.forEach((id) => {
      const ingredient: IIngredients | undefined = orderIngredientsUniq.find((item: IIngredients) => item._id === id);
      if (ingredient) {
        totalSum += ingredient.price;
      }
    });
    return totalSum;
  }, [orderIngredientsUniq, order]);



  return (
        <div className={styles.orderPage}>
          <div className={styles.orderPage_container}>
            <p className={`text text_type_digits-default mb-10 ${styles.orderPage__number}`}>#{order?.number}</p>
            <p className={`text text_type_main-medium mb-3 ${styles.orderPage__name}`}>{order?.name}</p>
            <p className={`text text_type_main-default mb-15  ${styles.orderPage__status} ${order.status === DONE && styles.orderPage__status_done}`}>{orderStatus()}</p>
            <p className={`text text_type_main-medium mb-6  `}>Состав:</p>
            <div className={`${styles.orderPage_block} custom-scroll mb-10`}>
              { orderIngredientsUniq.map((item: IIngredients, index: number) => {
                return (
                  <div className={`${styles.orderPage_block_item}`} key={index}>
                    <div className={`${styles.orderPage_block_item__img}`}>
              <span>
                <img src={item.image} alt={item.name}/>
              </span>
                    </div>
                    <p className={`${styles.orderPage_block_item__text} text text_type_main-default`}>{item.name}</p>
                    <div className={`${styles.orderPage_block_item_price}`}>
                      <p className={`${styles.orderPage_block_item_price__count} text text_type_digits-default`}>
                        {countIngredients
                          ? `${countIngredients[item._id]}`
                          : ""}
                        x {item.price}</p>
                      <CurrencyIcon type={"primary"}/>
                    </div>
                  </div>
                )
              }) }
            </div>
            <div className={`${styles.orderPage_bottom}`}>
              <p className={`${styles.orderPage_bottom__time} text text_type_main-default`}><FormattedDate date={new Date(order.createdAt)}/></p>
              <div className={`${styles.orderPage_bottom_total}`}>
                <p className={`text text_type_digits-default`}>{orderSum}</p>
                <CurrencyIcon type={"primary"}/>
              </div>
            </div>
          </div>

        </div>
  );
}

export default OrderPage;