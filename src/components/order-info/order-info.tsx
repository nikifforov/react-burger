import { useMemo } from 'react';
import styles from "./order-info.module.sass"
import {Link, useLocation, useNavigate} from "react-router-dom";
import { IIngredients, IOrderInfo } from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {CREATED, DONE, PENDING} from "../../utils/constants";
import {useAppSelector} from "../../hooks/hooks";

interface IOrderInfoProps {
  order: IOrderInfo;
}


function OrderInfo(props: IOrderInfoProps) {
  const { order } = props;

  const location = useLocation();
  const { ingredients } = useAppSelector((state) => state.burgerIngredients);

  const toPath =
    location.pathname === "/feed"
      ? `/feed/${order.number}`
      : `/profile/orders/${order.number}`;

  const orderStatus = () => {
    if (order.status === CREATED) {
      return "Создан";
    } else if (order.status === PENDING) {
      return "Готовится";
    } else if (order.status === DONE) {
      return "Выполнен";
    }
  };

  const getOrderIngredients: IIngredients[] = useMemo(() => {
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

  const getIngredientsUniq = useMemo(() => {
    return Array.from(new Set<IIngredients>(getOrderIngredients));
  }, [getOrderIngredients]);

  const getIngredientsList = useMemo(() => {
    return getIngredientsUniq.slice(0, 5);
  }, [getIngredientsUniq]);

  const getIngredientsCount = useMemo(() => {
    return getIngredientsUniq.length > 6 ? getIngredientsUniq.length - 6 : 0;
  }, [getIngredientsUniq]);

  const sum = useMemo(() => {
    return getOrderIngredients.reduce((result, item) => result + item.price, 0);
  }, [getOrderIngredients]);


  return (
      <Link
        to={toPath}
        state={{ backgroundLocation: location }}
        className={styles.orderInfo}>
        <div className={`${styles.orderInfo__top} pb-6`}>
          <p className={`text text_type_digits-default`}>#{order.number}</p>
          <p className={`${styles.orderInfo__top_date}`}><FormattedDate date={new Date(order.createdAt)} /></p>
        </div>
        <p className={`text text_type_main-medium`}>{order.name}</p>
        { location.pathname !== "/feed" && (
          <p className={`pt-2 text text_type_main-small ${styles.orderInfo__status_complete}`}>{orderStatus()}</p>
        ) }

        <div className={`${styles.orderInfo__bottom} pt-6`}>
          <div className={`${styles.orderInfo__bottom_items}`}>
            { getIngredientsCount > 0 &&
              getIngredientsList.map((item) => {
                return (
                  <div
                    className={styles.orderInfo__bottom_item}
                    key={item._id}
                  >
                    <span>
                      <img src={item.image} alt={item.name}/>
                    </span>
                  </div>
                )
              })
            }
            { getIngredientsCount === 0 &&
              getIngredientsList.map((item) => {
                return (
                  <div
                    className={styles.orderInfo__bottom_item}
                    key={item._id}
                  >
                    <span>
                      <img src={item.image} alt={item.name}/>
                    </span>
                  </div>
                )
              })
            }
            {getIngredientsCount > 0 && (
              <div className={styles.orderInfo__bottom_item}>
              <span>
                <img
                  src="https://code.s3.yandex.net/react/code/meat-01-large.png"
                  alt="count"
                />
              </span>
                <span
                  className={`text text_type_digits-default ${styles.orderInfo__bottom_item__extra}`}
                >
                +{getIngredientsCount}
              </span>
              </div>
            )}
          </div>
          <div className={`${styles.orderInfo__bottom_sum}`}>
            <p className={`text text_type_digits-default`}>{sum}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </Link>
  );
}

export default OrderInfo;